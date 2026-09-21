import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  decideSweepAction,
  shippedFolderNames,
  sweptStaleAddons,
} from "akasha/temper/addon/build/modules/addon-sweeping/addon-sweeping.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const MARKER = "build-id.lua"
const PROBE = "TemperProbe"
const SIBLING = "ProbeSibling"
const GONE = "TemperGone"
const FOREIGN = "SomebodyElse"

type Fixture = { readonly root: string; readonly live: string; readonly addons: string }

function probeManifest(): string {
  return JSON.stringify({
    name: PROBE,
    title: PROBE,
    description: "a probe addon a sweep is measured against",
    author: "test",
    version: "1.0.0",
    addonVersion: 100,
    apiVersion: ["101041"],
    savedVariables: [],
    dependsOn: [],
    siblingAddons: [SIBLING],
  })
}

function folderAt(addons: string, name: string, marker: boolean): string {
  const dir = join(addons, name)
  mkdirSync(dir, { recursive: true })
  if (marker) writeFileSync(join(dir, MARKER), `TemperBuildIds["${name}"] = "abcd1234"\n`)
  writeFileSync(join(dir, `${name}.txt`), `## Title: ${name}\n## AddOnVersion: 100\n`)
  return dir
}

function fixtureFor(opts: { readonly roster?: boolean } = {}): Fixture {
  const root = scratch.rootFor("temper-sweep-root-")
  const live = scratch.rootFor("temper-sweep-live-")
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "scratch", workspaces: [] }))
  nothingFiled(root)
  if (opts.roster !== false) {
    const probeDir = join(root, "temper/addons", PROBE)
    mkdirSync(probeDir, { recursive: true })
    writeFileSync(join(probeDir, "addon.json"), probeManifest())
  }
  const addons = join(live, "AddOns")
  mkdirSync(addons, { recursive: true })
  return { root, live, addons }
}

function liveAs(at: Fixture): undefined {
  folderAt(at.addons, PROBE, true)
  folderAt(at.addons, SIBLING, true)
  folderAt(at.addons, GONE, true)
  folderAt(at.addons, FOREIGN, false)
  return undefined
}

function sweeping(at: Fixture) {
  const before = optionalEnv("ESO_LIVE_DIR")
  process.env["ESO_LIVE_DIR"] = at.live
  try {
    return sweptStaleAddons(at.root)
  } finally {
    if (before === undefined) delete process.env["ESO_LIVE_DIR"]
    else process.env["ESO_LIVE_DIR"] = before
  }
}

test("what the fleet ships holds every addon and every sibling an addon names", () => {
  const at = fixtureFor()
  expect([...shippedFolderNames(at.root)].sort()).toEqual([SIBLING, PROBE])
})

test("a folder carrying the marker that no addon names any more is taken away", () => {
  const at = fixtureFor()
  liveAs(at)
  const said = sweeping(at)
  expect(said.refusals).toEqual([])
  expect(existsSync(join(at.addons, GONE))).toBe(false)
  expect(said.lines.join("\n")).toContain(`swept ${GONE} out of`)
})

test("a folder carrying no marker is left where it is", () => {
  const at = fixtureFor()
  liveAs(at)
  expect(sweeping(at).refusals).toEqual([])
  expect(existsSync(join(at.addons, FOREIGN, `${FOREIGN}.txt`))).toBe(true)
})

test("an addon's own folder and the sibling it names are left where they are", () => {
  const at = fixtureFor()
  liveAs(at)
  expect(sweeping(at).refusals).toEqual([])
  expect(existsSync(join(at.addons, PROBE, `${PROBE}.txt`))).toBe(true)
  expect(existsSync(join(at.addons, SIBLING, `${SIBLING}.txt`))).toBe(true)
})

test("the sweep says how many folders it weighed and how many it took away", () => {
  const at = fixtureFor()
  liveAs(at)
  expect(sweeping(at).lines.join("\n")).toContain(
    "4 folder(s) weighed against the 2 this fleet ships, 1 taken away"
  )
})

test("a sweep that finds no addon at all takes nothing away", () => {
  const at = fixtureFor({ roster: false })
  liveAs(at)
  const said = sweeping(at)
  expect(said.refusals.join("\n")).toContain("what this fleet ships is unsaid")
  expect(existsSync(join(at.addons, GONE, MARKER))).toBe(true)
})

test("a file where a folder would be is passed over rather than weighed", () => {
  const at = fixtureFor()
  liveAs(at)
  writeFileSync(join(at.addons, "loose.txt"), "not a folder\n")
  const said = sweeping(at)
  expect(said.refusals).toEqual([])
  expect(existsSync(join(at.addons, "loose.txt"))).toBe(true)
  expect(said.lines.join("\n")).toContain("4 folder(s) weighed")
})

test("what a folder is named decides nothing on its own", () => {
  const shipped = new Set([PROBE])
  expect(decideSweepAction(PROBE, "temper-owned", shipped).action).toBe("keep")
  expect(decideSweepAction(GONE, "temper-owned", shipped).action).toBe("remove")
  expect(decideSweepAction(GONE, "foreign", shipped).action).toBe("keep")
  expect(decideSweepAction(GONE, "unknown", shipped).action).toBe("keep")
  expect(decideSweepAction(GONE, "absent", shipped).action).toBe("keep")
})
