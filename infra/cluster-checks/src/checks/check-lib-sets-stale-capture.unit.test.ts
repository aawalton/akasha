import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { getRepoRoot } from "../lib/repo-root.ts"
import { analyzeModule, isOutOfScope, scanStaleCaptures } from "./check-lib-sets-stale-capture.ts"

const CONSUMER_FILE = "packages/temper/shared/addon-libraries/lib-sets/src/core/api-drop-zones.ts"
const LOAD_SETS_FILE = "packages/temper/shared/addon-libraries/lib-sets/src/core/load-sets.ts"
const SAVED_VARIABLES_FILE =
  "packages/temper/shared/addon-libraries/lib-sets/src/core/saved-variables.ts"

const LOAD_SETS_FIXTURE = [
  "const lib = LibSets",
  "const allowedDropMechanics = lib.allowedDropMechanics",
  "function loadSets(this: void): undefined {",
  "  const state = { dropZones: {}, setId2ZoneIds: {} }",
  "  lib.dropZones = state.dropZones",
  "  lib.setId2DropZones = state.setId2ZoneIds",
  "  lib.allowedDropMechanics = allowedDropMechanics",
  "  lib.setItemCollectionCategories[7] = { category: 1 }",
  "}",
  "lib.LoadSets = loadSets",
].join("\n")

const FIXTURE = analyzeModule({ source: LOAD_SETS_FIXTURE, relPath: LOAD_SETS_FILE })

const scan = (source: string, relPath = CONSUMER_FILE) =>
  scanStaleCaptures({ source, relPath, reboundFields: FIXTURE.runtimeRebinds })

describe("analyzeModule — the rule derives from the scanned tree, never a hardcoded list", () => {
  test("a field assigned a freshly-built table inside a function is rebound at runtime", () => {
    expect(FIXTURE.runtimeRebinds.has("dropZones")).toBe(true)
    expect(FIXTURE.runtimeRebinds.has("setId2DropZones")).toBe(true)
  })

  test("publishing a function at MODULE scope is not a runtime rebind", () => {
    expect(FIXTURE.runtimeRebinds.has("LoadSets")).toBe(false)
  })

  test("writing THROUGH a field mutates the captured table, so it is not a rebind", () => {
    expect(FIXTURE.runtimeRebinds.has("setItemCollectionCategories")).toBe(false)
  })

  test("the faithful write-back is recorded against the identifier it writes back", () => {
    expect([...(FIXTURE.faithfulWriteBacks.get("allowedDropMechanics") ?? [])]).toEqual([
      "allowedDropMechanics",
    ])
    expect(FIXTURE.faithfulWriteBacks.has("dropZones")).toBe(false)
  })

  test("writing back some OTHER binding is a rebind, not a faithful no-op", () => {
    const source = [
      "const lib = LibSets",
      "const cached = lib.dropZones",
      "function loadSets(this: void): undefined {",
      "  const replacement = {}",
      "  lib.dropZones = replacement",
      "}",
    ].join("\n")
    const analysis = analyzeModule({ source, relPath: LOAD_SETS_FILE })
    expect(analysis.runtimeRebinds.has("dropZones")).toBe(true)
    expect(analysis.faithfulWriteBacks.has("dropZones")).toBe(false)
  })

  test("an arrow body is a function body too", () => {
    const source = [
      "const lib = LibSets",
      "const load = (): undefined => {",
      "  lib.dropZones = {}",
      "}",
    ].join("\n")
    expect(analyzeModule({ source, relPath: LOAD_SETS_FILE }).runtimeRebinds.has("dropZones")).toBe(
      true
    )
  })

  test("the real load-sets.ts yields the drop-zone tables and the one faithful write-back", () => {
    const { runtimeRebinds, faithfulWriteBacks } = analyzeModule({
      source: readFileSync(join(getRepoRoot(), LOAD_SETS_FILE), "utf8"),
      relPath: LOAD_SETS_FILE,
    })
    for (const field of [
      "dropZones",
      "setId2DropZones",
      "dropZone2SetIds",
      "dropLocationNames",
      "dropLocationNames2SetIds",
      "setId2DropLocationNames",
    ]) {
      expect(runtimeRebinds.has(field)).toBe(true)
      expect(faithfulWriteBacks.has(field)).toBe(false)
    }
    expect([...faithfulWriteBacks.keys()]).toEqual(["allowedDropMechanics"])
  })

  test("a module OTHER than load-sets.ts contributes its own runtime rebinds", () => {
    const { runtimeRebinds } = analyzeModule({
      source: readFileSync(join(getRepoRoot(), SAVED_VARIABLES_FILE), "utf8"),
      relPath: SAVED_VARIABLES_FILE,
    })
    expect(runtimeRebinds.has("svData")).toBe(true)
  })
})

