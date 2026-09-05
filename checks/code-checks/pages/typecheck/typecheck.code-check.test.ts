import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { stampTakenFrom } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { shadowAsked, shadowFor } from "@akasha/pages-system/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  configOf,
  omittingIn,
  reachedBy,
  rootsOf,
  servingOf,
  typecheck,
  typesIn,
} from "./typecheck.code-check.code.ts"
import {
  CALLS_HELD,
  change,
  declared,
  declaring,
  EARLY,
  generating,
  HERE,
  LOADED_AT,
  MADE,
  NAMING_NO_COMMIT,
  ONE_NUMBER,
  scratch,
  staged,
  TAKES_NUMBER,
  THING_AT,
  TWO_BREAKS,
  WHOLE,
  WITHOUT,
  WRONG,
} from "./typecheck.code-check.test-fixtures.ts"

afterAll(scratch.sweep)

async function judged(change: Change): Promise<readonly Judged[]> {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return await typecheck(change, cast.shadow)
}

function reached(one: Change): readonly string[] {
  const cast = shadowFor(one)
  if ("refused" in cast) throw new Error(cast.refused)
  return reachedBy(one, cast.shadow.index)
}

async function over(root: string, path: string, body: string | null): Promise<readonly Judged[]> {
  return await judged(change(root, { [path]: body }))
}

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
  const serving = servingOf(HERE, at, "{}", (path) =>
    path.endsWith("held.ts") ? "export const held = 1" : undefined
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
  expect(rootsOf(gone, cast.shadow.index)).toEqual([])
  expect(await typecheck(gone, cast.shadow)).toEqual([])
})

test("a declaration file akasha holds names a global for a change no import reaches it from", async () => {
  const root = declared({ "akasha/one.ts": "export const one = 1\n" })
  expect(await over(root, "akasha/one.ts", "export const one = HELD_ONE\n")).toEqual([])
})

test("a satisfies clause is narrowed where it stands, and the body keeps every line it had", () => {
  const said = omittingIn(THING_AT, WITHOUT, ["held", "other"])
  expect(said).toContain('satisfies Omit<Thing, "held" | "other">')
  expect(said?.split("\n").length).toBe(WITHOUT.split("\n").length)
})

test("the narrowing reaches for no import, `Omit` being TypeScript's own", () => {
  const said = omittingIn(THING_AT, WITHOUT, ["held"]) ?? ""
  expect(said.match(/^import/gm)).toEqual(WITHOUT.match(/^import/gm))
})

test("keys naming nothing narrow nothing at all", () => {
  expect(omittingIn(THING_AT, WITHOUT, [])).toBe(null)
})

test("a body carrying no satisfies clause narrows to nothing, so it is judged as it stands", () => {
  expect(omittingIn("akasha/one.ts", "export const one = 1\n", ["held"])).toBe(null)
})

test("a page being created compiles without the property a generator fills after the checks", async () => {
  expect(await judged(change(generating({}), { [THING_AT]: WITHOUT }))).toEqual([])
})

test("a body reaching one beside it in a folder the change makes is refused for nothing", async () => {
  expect(await judged(change(generating({}), MADE))).toEqual([])
})

