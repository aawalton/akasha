import { afterAll, expect, test } from "bun:test"
import {
  linksIn,
  namedIn,
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

afterAll(scratch.sweep)

test("the tests named are the ones standing beside the files the change carries", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
    "akasha/two.module.test.ts": PASSES,
  })
  const said = namedIn(change(root, ["akasha/one.module.code.ts", "akasha/two.module.ts"]))
  expect(said).toEqual(["akasha/one.module.test.ts", "akasha/two.module.test.ts"])
})

test("a page, its code and its test all name the one test beside them", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  const changed = ["akasha/one.module.ts", "akasha/one.module.code.ts", "akasha/one.module.test.ts"]
  expect(namedIn(change(root, changed))).toEqual(["akasha/one.module.test.ts"])
})

test("a file whose test does not stand beside it names no test", () => {
  const root = repo({ "akasha/one.module.code.ts": "" })
  expect(namedIn(change(root, ["akasha/one.module.code.ts"]))).toEqual([])
})

test("a file that is not typescript names no test", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  expect(namedIn(change(root, ["akasha/held.md", "akasha/held.json"]))).toEqual([])
})

test("a test file the change brings is named, though nothing stands at it on disk", () => {
  const root = repo({})
  const added = "akasha/new.module.test.ts"
  const at = proposing(root, added, PASSES)
  expect(namedIn(change(root, ["akasha/new.module.code.ts"], at))).toEqual([added])
})

test("a test file the change takes away is named by nothing", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  expect(namedIn(change(root, ["akasha/one.module.code.ts"], gone))).toEqual([])
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