describe("scanStaleCaptures — module-scope captures of a rebound field", () => {
  test("flags a bare module-scope capture", () => {
    const source = ["const lib = LibSets", "const dropZones = lib.dropZones"].join("\n")
    const found = scan(source)
    expect(found.map((v) => v.field)).toEqual(["dropZones"])
    expect(found[0]?.binding).toBe("dropZones")
    expect(found[0]?.line).toBe(2)
    expect(found[0]?.file).toBe(CONSUMER_FILE)
    expect(found[0]?.kind).toBe("lib-sets-stale-capture")
  })

  test("flags a cast-wrapped capture — a single-arg wrapper returns the same table", () => {
    const source = [
      "const lib = LibSets",
      "const setId2ZoneIds = asSetIdTable(lib.setId2DropZones)",
    ].join("\n")
    expect(scan(source).map((v) => v.field)).toEqual(["setId2DropZones"])
  })

  test("flags a nested cast-wrapped capture", () => {
    const source = [
      "const lib = LibSets",
      "const dropZones = asPresent(asSetIdTable(lib.dropZones))",
    ].join("\n")
    expect(scan(source).map((v) => v.binding)).toEqual(["dropZones"])
  })

  test("flags a capture off the bare global, with no local alias", () => {
    expect(scan("const dropZones = LibSets.dropZones").map((v) => v.field)).toEqual(["dropZones"])
  })

  test("flags a string-keyed element access (the dynamic-dispatch escape hatch)", () => {
    const source = ["const lib = LibSets", 'const zones = lib["dropZones"]'].join("\n")
    expect(scan(source).map((v) => v.field)).toEqual(["dropZones"])
  })

  test("flags a destructured capture", () => {
    const source = ["const lib = LibSets", "const { dropZones: zones } = lib"].join("\n")
    const found = scan(source)
    expect(found.map((v) => v.field)).toEqual(["dropZones"])
    expect(found[0]?.binding).toBe("zones")
  })

  test("flags a capture through a cast-wrapped alias of the table", () => {
    const source = [
      "const lib = LibSets",
      "const slots = asLibSlots(lib)",
      "const dropZones = slots.dropZones",
    ].join("\n")
    expect(scan(source).map((v) => v.field)).toEqual(["dropZones"])
  })

  test("a capture is judged against what the WHOLE tree rebinds, not one named file", () => {
    const capture = ["const lib = LibSets", "const svData = lib.svData"].join("\n")
    const elsewhere = analyzeModule({
      source: [
        "const lib = LibSets",
        "function loadSavedVariables(this: void): undefined {",
        "  lib.svData = {}",
        "}",
      ].join("\n"),
      relPath: SAVED_VARIABLES_FILE,
    })
    expect(scan(capture)).toEqual([])
    const union = new Set([...FIXTURE.runtimeRebinds, ...elsewhere.runtimeRebinds])
    expect(
      scanStaleCaptures({ source: capture, relPath: CONSUMER_FILE, reboundFields: union }).map(
        (v) => v.field
      )
    ).toEqual(["svData"])
  })

  test("a faithful write-back exempts only the module that makes it", () => {
    const source = [
      "const lib = LibSets",
      "const allowedDropMechanics = lib.allowedDropMechanics",
    ].join("\n")
    expect(scan(source).map((v) => v.field)).toEqual(["allowedDropMechanics"])
  })

  test("the finding says WHY and names the field and the fix", () => {
    const message = scan("const dropZones = LibSets.dropZones")[0]?.message ?? ""
    expect(message).toContain("rebinds")
    expect(message).toContain("LibSets.dropZones")
    expect(message).toContain("inside the function")
  })

  test("no runtime message names an internal project number", () => {
    const message = scan("const dropZones = LibSets.dropZones")[0]?.message ?? ""
    expect(message).not.toMatch(/#\d{3,}/)
  })
})

describe("scanStaleCaptures — the shapes that are correct and must stay silent", () => {
  test("the faithful write-back shape is NOT flagged", () => {
    expect(scan(LOAD_SETS_FIXTURE, LOAD_SETS_FILE)).toEqual([])
  })

  test("the exemption is the write-back identity, not the field — a renamed capture still reds", () => {
    const source = ["const lib = LibSets", "const dropMechanics = lib.allowedDropMechanics"].join(
      "\n"
    )
    expect(scan(source).map((v) => v.field)).toEqual(["allowedDropMechanics"])
  })

  test("a capture of a field LoadSets never rebinds is NOT flagged", () => {
    const source = [
      "const lib = LibSets",
      "const clientLang = lib.clientLang",
      "const libPrefix = lib.prefix",
    ].join("\n")
    expect(scan(source)).toEqual([])
  })

  test("a read of a rebound field INSIDE a function body is NOT flagged", () => {
    const source = [
      "const lib = LibSets",
      "function getAllDropZones(this: void): unknown {",
      "  return safeReturnAPItable(lib.dropZones)",
      "}",
      "lib.GetAllDropZones = getAllDropZones",
    ].join("\n")
    expect(scan(source)).toEqual([])
  })

  test("aliasing the table itself is NOT a field capture", () => {
    expect(scan("const lib = LibSets")).toEqual([])
  })

  test("a multi-argument call is a computation, not a pass-through", () => {
    const source = ["const lib = LibSets", "const merged = pick(lib.dropZones, 3)"].join("\n")
    expect(scan(source)).toEqual([])
  })

  test("a field read off something that is not the LibSets table is NOT flagged", () => {
    const source = ["const state = buildState()", "const dropZones = state.dropZones"].join("\n")
    expect(scan(source)).toEqual([])
  })

  test("a comment naming the capture is not a capture", () => {
    const source = [
      "// Deliberately does NOT cache lib.dropZones at module scope.",
      "export const answer = 1",
    ].join("\n")
    expect(scan(source)).toEqual([])
  })

  test("a file that never names the global costs nothing and yields nothing", () => {
    expect(scan("export const x = 1\n")).toEqual([])
  })
})

describe("isOutOfScope — path scope", () => {
  test("in scope: first-party ts under the temper tree", () => {
    expect(isOutOfScope(CONSUMER_FILE)).toBe(false)
    expect(isOutOfScope(LOAD_SETS_FILE)).toBe(false)
  })

  test("out of scope: emitted TSTL bundles under a dist/ tree", () => {
    expect(isOutOfScope("packages/temper/addons/dist/LibSets/LibSets.ts")).toBe(true)
  })

  test("out of scope: declaration files and non-ts sources", () => {
    expect(isOutOfScope("packages/temper/addons/types/libs/lib-sets.d.ts")).toBe(true)
    expect(isOutOfScope("packages/temper/shared/addon-libraries/lib-sets/CLAUDE.md")).toBe(true)
  })

  test("out of scope: installed dependencies and generated trees", () => {
    expect(isOutOfScope("packages/temper/node_modules/libsets/index.ts")).toBe(true)
    expect(isOutOfScope("packages/temper/completion/src/generated/sets-data.ts")).toBe(true)
  })
})
