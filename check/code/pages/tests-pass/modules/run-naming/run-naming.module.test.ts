import { afterAll, expect, test } from "bun:test"
import {
  linksIn,
  namedIn,
  namedOver,
  reachersIn,
  readersIn,
} from "akasha/check/code/pages/tests-pass/modules/run-naming/run-naming.module.code.ts"
import {
  HOLDS,
  PASSES,
  repo,
  scratch,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.test-fixtures.ts"
import {
  change,
  gone,
  proposing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function namedAt(over: Change): readonly string[] {
  return namedIn(over, shadowAsked(over))
}

test("the tests named are the ones standing beside the files the change carries", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
    "akasha/two.module.test.ts": PASSES,
  })
  const said = namedAt(change(root, ["akasha/one.module.code.ts", "akasha/two.module.ts"]))
  expect(said).toEqual(["akasha/one.module.test.ts", "akasha/two.module.test.ts"])
})

test("a page, its code and its test all name the one test beside them", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  const changed = ["akasha/one.module.ts", "akasha/one.module.code.ts", "akasha/one.module.test.ts"]
  expect(namedAt(change(root, changed))).toEqual(["akasha/one.module.test.ts"])
})

test("a file whose test does not stand beside it names no test", () => {
  const root = repo({ "akasha/one.module.code.ts": "" })
  expect(namedAt(change(root, ["akasha/one.module.code.ts"]))).toEqual([])
})

test("a file that is not typescript names no test", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  expect(namedAt(change(root, ["akasha/held.md", "akasha/held.json"]))).toEqual([])
})

test("a test file the change brings is named, though nothing stands at it on disk", () => {
  const root = repo({})
  const added = "akasha/new.module.test.ts"
  const at = proposing(root, added, PASSES)
  expect(namedAt(change(root, ["akasha/new.module.code.ts"], at))).toEqual([added])
})

test("a test file the change takes away is named by nothing", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  expect(namedAt(change(root, ["akasha/one.module.code.ts"], gone))).toEqual([])
})

const FIXTURE_AT = "akasha/one/one.module.test-fixtures.ts"

const FIXTURE_TEST_AT = "akasha/one/one.module.test.ts"

const IMPORTER_AT = "akasha/two/two.module.code.ts"

const IMPORTER_TEST_AT = "akasha/two/two.module.test.ts"

function importing(of: string): (path: string) => readonly string[] {
  return (path) => (path === of ? [IMPORTER_AT] : [])
}

function thereAt(...held: readonly string[]): (path: string) => boolean {
  const there = new Set(held)
  return (path) => there.has(path)
}

test("a fixture the change carries names the tests beside a file in another folder importing it", () => {
  const there = thereAt(FIXTURE_TEST_AT, IMPORTER_TEST_AT)
  const said = namedOver([FIXTURE_AT], there, importing(FIXTURE_AT))
  expect(said).toEqual([FIXTURE_TEST_AT, IMPORTER_TEST_AT])
})

test("a test fixture page's code names the tests beside a file importing it", () => {
  const at = "akasha/test-fixtures/held/held.test-fixture.code.ts"
  const said = namedOver([at], thereAt(IMPORTER_TEST_AT), importing(at))
  expect(said).toEqual([IMPORTER_TEST_AT])
})

test("a file that is no test fixture names only the tests beside it, though a file imports it", () => {
  const at = "akasha/one/one.module.code.ts"
  const there = thereAt(FIXTURE_TEST_AT, IMPORTER_TEST_AT)
  expect(namedOver([at], there, importing(at))).toEqual([FIXTURE_TEST_AT])
})

test("a file that is no test fixture names a test file importing it directly", () => {
  const at = "akasha/builds/held.character-build.ts"
  const importedBy = (path: string): readonly string[] =>
    path === at ? [IMPORTER_TEST_AT, IMPORTER_AT] : []
  const there = thereAt(IMPORTER_TEST_AT)
  expect(namedOver([at], there, importedBy)).toEqual([IMPORTER_TEST_AT])
})

test("a test file importing a changed file that the change leaves nowhere is named by nothing", () => {
  const at = "akasha/builds/held.character-build.ts"
  const importedBy = (path: string): readonly string[] => (path === at ? [IMPORTER_TEST_AT] : [])
  expect(namedOver([at], thereAt(), importedBy)).toEqual([])
})

test("a test beside an importer that the change leaves nowhere is named by nothing", () => {
  const said = namedOver([FIXTURE_AT], thereAt(FIXTURE_TEST_AT), importing(FIXTURE_AT))
  expect(said).toEqual([FIXTURE_TEST_AT])
})

const READER_AT = "akasha/reader/reader.module.ts"

const READER_TEST_AT = "akasha/reader/reader.module.test.ts"

const READ_AT = "akasha/stats/health.stat.formula.ts"

function reading(of: string): (path: string) => readonly string[] {
  return (path) => (path === of ? [READER_AT] : [])
}

function noImporters(): readonly string[] {
  return []
}

test("a file of a page whose type a module's test reads names that module's test", () => {
  const said = namedOver([READ_AT], thereAt(READER_TEST_AT), noImporters, reading(READ_AT))
  expect(said).toEqual([READER_TEST_AT])
})