test("a page being created is refused for the property a generator fills before the checks, the value standing in the body by then", async () => {
  const said = await judged(change(generating({}, EARLY), { [THING_AT]: WITHOUT }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(THING_AT)
  expect(said[0]?.reason).toContain("TS1360")
})

test("a page already standing is refused for dropping the property a generator fills", async () => {
  const said = await judged(change(generating({ [THING_AT]: WHOLE }), { [THING_AT]: WITHOUT }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(THING_AT)
  expect(said[0]?.reason).toContain("TS1360")
})

test("a page being created is still refused for what the narrowing does not cover", async () => {
  const said = await judged(change(generating({}), { [THING_AT]: WRONG }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(THING_AT)
  expect(said[0]?.reason).toContain("TS2322")
  expect(said[0]?.reason).toContain("not assignable")
})

test("akasha TypeScript that compiles is judged clean", async () => {
  const root = staged({ "akasha/one.ts": ONE_NUMBER })
  expect(await over(root, "akasha/one.ts", ONE_NUMBER)).toEqual([])
})

test("a proposed body whose type does not hold is refused, and names the line", async () => {
  const root = staged({ "akasha/one.ts": ONE_NUMBER })
  const said = await over(root, "akasha/one.ts", TWO_BREAKS)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain("line 2")
  expect(said[0]?.reason).toContain("TS2322")
})

test("a proposed body that fixes what stands on disk is judged clean, so the change is what is read", async () => {
  const root = staged({ "akasha/one.ts": TWO_BREAKS })
  expect(await over(root, "akasha/one.ts", ONE_NUMBER)).toEqual([])
  expect(await over(root, "akasha/one.ts", null)).toEqual([])
})

test("a proposed body that breaks what stands clean on disk is refused, so the change is what is read", async () => {
  const root = staged({ "akasha/one.ts": ONE_NUMBER })
  expect(await judged(change(root, {}))).toEqual([])
  expect(await over(root, "akasha/one.ts", "export const one: string = 1\n")).toHaveLength(1)
  expect(await judged(change(root, {}))).toEqual([])
})

test("a type is judged across files, so a caller is refused for a callee it no longer fits", async () => {
  const root = staged({ "akasha/held.ts": TAKES_NUMBER, "akasha/calls.ts": CALLS_HELD })
  const said = await over(
    root,
    "akasha/calls.ts",
    'import { held } from "./held.ts"\nexport const one = held("no")\n'
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
})

test("a change that would break a file it does not touch is refused, and answers at that file", async () => {
  const root = staged({ "akasha/held.ts": TAKES_NUMBER, "akasha/calls.ts": CALLS_HELD })
  const said = await over(
    root,
    "akasha/held.ts",
    "export function held(one: string): string {\n  return one\n}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("does not compile")
})

test("a file the change takes away is gone for the compiler, so a file still importing it is refused", async () => {
  const root = staged({ "akasha/held.ts": TAKES_NUMBER, "akasha/calls.ts": CALLS_HELD })
  const said = await over(root, "akasha/held.ts", null)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("TS2307")
})

test("a file the change takes away answers for none of its own diagnostics", async () => {
  const root = staged({ "akasha/one.ts": TWO_BREAKS })
  expect(await over(root, "akasha/one.ts", null)).toEqual([])
})

test("an export the change takes away breaks the file reading it", async () => {
  const root = staged({
    "akasha/held.ts": "export const one = 1\nexport const two = 2\n",
    "akasha/calls.ts": 'import { two } from "./held.ts"\nexport const said = two\n',
  })
  const said = await over(root, "akasha/held.ts", "export const one = 1\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
})

test("a file the change brings is compiled though no disk holds it", async () => {
  const root = staged({ "akasha/one.ts": ONE_NUMBER })
  const said = await judged(change(root, { "akasha/two.ts": "export const two: string = 2\n" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/two.ts")
})

test("a diagnostic against a file the change did not touch is reported once, however many paths it holds", async () => {
  const root = staged({
    "akasha/broken.ts":
      'import { a } from "./a.ts"\nimport { b } from "./b.ts"\nimport { c } from "./c.ts"\nexport const one: string = a + b + c\n',
    "akasha/a.ts": "export const a = 1\n",
    "akasha/b.ts": "export const b = 2\n",
    "akasha/c.ts": "export const c = 3\n",
  })
  const said = await judged(
    change(root, {
      "akasha/a.ts": "export const a = 10\n",
      "akasha/b.ts": "export const b = 20\n",
      "akasha/c.ts": "export const c = 30\n",
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/broken.ts")
})

test("an index read without a guard is refused, so the settings are the strict ones", async () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  const said = await over(
    root,
    "akasha/one.ts",
    "export function first(held: readonly string[]): string {\n  return held[0]\n}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("undefined")
})

test("a file that is not TypeScript is passed over, and a file outside the akasha folder is not judged", async () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  expect(await over(root, "akasha/notes.txt", "nothing to compile\n")).toEqual([])
  expect(await over(root, "shared/one.ts", "export const one: string = 1\n")).toEqual([])
})

test("a folder holding no TypeScript is judged clean without a program being built", async () => {
  const root = staged({ "akasha/notes.txt": "nothing to compile\n" })
  expect(await judged(change(root, { "akasha/notes.txt": "still nothing\n" }))).toEqual([])
})

test("the files compiled are the change and everything importing it, however far", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/deep/two.ts": 'import { one } from "../one.ts"\nexport const two = one\n',
    "akasha/deep/three.ts": 'import { two } from "./two.ts"\nexport const three = two\n',
    "akasha/apart.ts": "export const apart = 1\n",
  })
  expect(reached(change(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/deep/three.ts",
    "akasha/deep/two.ts",
    "akasha/one.ts",
  ])
  expect(reached(change(root, { "akasha/apart.ts": "export const apart = 2\n" }))).toEqual([
    "akasha/apart.ts",
  ])
})

test("a file nothing in the change reaches is not compiled, so its standing errors are not this change's", async () => {
  const root = staged({
    "akasha/broken.ts": "export const one: string = 1\n",
    "akasha/apart.ts": "export const apart = 1\n",
  })
  expect(await judged(change(root, { "akasha/apart.ts": "export const apart = 2\n" }))).toEqual([])
})

test("a file outside the akasha folder never becomes a root, however the index names it", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "shared/two.ts": 'import { one } from "../akasha/one.ts"\nexport const two = one\n',
  })
  expect(reached(change(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/one.ts",
  ])
})

test("an index naming no commit still answers a change, its importers being the ones it leaves", async () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/two.ts": 'import { one } from "./one.ts"\nexport const two: string = one\n',
  })
  const changed = { "akasha/one.ts": "export const one = 2\n" }
  expect(reached(change(root, changed))).toEqual(["akasha/one.ts", "akasha/two.ts"])
  stampTakenFrom(root)
  const held = change(root, changed)
  const audit: Change = { ...held, before: held.before, after: held.before }
  expect(() => reached(audit)).toThrow(NAMING_NO_COMMIT)
  expect(reached(held)).toEqual(["akasha/one.ts", "akasha/two.ts"])
  expect(reachedBy(held, shadowAsked(held).index)).toEqual(["akasha/one.ts", "akasha/two.ts"])
  expect((await judged(held)).map((one) => one.path)).toEqual(["akasha/two.ts"])
})

test("an index standing and naming no importer is an answer, so the change alone is compiled", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/two.ts": "export const two = 2\n",
  })
  expect(reached(change(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/one.ts",
  ])
})

test("a change naming no TypeScript under the akasha folder asks the index nothing", async () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  rmSync(join(root, ".git"), { recursive: true })
  expect(await judged(change(root, { "akasha/notes.txt": "nothing to compile\n" }))).toEqual([])
})

test("a file whole at base and deleted from the worktree alone still answers for its errors", async () => {
  const root = staged({
    "akasha/a.ts": ONE_NUMBER,
    "akasha/b.ts": 'import { one } from "./a.ts"\nexport const two: string = one\n',
  })
  const held = readFileSync(join(root, "akasha/b.ts"), "utf8")
  const changed = { "akasha/a.ts": ONE_NUMBER }
  const refusals = await judged(change(root, changed))
  rmSync(join(root, "akasha/b.ts"))
  const gone = await judged(change(root, changed, { "akasha/b.ts": held }))
  expect(refusals).toHaveLength(1)
  expect(refusals[0]?.path).toBe("akasha/b.ts")
  expect(gone).toEqual(refusals)
})

test("a diagnostic carried in a chain is one reason", async () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  const said = await over(
    root,
    "akasha/one.ts",
    "type A = { a: number }\ntype B = { a: number; b: number }\nexport const one: B = { a: 1 } as A\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("missing")
})
