import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { temperAddonInstall } from "./temper-addon-install.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const MARKER = "build-id.lua"
const PROBE = "TemperProbe"
const OTHER = "TemperOther"

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
  opts: { readonly floor?: number; readonly keep?: readonly string[] } = {}
): Fixture {
  const root = scratch.rootFor("temper-install-root-")
  const live = scratch.rootFor("temper-install-live-")
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "scratch", workspaces: [] }))

  const probeDir = join(root, "temper/addons", PROBE)
  mkdirSync(probeDir, { recursive: true })
  writeFileSync(
    join(probeDir, "addon.json"),
    manifestFor(PROBE, opts.keep === undefined ? {} : { additionalLuaFiles: [...opts.keep] })
  )

  if (opts.floor !== undefined) {
    const otherDir = join(root, "temper/addons", OTHER)
    mkdirSync(otherDir, { recursive: true })
    writeFileSync(
      join(otherDir, "addon.json"),
      manifestFor(OTHER, { dependsOn: [`${PROBE}>=${String(opts.floor)}`] })
    )
  }

  const built = join(root, "temper/addons/dist", PROBE)
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

function installed(at: Fixture, argv: readonly string[] = ["--addon", PROBE]) {
  const before = process.env["ESO_LIVE_DIR"]
  process.env["ESO_LIVE_DIR"] = at.live
  try {
    return temperAddonInstall([...argv, "--code-root", at.root])
  } finally {
    if (before === undefined) delete process.env["ESO_LIVE_DIR"]
    else process.env["ESO_LIVE_DIR"] = before
  }
}

test("a folder that is not there is installed into", () => {
  const at = fixtureFor()
  const said = installed(at)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(at.addons, PROBE, `${PROBE}.lua`))).toBe(true)
  expect(said.report.join("\n")).toContain("3 file(s) verified by sha256")
})

test("a folder carrying the marker is replaced", () => {
  const at = fixtureFor()
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, MARKER), "stale\n")
  writeFileSync(join(target, "gone.lua"), "stale\n")
  const said = installed(at)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(target, "gone.lua"))).toBe(false)
})

test("a foreign folder clearing every floor is left alone", () => {
  const at = fixtureFor({ floor: 90 })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, `${PROBE}.txt`), "## AddOnVersion: 150\n")
  const said = installed(at)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("left the folder alone")
  expect(readFileSync(join(target, `${PROBE}.txt`), "utf-8")).toContain("150")
})

test("a foreign folder missing a floor refuses", () => {
  const at = fixtureFor({ floor: 200 })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, `${PROBE}.txt`), "## AddOnVersion: 150\n")
  const said = installed(at)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("misses a floor")
  expect(existsSync(join(target, `${PROBE}.lua`))).toBe(false)
})

test("a foreign folder whose version cannot be read refuses", () => {
  const at = fixtureFor({ floor: 90 })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, `${PROBE}.txt`), "## Title: something else\n")
  const said = installed(at)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("could not be read")
})

test("a folder nothing can read refuses rather than being replaced", () => {
  const at = fixtureFor()
  writeFileSync(join(at.addons, PROBE), "this is a file where a folder would be\n")
  const said = installed(at)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("who owns it is unknown")
})

test("an addon with no build refuses", () => {
  const at = fixtureFor()
  rmSync(join(at.root, "temper/addons/dist", PROBE), { recursive: true, force: true })
  const said = installed(at)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("has no build at")
})

test("naming no addon refuses", () => {
  const at = fixtureFor()
  const said = installed(at, [])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("names the addon installed")
})

test("a symbolic link in the build is verified rather than skipped", () => {
  const at = fixtureFor()
  const built = join(at.root, "temper/addons/dist", PROBE)
  writeFileSync(join(built, "real.lua"), "-- real\n")
  symlinkSync(join(built, "real.lua"), join(built, "linked.lua"))
  const said = installed(at)
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("5 file(s) verified by sha256")
})

test("a file the host keeps is carried across a replacement", () => {
  const at = fixtureFor({ keep: ["Keep.lua"] })
  const target = join(at.addons, PROBE)
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, MARKER), "stale\n")
  writeFileSync(join(target, "Keep.lua"), "host wrote this\n")
  const said = installed(at)
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(target, "Keep.lua"), "utf-8")).toBe("host wrote this\n")
  expect(said.report.join("\n")).toContain("host file(s) carried across")
})

test("a build holding a link to nothing is refused rather than reported installed", () => {
  const at = fixtureFor()
  const built = join(at.root, "temper/addons/dist", PROBE)
  symlinkSync(join(built, "was-never-written.lua"), join(built, "dangling.lua"))
  const said = installed(at)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("does not match what was built")
  expect(said.refusals.join("\n")).toContain("dangling.lua")
})