test("a reader's test the change leaves nowhere is named by nothing", () => {
  expect(namedOver([READ_AT], thereAt(), noImporters, reading(READ_AT))).toEqual([])
})

const CASE_AT = "akasha/case/case.module.ts"

const CASE_CODE_AT = "akasha/case/case.module.code.ts"

const CASE_TEST_AT = "akasha/case/case.module.test.ts"

const DEEP_AT = "akasha/deep/deep.module.code.ts"

const SHAPE_AT = "akasha/shape/shape.module.code.ts"

const IMPORTS = new Map([
  [DEEP_AT, [{ path: CASE_CODE_AT, typed: false, deferred: false }]],
  [SHAPE_AT, [{ path: CASE_CODE_AT, typed: true, deferred: false }]],
  [CASE_CODE_AT, [{ path: CASE_TEST_AT, typed: false, deferred: false }]],
])

function indexReaching(said: object): Pick<Answering, "valuesByPath" | "importsReaching"> {
  return {
    valuesByPath: (kind) =>
      new Map(
        kind === "module" ? [[CASE_AT, { slug: "case", code: "ts", test: "ts", ...said }]] : []
      ),
    importsReaching: (path) => IMPORTS.get(path) ?? [],
  }
}

test("a file a module's test reaches through importers at any depth names that test", () => {
  expect(reachersIn(indexReaching({ testReaches: true }))(DEEP_AT)).toEqual([CASE_TEST_AT])
})

test("a module saying nothing of its reach names its test for no file below its code", () => {
  expect(reachersIn(indexReaching({}))(DEEP_AT)).toEqual([])
})

test("a file imported for its types alone reaches no test", () => {
  expect(reachersIn(indexReaching({ testReaches: true }))(SHAPE_AT)).toEqual([])
})

test("a change to a file a reaching test reaches names that test, unless the change leaves it nowhere", () => {
  const reachers = reachersIn(indexReaching({ testReaches: true }))
  const there = thereAt(CASE_TEST_AT)
  expect(namedOver([DEEP_AT], there, noImporters, noImporters, reachers)).toEqual([CASE_TEST_AT])
  expect(namedOver([DEEP_AT], thereAt(), noImporters, noImporters, reachers)).toEqual([])
})

const STAT_TYPE_AT = "akasha/stat/stat.page-type.ts"

const OTHER_AT = "akasha/other/other.module.ts"

const KEYED = new Map<string, string | null>([
  ["stat-manifest", "stat.json"],
  ["stat-folder", null],
])

function indexNaming(
  propertySlug: string
): Pick<Answering, "listedAt" | "namersAt" | "fileKeysAt" | "typesCarrying"> {
  return {
    listedAt: (kind, slug) =>
      kind === "page-type" && slug === "stat" ? [{ path: STAT_TYPE_AT, id: "stat" }] : [],
    namersAt: (path) =>
      path === STAT_TYPE_AT
        ? [
            { path: READER_AT, propertySlug },
            { path: OTHER_AT, propertySlug: "parts" },
          ]
        : [],
    fileKeysAt: () => KEYED,
    typesCarrying: (named) => new Set(named === "stat-manifest" ? ["stat"] : []),
  }
}

test("the readers of a file are the modules naming its page type among those their tests read", () => {
  expect(readersIn(indexNaming("test-reads"))(READ_AT)).toEqual([READER_AT])
})

test("a module naming the page type under another property is no reader", () => {
  expect(readersIn(indexNaming("parts"))(READ_AT)).toEqual([])
})

test("a file that names no page type has no reader", () => {
  expect(readersIn(indexNaming("test-reads"))("akasha/held.md")).toEqual([])
})

test("a file a page type's file property names is read as of that type, at any depth", () => {
  expect(readersIn(indexNaming("test-reads"))("stat.json")).toEqual([READER_AT])
  expect(readersIn(indexNaming("test-reads"))("akasha/one/stat.json")).toEqual([READER_AT])
})

test("a file only ending in such a name is of no type", () => {
  expect(readersIn(indexNaming("test-reads"))("akasha/onestat.json")).toEqual([])
})

const SCOPED = '{ "name": "@akasha/held" }\n'

test("a manifest the change carries is reached under the name that manifest states", () => {
  const root = repo({ "held/package.json": SCOPED })
  const said = linksIn(change(root, ["held/package.json"]))
  expect(said.get("node_modules/@akasha/held")).toEqual({ linkedTo: "../../held" })
})

test("a name under no scope reaches the folder its manifest sits in", () => {
  const root = repo({ "held/package.json": '{ "name": "held" }\n' })
  const said = linksIn(change(root, ["held/package.json"]))
  expect(said.get("node_modules/held")).toEqual({ linkedTo: "../held" })
})

test("the manifest at the repository root is reached under no name", () => {
  const root = repo({ "package.json": SCOPED })
  expect(linksIn(change(root, ["package.json"])).size).toBe(0)
})

test("a file that is no manifest is reached under no name", () => {
  const root = repo({ "held/one.module.code.ts": HOLDS })
  expect(linksIn(change(root, ["held/one.module.code.ts"])).size).toBe(0)
})

test("a manifest calling its package nothing is reached under no name", () => {
  const root = repo({ "held/package.json": '{ "private": true }\n' })
  expect(linksIn(change(root, ["held/package.json"])).size).toBe(0)
})
