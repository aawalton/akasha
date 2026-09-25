import { afterAll, expect, test } from "bun:test"
import {
  namedWithin,
  refusalsOver,
} from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.code.ts"
import {
  AT,
  BESIDE_AT,
  BESIDE_TEXT,
  CHECK_AT,
  CHECK_TEXT,
  COMMAND_AT,
  COMMAND_TEXT,
  DRAWING_AT,
  DRAWING_TEXT,
  drawingGrouped,
  EVERY_TEXT,
  FIXTURES_AT,
  FIXTURES_CODE_AT,
  FIXTURES_PROVER,
  FORMAT_AT,
  FORMAT_TEXT,
  grouped,
  HELD_TEXT,
  importedAt,
  importedBy,
  KEPT_TEXT,
  LOADERLESS_AT,
  LOADERLESS_TEXT,
  LUA_AT,
  LUA_TEXT,
  lualibPaged,
  MODEL_TEST_AT,
  MODEL_TEST_TEXT,
  PAGE_AT,
  PAGE_TEXT,
  PERFORMANCE_AT,
  PERFORMANCE_TEXT,
  PROVER,
  proving,
  provingItsOwn,
  READER,
  ROOT_AT,
  ROOT_TEXT,
  ROUTE_AT,
  ROUTE_TEXT,
  RULE_AT,
  RULE_TEXT,
  readerText,
  reading,
  rooted,
  SERVICE_AT,
  SERVICE_TEXT,
  SHAPE_AT,
  SHAPE_TEXT,
  SLUGGED_AT,
  SLUGGED_TEXT,
  SPELLED,
  scratch,
  takenText,
  WARRANT_AT,
  WARRANT_TEXT,
  WORK_AT,
  WORK_TEXT,
  WRITING_AT,
  WRITING_TEXT,
} from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.test-fixtures.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  judgingBy,
  landing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(refusalsOver)

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

test("a value its own file names is reached even where only a test imports it", () => {
  const root = rooted()
  proving(root, readerText("held"))
  importedBy(root, [PROVER])

  const said = judging(landing(root, { [AT]: bytesOf(KEPT_TEXT) })).map((one) => one.reason)

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
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

test("a value a test names in a test-fixture page's code is reached", () => {
  const root = rooted()
  proving(root, takenText("held", FIXTURES_CODE_AT))
  importedAt(root, FIXTURES_CODE_AT, [PROVER])

  const said = judging(landing(root, { [FIXTURES_CODE_AT]: bytesOf(HELD_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a fixture's value its own test alone names is refused for that test", () => {
  const root = rooted()
  provingItsOwn(root, takenText("held", FIXTURES_CODE_AT))
  importedAt(root, FIXTURES_CODE_AT, [FIXTURES_PROVER])

  const said = judging(landing(root, { [FIXTURES_CODE_AT]: bytesOf(HELD_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(2)
  expect(said[0]).toContain("only a test names")
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

test("the `runService` a service's running code exports is spared", () => {
  const said = judging(landing(rooted(), { [SERVICE_AT]: bytesOf(SERVICE_TEXT) })).map(
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

test("the `mark` and the name made from a syntax rule's slug are spared in its code", () => {
  const said = judging(landing(rooted(), { [RULE_AT]: bytesOf(RULE_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `HOLDS` and the name made from a folder shape's slug are spared in its code", () => {
  const said = judging(landing(rooted(), { [SHAPE_AT]: bytesOf(SHAPE_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the name made from a name format's slug is spared in that format's code", () => {
  const said = judging(landing(rooted(), { [FORMAT_AT]: bytesOf(FORMAT_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the name made from a page's slug is spared where its type names a loader", () => {
  const said = judging(landing(rooted(), { [WARRANT_AT]: bytesOf(WARRANT_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a page type naming no loader leaves the name made from its page's slug judged", () => {
  const said = judging(landing(rooted(), { [LOADERLESS_AT]: bytesOf(LOADERLESS_TEXT) }))

  expect(said).toHaveLength(2)
})

test("the `bodyIn` a writing group's code exports is spared and another beside it is judged", () => {
  const root = rooted()
  grouped(root)

  const said = judging(landing(root, { [WRITING_AT]: bytesOf(WRITING_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `Drawing` a component group's code exports is spared and another beside it is judged", () => {
  const root = rooted()
  drawingGrouped(root)

  const said = judging(landing(root, { [DRAWING_AT]: bytesOf(DRAWING_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the `bodyIn` a file exports under a group that writes no file is judged", () => {
  const said = judging(landing(rooted(), { [WRITING_AT]: bytesOf(WRITING_TEXT) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(2)
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

test("a name React Router reaches a root route by is spared and another is judged", () => {
  const said = judging(landing(rooted(), { [ROOT_AT]: bytesOf(ROOT_TEXT) })).map(
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

test("a page named for a slug a value is spared under keeps the export the page is named for", () => {
  const said = judging(landing(rooted(), { [SLUGGED_AT]: bytesOf(SLUGGED_TEXT) })).map(
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

test("a type no other file names is refused and one another file imports is not", () => {
  const root = rooted()
  reading(root, readerText("Held"))
  importedBy(root, [READER])
  const text = "export type Held = number\n\nexport type Spare = string\n"

  const said = judging(landing(root, { [AT]: bytesOf(text) })).map((one) => one.reason)

  expect(said).toEqual([
    "exports `Spare`, which nothing names — a value nothing names is code nothing runs",
  ])
})

test("a type only its own file names is refused for the export", () => {
  const text = "export type Held = number\n\nexport const spare: Held = 1\n"

  const said = judging(landing(rooted(), { [AT]: bytesOf(text) })).map((one) => one.reason)

  expect(said[0]).toContain("`Held`, which no other file names")
})

test("a default no other file imports is refused and one imported is not", () => {
  const text = "export default function held(): number {\n  return 1\n}\n"
  expect(judging(landing(rooted(), { [AT]: bytesOf(text) }))).toHaveLength(1)

  const root = rooted()
  reading(root, `import held from "${SPELLED}"\n\nexport const reader = held\n`)
  importedBy(root, [READER])
  expect(judging(landing(root, { [AT]: bytesOf(text) }))).toEqual([])
})

const DEFAULTED =
  "export default function Held(): number {\n  return 1\n}\n\nexport const spare = 2\n"

test("the default a route module exports is spared and another beside it is judged", () => {
  const said = judging(landing(rooted(), { [ROUTE_AT]: bytesOf(DEFAULTED) })).map(
    (one) => one.reason
  )

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("the default a manifest's code exports is spared and another beside it is judged", () => {
  const said = judging(landing(rooted(), { "akasha/held.manifest.code.ts": bytesOf(DEFAULTED) }))

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`spare`")
})

test("the default a tool's config exports is spared and another beside it is judged", () => {
  for (const at of ["akasha/vite.config.ts", "akasha/react-router.config.ts", "akasha/routes.ts"]) {
    const said = judging(landing(rooted(), { [at]: bytesOf(DEFAULTED) }))

    expect(said).toHaveLength(1)
    expect(said[0]?.reason).toContain("`spare`")
  }
})

test("a types file beside a page is judged by nothing", () => {
  const text = "export type Held = number\n\nexport type Spare = string\n"

  expect(judging(landing(rooted(), { "akasha/held.domain.types.ts": bytesOf(text) }))).toEqual([])
})
