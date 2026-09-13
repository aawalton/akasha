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
  CHECK_AT,
  CHECK_TEXT,
  COMMAND_AT,
  COMMAND_TEXT,
  EVERY_TEXT,
  FIXTURES_AT,
  GENERATOR_AT,
  GENERATOR_TEXT,
  GUARD_AT,
  GUARD_TEXT,
  HELD_TEXT,
  importedAt,
  importedBy,
  KEPT_TEXT,
  LUA_AT,
  LUA_TEXT,
  lualibPaged,
  MANIFEST_AT,
  MANIFEST_TEXT,
  MODEL_TEST_AT,
  MODEL_TEST_TEXT,
  PAGE_AT,
  PAGE_TEXT,
  PERFORMANCE_AT,
  PERFORMANCE_TEXT,
  PROVER,
  proving,
  READER,
  ROOT_AT,
  ROOT_TEXT,
  ROUTE_AT,
  ROUTE_TEXT,
  readerText,
  reading,
  rooted,
  SPELLED,
  scratch,
  TUNNEL_AT,
  TUNNEL_TEXT,
  takenText,
  WORK_AT,
  WORK_TEXT,
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

test("a value only a test names is refused for the test rather than for nothing naming it", () => {
  const root = rooted()
  proving(root, readerText("held"))
  importedBy(root, [PROVER])

  const said = judging(landing(root, { [AT]: bytesOf(HELD_TEXT) })).map((one) => one.reason)

  expect(said).toEqual([
    "exports `held`, which only a test names — a value only a test names is code only the test runs",
    "exports `spare`, which nothing names — a value nothing names is code nothing runs",
  ])
})

test("a test taking every name a file exports leaves each of them refused for the test", () => {
  const root = rooted()
  proving(root, EVERY_TEXT)
  importedBy(root, [PROVER])

  const said = judging(landing(root, { [AT]: bytesOf(HELD_TEXT) })).map((one) => one.reason)

  expect(said).toHaveLength(2)
  expect(said[0]).toContain("only a test names")
})

test("a value a test names in a test-fixtures file is reached", () => {
  const root = rooted()
  proving(root, takenText("held", FIXTURES_AT))
  importedAt(root, FIXTURES_AT, [PROVER])

  const said = judging(landing(root, { [FIXTURES_AT]: bytesOf(HELD_TEXT) })).map(
    (one) => one.reason
  )

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

test("the `runGuard` a change guard's code exports is spared", () => {
  const said = judging(landing(rooted(), { [GUARD_AT]: bytesOf(GUARD_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the name made from a check's slug is spared in that check's code", () => {
  const said = judging(landing(rooted(), { [CHECK_AT]: bytesOf(CHECK_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `work` a computed property's code exports is spared", () => {
  const said = judging(landing(rooted(), { [WORK_AT]: bytesOf(WORK_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the name made from a command's slug is spared in that command's code", () => {
  const said = judging(landing(rooted(), { [COMMAND_AT]: bytesOf(COMMAND_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the name a lualib page states as its lua export is spared", () => {
  const root = rooted()
  lualibPaged(root)

  const said = judging(landing(root, { [LUA_AT]: bytesOf(LUA_TEXT) })).map((one) => one.reason)

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a name React Router reaches a route's code by is spared and another is judged", () => {
  const said = judging(landing(rooted(), { [ROUTE_AT]: bytesOf(ROUTE_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `routes` a tunnel routes file exports is spared and another is judged", () => {
  const said = judging(landing(rooted(), { [TUNNEL_AT]: bytesOf(TUNNEL_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a name React Router reaches a root route by is spared and another is judged", () => {
  const said = judging(landing(rooted(), { [ROOT_AT]: bytesOf(ROOT_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `BUILD_ENV` a manifest's code exports is spared and another beside it is judged", () => {
  const said = judging(landing(rooted(), { [MANIFEST_AT]: bytesOf(MANIFEST_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `measured` a performance's code exports is spared and another beside it is judged", () => {
  const said = judging(landing(rooted(), { [PERFORMANCE_AT]: bytesOf(PERFORMANCE_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the three names a model test's code is reached by are spared and another is judged", () => {
  const said = judging(landing(rooted(), { [MODEL_TEST_AT]: bytesOf(MODEL_TEST_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the names a type generator is loaded by are spared and another beside them is judged", () => {
  const said = judging(landing(rooted(), { [GENERATOR_AT]: bytesOf(GENERATOR_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a file the change takes away is passed over", () => {
  expect(judging(landing(rooted(), { [AT]: null }))).toEqual([])
})

test("a file that is no TypeScript body is passed over", () => {
  expect(judging(landing(rooted(), { "akasha/held.md": bytesOf(HELD_TEXT) }))).toEqual([])
})
