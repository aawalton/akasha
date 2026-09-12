import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { nothingFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { placedAddon } from "akasha/temper/addon-build/addon-placing/addon-placing.module.code.ts"
import { addonBuildOutputRel } from "akasha/temper/addon-build/build-output/build-output.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const MARKER = "build-id.lua"
const PROBE = "TemperProbe"
const OTHER = "TemperOther"

const DIST_AT = addonBuildOutputRel(process.cwd())

type Fixture = { readonly root: string; readonly live: string; readonly addons: string }

function manifestFor(name: string, extra: Record<string, unknown> = {}): string {
  return JSON.stringify({
    name,
    title: name,
    description: `${name} for a test`,
    author: "test",
    version: "1.0.0",
    addonVersion: 100,
    apiVersion: ["101041"],
    savedVariables: [],
    dependsOn: [],
    ...extra,
  })
}

function fixtureFor(
  opts: { readonly asks?: number; readonly keep?: readonly string[] } = {}
): Fixture {
  const root = scratch.rootFor("temper-place-root-")
  const live = scratch.rootFor("temper-place-live-")
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "scratch", workspaces: [] }))
  nothingFiled(root)

  const probeDir = join(root, "temper/addons", PROBE)
  mkdirSync(probeDir, { recursive: true })
  writeFileSync(
    join(probeDir, "addon.json"),
    manifestFor(PROBE, opts.keep === undefined ? {} : { additionalLuaFiles: [...opts.keep] })
  )

  if (opts.asks !== undefined) {
    const otherDir = join(root, "temper/addons", OTHER)
    mkdirSync(otherDir, { recursive: true })
    writeFileSync(
      join(otherDir, "addon.json"),
      manifestFor(OTHER, { dependsOn: [`${PROBE}>=${String(opts.asks)}`] })
    )
  }

  const built = join(root, DIST_AT, PROBE)
  mkdirSync(built, { recursive: true })
  writeFileSync(join(built, MARKER), `TemperBuildIds["${PROBE}"] = "abcd1234"\n`)
  writeFileSync(
    join(built, `${PROBE}.txt`),
    `## Title: ${PROBE}\n## AddOnVersion: 100\n\n${MARKER}\n${PROBE}.lua\n`
  )
  writeFileSync(join(built, `${PROBE}.lua`), "-- probe\n")

  const addons = join(live, "AddOns")
  mkdirSync(addons, { recursive: true })
  mkdirSync(join(live, "SavedVariables"), { recursive: true })
  return { root, live, addons }
}

function placing(at: Fixture) {
  const before = optionalEnv("ESO_LIVE_DIR")
  process.env["ESO_LIVE_DIR"] = at.live
  try {
    return placedAddon(at.root, join(at.root, "temper/addons", PROBE), PROBE)
  } finally {
    if (before === undefined) delete process.env["ESO_LIVE_DIR"]
    else process.env["ESO_LIVE_DIR"] = before
  }
}

test("a folder that is not there is placed into", () => {
  const at = fixtureFor()
  const said = placing(at)
  expect(said.refusals).toEqual([])
  expect(existsSync(join(at.addons, PROBE, `${PROBE}.lua`))).toBe(true)
  expect(said.lines.join("\n")).toContain("3 file(s) verified by sha256")
})

test("a folder carrying the marker is replaced", () => {
  const at = fixtureFor()
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, MARKER), "stale\n")
  writeFileSync(join(target, "gone.lua"), "stale\n")
  const said = placing(at)
  expect(said.refusals).toEqual([])
  expect(existsSync(join(target, "gone.lua"))).toBe(false)
})

test("a foreign folder new enough for every version asked of it is left alone", () => {
  const at = fixtureFor({ asks: 90 })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, `${PROBE}.txt`), "## AddOnVersion: 150\n")
  const said = placing(at)
  expect(said.refusals).toEqual([])
  expect(said.lines.join("\n")).toContain("left the folder alone")
  expect(readFileSync(join(target, `${PROBE}.txt`), "utf-8")).toContain("150")
})

test("a foreign folder too old for a version asked of it refuses", () => {
  const at = fixtureFor({ asks: 200 })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, `${PROBE}.txt`), "## AddOnVersion: 150\n")
  const said = placing(at)
  expect(said.refusals.length).toBeGreaterThan(0)
  expect(existsSync(join(target, `${PROBE}.lua`))).toBe(false)
})

test("a foreign folder whose version cannot be read refuses", () => {
  const at = fixtureFor({ asks: 90 })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, `${PROBE}.txt`), "## Title: something else\n")
  const said = placing(at)
  expect(said.refusals.join("\n")).toContain("could not be read")
})

test("a folder nothing can read refuses rather than being replaced", () => {
  const at = fixtureFor()
  writeFileSync(join(at.addons, PROBE), "this is a file where a folder would be\n")
  const said = placing(at)
  expect(said.refusals.join("\n")).toContain("who owns it is unknown")
})

test("an addon with no build refuses", () => {
  const at = fixtureFor()
  rmSync(join(at.root, DIST_AT, PROBE), { recursive: true, force: true })
  const said = placing(at)
  expect(said.refusals.join("\n")).toContain("has no build at")
})

test("a symbolic link in the build is verified rather than skipped", () => {
  const at = fixtureFor()
  const built = join(at.root, DIST_AT, PROBE)
  writeFileSync(join(built, "real.lua"), "-- real\n")
  symlinkSync(join(built, "real.lua"), join(built, "linked.lua"))
  const said = placing(at)
  expect(said.refusals).toEqual([])
  expect(said.lines.join("\n")).toContain("5 file(s) verified by sha256")
})

test("a file the host keeps is carried across a replacement", () => {
  const at = fixtureFor({ keep: ["Keep.lua"] })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, MARKER), "stale\n")
  writeFileSync(join(target, "Keep.lua"), "host wrote this\n")
  const said = placing(at)
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(target, "Keep.lua"), "utf-8")).toBe("host wrote this\n")
  expect(said.lines.join("\n")).toContain("host file(s) carried across")
})

test("a build holding a link to nothing is refused rather than reported placed", () => {
  const at = fixtureFor()
  const built = join(at.root, DIST_AT, PROBE)
  symlinkSync(join(built, "was-never-written.lua"), join(built, "dangling.lua"))
  const said = placing(at)
  expect(said.refusals.join("\n")).toContain("does not match what was built")
  expect(said.refusals.join("\n")).toContain("dangling.lua")
})
