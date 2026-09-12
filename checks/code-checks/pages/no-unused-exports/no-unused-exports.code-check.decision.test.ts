import { afterAll, expect, test } from "bun:test"
import {
  namedWithin,
  namesToldIn,
  refusalsOver,
  takenFrom,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.code.ts"
import {
  AT,
  BESIDE_AT,
  BESIDE_TEXT,
  EVERY_TEXT,
  HELD_TEXT,
  importedBy,
  KEPT_TEXT,
  PAGE_AT,
  PAGE_TEXT,
  READER,
  ROUTE_AT,
  ROUTE_TEXT,
  readerText,
  reading,
  rooted,
  SPELLED,
  scratch,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.test-fixtures.ts"
import { judgingBy, landing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(refusalsOver)

test("the values a file exports are told apart by name", () => {
  expect(namesToldIn(AT, HELD_TEXT)).toEqual(["held", "spare"])
})

test("a file exporting every name of another file is judged by nothing", () => {
  expect(namesToldIn(AT, 'export * from "akasha/one.module.code.ts"\n')).toBeNull()
})

test("the names a file itself uses are told from the names that file only exports", () => {
  const here = namedWithin(AT, KEPT_TEXT)

  expect(here.has("held")).toBe(true)
  expect(here.has("spare")).toBe(false)
})

test("a value its own file names is refused for the export and one nothing names for the value", () => {
  const said = judging(landing(rooted(), { [AT]: bytesOf(KEPT_TEXT) })).map((one) => one.reason)

  expect(said).toEqual([
    "exports `held`, which no other file names — a value only its own file names is published for nothing",
    "exports `spare`, which nothing names — a value nothing names is code nothing runs",
  ])
})

test("a tag a browser draws itself names no value the file exports", () => {
  const at = "akasha/held.route.code.tsx"
  const text =
    "export function meta(): null {\n  return null\n}\n\n" +
    "export function Held(): unknown {\n  return <meta />\n}\n"

  expect(namedWithin(at, text).has("meta")).toBe(false)
})

test("the names an importer takes from one file are read off its import", () => {
  expect(takenFrom(READER, readerText("held"), AT)).toEqual(["held"])
})

test("a file naming another in an import expression takes every name that file exports", () => {
  const text = `export type Every = typeof import("${SPELLED}")\n`

  expect(takenFrom(READER, text, AT)).toEqual(["*"])
})

test("an import expression naming another file takes nothing from this one", () => {
  const text = 'export type Every = typeof import("akasha/elsewhere.module.code.ts")\n'

  expect(takenFrom(READER, text, AT)).toEqual([])
})

test("an import of another file names nothing taken from this one", () => {
  expect(takenFrom(READER, 'import { held } from "akasha/elsewhere.module.code.ts"\n', AT)).toEqual(
    []
  )
})

test("a value no other file names is refused and one another file names is not", () => {
  const root = rooted()
  reading(root, readerText("held"))
  importedBy(root, [READER])

  const said = judging(landing(root, { [AT]: bytesOf(HELD_TEXT) })).map((one) => one.reason)

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a file no file imports has every value it exports refused", () => {
  const root = rooted()

  expect(judging(landing(root, { [AT]: bytesOf(HELD_TEXT) }))).toHaveLength(2)
})

test("an import taking every name a file exports leaves that file unrefused", () => {
  const root = rooted()
  reading(root, EVERY_TEXT)
  importedBy(root, [READER])

  expect(judging(landing(root, { [AT]: bytesOf(HELD_TEXT) }))).toEqual([])
})

test("the export a page file is named for is spared and another beside it is judged", () => {
  const said = judging(landing(rooted(), { [PAGE_AT]: bytesOf(PAGE_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the value a page's uncommitted body holds is spared and another beside it is judged", () => {
  const said = judging(landing(rooted(), { [BESIDE_AT]: bytesOf(BESIDE_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a route's code is judged by nothing", () => {
  expect(judging(landing(rooted(), { [ROUTE_AT]: bytesOf(ROUTE_TEXT) }))).toEqual([])
})

test("a file the change takes away is passed over", () => {
  expect(judging(landing(rooted(), { [AT]: null }))).toEqual([])
})

test("a file that is no TypeScript body is passed over", () => {
  expect(judging(landing(rooted(), { "akasha/held.md": bytesOf(HELD_TEXT) }))).toEqual([])
})
