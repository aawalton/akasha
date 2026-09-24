import { expect, test } from "bun:test"
import {
  judged,
  type Marked,
  marksOf,
  movedIn,
  placeOf,
  reasonFor,
  tableOf,
  type World,
} from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/hash-indexed-entry-keeps-its-place.check-code.decision.code.ts"

const PAGE = "kit/kit.module.ts"

const CODE = "kit/kit.module.code.ts"

const TYPE_PAGE = "skill/temper-skill.page-type.ts"

const TABLE: Marked = { page: PAGE, name: "KITS", code: CODE }

const ROWS: Marked = { page: TYPE_PAGE, name: "slug", code: null }

const HELD = 'const KITS = ["a"]\n'

const SKILL_A = "skill/pages/a/a.temper-skill.ts"

const SKILL_B = "skill/pages/b/b.temper-skill.ts"

function world(
  files: Readonly<Record<string, string>>,
  rows: readonly string[] = [],
  values: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {}
): World {
  return {
    read: (path) => files[path] ?? null,
    rowsOf: () => rows,
    valueOf: (path) => values[path] ?? null,
  }
}

test("a module names each table it marks, and where its code is", () => {
  const value = { slug: "kit", code: "ts", hashIndexed: ["KITS", "SLOTS"] }
  expect(marksOf(PAGE, value)).toEqual([TABLE, { ...TABLE, name: "SLOTS" }])
})

test("a page type marking its pages names no code", () => {
  expect(marksOf(TYPE_PAGE, { slug: "temper-skill", hashIndexed: ["slug"] })).toEqual([ROWS])
})

test("a page marking nothing names no table", () => {
  expect(marksOf(PAGE, { slug: "kit", code: "ts" })).toEqual([])
})

test("an entry added at the end moves nothing", () => {
  expect(movedIn(["a", "b"], ["a", "b", "c"])).toEqual([])
})

test("an entry added before the end moves every entry after it", () => {
  expect(movedIn(["a", "b"], ["a", "x", "b"])).toEqual([{ entry: "b", was: 1, now: 2 }])
})

test("two entries swapped are both moved", () => {
  expect(movedIn(["a", "b", "c"], ["b", "a", "c"])).toEqual([
    { entry: "a", was: 0, now: 1 },
    { entry: "b", was: 1, now: 0 },
  ])
})

test("an entry taken out is gone, and the entries after it move up", () => {
  expect(movedIn(["a", "b", "c"], ["a", "c"])).toEqual([
    { entry: "b", was: 1, now: null },
    { entry: "c", was: 2, now: 1 },
  ])
})

test("a refusal names the table, the entry, and its old and new index", () => {
  const said = reasonFor(TABLE, [{ entry: "axe", was: 1, now: 2 }]) ?? ""
  expect(said).toContain("`KITS` in kit/kit.module.code.ts")
  expect(said).toContain('"axe" moved from index 1 to index 2')
  expect(said).toContain("a new one goes at the end")
})

test("a refusal names an entry taken out as gone", () => {
  expect(reasonFor(TABLE, [{ entry: "axe", was: 1, now: null }])).toContain(
    '"axe" was at index 1 and is gone'
  )
})

test("a refusal over many moves names the first ten and counts the rest", () => {
  const moved = Array.from({ length: 12 }, (_, at) => ({ entry: `e${at}`, was: at, now: at + 1 }))
  const said = reasonFor(TABLE, moved) ?? ""
  expect(said).toContain('"e9" moved')
  expect(said).not.toContain('"e10" moved')
  expect(said).toContain("and 2 more moved")
})

test("a table read the same on both sides is let through", () => {
  const found = tableOf(TABLE, world({ [CODE]: "const KITS = { a: {}, b: {} }\n" }))
  expect(judged(TABLE, found, found)).toBeNull()
})

test("a table that could not be read before is held to nothing", () => {
  expect(
    judged(TABLE, tableOf(TABLE, world({})), tableOf(TABLE, world({ [CODE]: HELD })))
  ).toBeNull()
})

test("a table read before and no longer readable is refused", () => {
  const was = tableOf(TABLE, world({ [CODE]: HELD }))
  const now = tableOf(TABLE, world({ [CODE]: "const OTHER = []\n" }))
  expect(judged(TABLE, was, now)).toContain("could not be read")
})

test("a page type's pages marked by `slug` are read in order of their slugs", () => {
  const found = tableOf(ROWS, world({}, [SKILL_B, SKILL_A]))
  expect("entries" in found && found.entries).toEqual(["a", "b"])
})

test("a page type's pages marked by a field are read in order of that field", () => {
  const values = { [SKILL_A]: { hashPlace: 1 }, [SKILL_B]: { hashPlace: 0 } }
  const found = tableOf({ ...ROWS, name: "hashPlace" }, world({}, [SKILL_A, SKILL_B], values))
  expect("entries" in found && found.entries).toEqual(["b", "a"])
})

test("a page stating no value for the field its type is ordered by is unread", () => {
  const found = tableOf({ ...ROWS, name: "hashPlace" }, world({}, [SKILL_A], { [SKILL_A]: {} }))
  expect("unread" in found && found.unread).toContain("states no `hashPlace`")
})

test("a refusal over code lands on the code, and over pages on the page type", () => {
  expect(placeOf(TABLE)).toBe(CODE)
  expect(placeOf(ROWS)).toBe(TYPE_PAGE)
})
