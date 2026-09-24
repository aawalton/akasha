import { afterAll, expect, test } from "bun:test"
import {
  linksIn,
  namedIn,
  namedOver,
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

test("a test beside an importer that the change leaves nowhere is named by nothing", () => {
  const said = namedOver([FIXTURE_AT], thereAt(FIXTURE_TEST_AT), importing(FIXTURE_AT))
  expect(said).toEqual([FIXTURE_TEST_AT])
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
