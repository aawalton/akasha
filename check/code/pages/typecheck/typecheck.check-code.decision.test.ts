import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  claimedIn,
  configOf,
  matching,
  reachedBy,
  reachesTypegen,
  refusalsOver,
  rootsOf,
  servingOf,
  typesIn,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import {
  across,
  basing,
  breaking,
  CHAINED,
  calling,
  declaring,
  deep,
  FIRST_OF,
  GONE_AT,
  generating,
  HERE,
  holding,
  IMPORTS_TYPEGEN,
  judged,
  LOADED_AT,
  MADE,
  moving,
  noting,
  numbered,
  ONE_NUMBER,
  orphaning,
  orphans,
  over,
  packaging,
  pairing,
  READER_AT,
  READS_GONE,
  RENUMBERED,
  reached,
  reading,
  TWO_BREAKS,
  twinned,
  unindexed,
  unreached,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.test-fixtures.ts"
import {
  change,
  scratch,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { NOWHERE } from "akasha/code/reading/modules/code-typing/code-typing.module.test-fixtures.ts"
import { shadowAsked, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("the settings carry the files judged and every ambient type the packages folder holds", () => {
  expect(typesIn(HERE)).toContain("bun")
  const said: { compilerOptions: { types: string[] }; files: string[] } = JSON.parse(
    configOf(HERE, ["one.ts", "two.ts"])
  )
  expect(said.files).toEqual(["one.ts", "two.ts"])
  expect(said.compilerOptions.types).toContain("bun")
})

test("the config is answered at the path the compiler was told to open", () => {
  const at = `${HERE}/tsconfig.typecheck.json`
  const serving = servingOf(
    HERE,
    at,
    "{}",
    (path) => (path.endsWith("held.ts") ? "export const held = 1" : undefined),
    NOWHERE
  )
  expect(serving(at)).toBe("{}")
  expect(serving(`${HERE}/held.ts`)).toBe("export const held = 1")
  expect(serving(`${HERE}/gone.ts`)).toBeNull()
  expect(serving("/etc/hostname")).toBeUndefined()
})

test("a page the change takes away leaves what its page type says loads it uncompiled", async () => {
  const root = declaring()
  const gone = change(root, { [LOADED_AT]: null })
  const cast = shadowFor(gone)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(rootsOf(gone, cast.shadow)).toEqual([])
  expect(await refusalsOver(gone, cast.shadow)).toEqual([])
})

test("what a config's include names is read as a pattern rather than as plain text", () => {
  expect(matching("a/src/*.ts").test("a/src/one.ts")).toBe(true)
  expect(matching("a/src/*.ts").test("a/src/deep/one.ts")).toBe(false)
  expect(matching("a/src/**/*.ts").test("a/src/deep/one.ts")).toBe(true)
  expect(matching("a/one.d.ts").test("a/oneXd.ts")).toBe(false)
})

test("a file a lua runtime library's config names is compiled by that config rather than here", () => {
  const held = change(HERE, {})
  const index = shadowAsked(held).index
  const claimed = claimedIn(held, index)
  const lua = dirname(dirname(index.everyOfType("lua-runtime-library")[0]?.path ?? ""))
  expect(claimed(`${lua}/performance-global/performance-global.type-declaration.d.ts`)).toBe(true)
  expect(claimed(`${lua}/lualib-helper/whatever/whatever.lualib-helper.code.ts`)).toBe(true)
  expect(claimed("humming/humming.hum.code.ts")).toBe(false)
})

test("a body reaching one beside it in a folder the change makes is refused for nothing", async () => {
  expect(await judged(change(generating({}), MADE))).toEqual([])
})

test("a proposed body that fixes what stands on disk is judged clean, so the change is what is read", async () => {
  const root = breaking()
  expect(await over(root, "akasha/one.ts", ONE_NUMBER)).toEqual([])
  expect(await over(root, "akasha/one.ts", null)).toEqual([])
})

test("a proposed body that breaks a clean file on disk is refused and names the line, so the change is what is read", async () => {
  const root = numbered()
  expect(await judged(change(root, {}))).toEqual([])
  const said = await over(root, "akasha/one.ts", TWO_BREAKS)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain("line 2")
  expect(said[0]?.reason).toContain("TS2322")
  expect(await judged(change(root, {}))).toEqual([])
})

test("a type is judged across files, so a caller is refused for a callee it no longer fits", async () => {
  const root = calling()
  const said = await over(
    root,
    "akasha/calls.ts",
    'import { held } from "./held.module.ts"\nexport const one = held("no")\n'
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
})

test("a change that would break a file it does not touch is refused, and answers at that file", async () => {
  const root = calling()
  const said = await over(
    root,
    "akasha/held.module.ts",
    "export function held(one: string): string {\n  return one\n}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("does not compile")
})

test("a file the change takes away is gone for the compiler, so a file still importing it is refused", async () => {
  const root = calling()
  const said = await over(root, "akasha/held.module.ts", null)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("TS2307")
})

test("a file the change takes away that a file the change adds still imports is no orphan", () => {
  const root = orphaning()
  expect(orphans(root, {})).toEqual([GONE_AT])
  expect(orphans(root, READS_GONE)).toEqual([])
})

test("a file the change brings is compiled though no disk holds it", async () => {
  const root = numbered()
  const said = await judged(change(root, { "akasha/two.ts": "export const two: string = 2\n" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/two.ts")
})

test("a diagnostic against a file the change did not touch is reported once, however many paths it holds", async () => {
  const root = reading()
  const said = await judged(change(root, RENUMBERED))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/broken.ts")
})

test("an index read without a guard is refused, so the settings are the strict ones", async () => {
  const said = await over(holding(), "akasha/one.ts", FIRST_OF)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("undefined")
})

test("a file that is not TypeScript is passed over, and one in any folder under the root is judged", async () => {
  const root = holding()
  expect(await over(root, "akasha/notes.txt", "nothing to compile\n")).toEqual([])
  const said = await over(root, "shared/one.ts", "export const one: string = 1\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("shared/one.ts")
})

test("a folder holding no TypeScript is judged clean without a program being built", async () => {
  const root = noting()
  expect(await judged(change(root, { "akasha/notes.txt": "still nothing\n" }))).toEqual([])
})

test("the files compiled are the change and everything importing it, however far", () => {
  const root = deep()
  expect(reached(change(root, { "akasha/one.module.ts": "export const one = 2\n" }))).toEqual([
    "akasha/deep/three.ts",
    "akasha/deep/two.module.ts",
    "akasha/one.module.ts",
  ])
  expect(reached(change(root, { "akasha/apart.ts": "export const apart = 2\n" }))).toEqual([
    "akasha/apart.ts",
  ])
})

test("a file nothing in the change reaches is not compiled, so its standing errors are not this change's", async () => {
  const root = unreached()
  expect(await judged(change(root, { "akasha/apart.ts": "export const apart = 2\n" }))).toEqual([])
})

test("the akasha folder is the whole repository, so an importer in any folder under it is a root", () => {
  const root = across()
  expect(reached(change(root, { "akasha/one.module.ts": "export const one = 2\n" }))).toEqual([
    "akasha/one.module.ts",
    "shared/two.ts",
  ])
})

test("a shadow asked for a change reaches the importers the change itself reaches", async () => {
  const root = pairing()
  const held = change(root, { "akasha/one.module.ts": "export const one = 2\n" })
  expect(reached(held)).toEqual(["akasha/one.module.ts", "akasha/two.ts"])
  expect(reachedBy(held, shadowAsked(held))).toEqual(["akasha/one.module.ts", "akasha/two.ts"])
  expect((await judged(held)).map((one) => one.path)).toEqual(["akasha/two.ts"])
})

test("an index standing and naming no importer is an answer, so the change alone is compiled", () => {
  const root = twinned()
  expect(reached(change(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/one.ts",
  ])
})

test("a change naming no TypeScript under the akasha folder asks the index nothing", async () => {
  const root = unindexed()
  expect(await judged(change(root, { "akasha/notes.txt": "nothing to compile\n" }))).toEqual([])
})

test("a file whole at base and deleted from the worktree alone still answers for its errors", async () => {
  const root = basing()
  const held = readFileSync(join(root, "akasha/b.ts"), "utf8")
  const changed = { "akasha/a.module.ts": ONE_NUMBER }
  const refusals = await judged(change(root, changed))
  rmSync(join(root, "akasha/b.ts"))
  const gone = await judged(change(root, changed, { "akasha/b.ts": held }))
  expect(refusals).toHaveLength(1)
  expect(refusals[0]?.path).toBe("akasha/b.ts")
  expect(gone).toEqual(refusals)
})

test("a diagnostic carried in a chain is one reason", async () => {
  const said = await over(holding(), "akasha/one.ts", CHAINED)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("missing")
})

test("what is passed over is what imports generated route types rather than where it sits", () => {
  expect(reachesTypegen("routes/one.ts", 'import type { Route } from "./+types/one"\n')).toBe(true)
  expect(reachesTypegen("routes/one.ts", "export const one = 1\n")).toBe(false)
  expect(reachesTypegen("held.ts", 'export const said = "./+types/root"\n')).toBe(false)
})

test("a body importing generated route types is reached and left unjudged", async () => {
  const root = numbered()
  const held = change(root, { "akasha/two.ts": IMPORTS_TYPEGEN })
  expect(reached(held)).toEqual(["akasha/two.ts"])
  expect(await judged(held)).toEqual([])
})

test("a package the change brings into being is reached where its manifest sits, with no link on disk", async () => {
  expect(await judged(change(holding(), packaging("@akasha/persons")))).toEqual([])
})

test("a way in that manifest does not name is refused, so not every specifier resolves", async () => {
  const said = await judged(change(holding(), packaging("@akasha/persons/apart")))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(READER_AT)
  expect(said[0]?.reason).toContain("TS2307")
})

test("a moved package is judged where it lands rather than where the link points", async () => {
  expect(await judged(moving())).toEqual([])
})
