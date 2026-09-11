import { afterAll, expect, test } from "bun:test"
import { readFileSync, realpathSync } from "node:fs"
import { join } from "node:path"
import type { Ran } from "akasha/code-system/code-tests/code-tests.module.code.ts"
import { repoAt } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { shadowAsked, shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { typingUnder } from "akasha/testing-system/declaring/declaring.module.code.ts"
import {
  change,
  gone,
  landing,
  proposing,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  failedIn,
  linksIn,
  namedIn,
  reasonOf,
  refusalsOver,
  refusedOf,
  saidOf,
  spentlyOf,
} from "./tests-pass.code-check.decision.code.ts"
import {
  BREAKS,
  COUNTED_AT,
  FAILS,
  HOLDS,
  PASSES,
  RAN_CHATTY_CLEAN,
  RAN_CHATTY_PASSED,
  RAN_ERRORED,
  RAN_FOREIGN_HEADER,
  RAN_LOGGED_ERROR,
  RAN_ONE_FAILED,
  RAN_TWO_FAILED,
  READS,
  repo,
  SORTED_AT,
  scratch,
  THROWS,
  withGuard,
  withoutGuard,
} from "./tests-pass.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function ranAs(
  verdict: Ran["verdict"],
  summary: Ran["summary"],
  output = "",
  slow: Ran["slow"] = [],
  cpuSeconds = 0
): Ran {
  return { code: 1, signal: null, output, summary, verdict, cpuSeconds, slow }
}

test("a run over the ceiling is refused by naming each file over it", () => {
  const said = reasonOf(
    ranAs("slow", { files: 1, failed: 0, passed: 9 }, "", [
      { path: "akasha/one.module.test.ts", cpuSeconds: 21.4 },
    ]),
    ["akasha/one.module.test.ts"],
    []
  )
  expect(said).toContain("akasha/one.module.test.ts")
  expect(said).toContain("a test file is given 5 processor seconds")
  expect(said).toContain("The tests themselves are green")
})

test("a measuring run names each file beside the seconds that file spent", () => {
  const said = spentlyOf([
    { path: "akasha/one.module.test.ts", cpuSeconds: 9.53, signal: null, code: 0 },
    { path: "akasha/two.module.test.ts", cpuSeconds: 0.42, signal: null, code: 0 },
  ])
  expect(said).toContain("akasha/one.module.test.ts spent 9.5 processor seconds")
  expect(said).toContain("akasha/two.module.test.ts spent 0.4 processor seconds")
  expect(said).toContain("no ceiling")
  expect(said).toContain("Nothing landed")
  expect(said).toContain("A test file may spend 5 processor seconds")
  expect(said).not.toContain("did not come back clean")
})

test("a measured file whose run failed is not read as a cost", () => {
  const said = spentlyOf([
    { path: "akasha/one.module.test.ts", cpuSeconds: 0.3, signal: null, code: 1 },
  ])
  expect(said).toContain("did not come back clean")
})

test("a file over the ceiling is named beside the seconds that file spent", () => {
  const said = reasonOf(
    ranAs("slow", { files: 1, failed: 0, passed: 9 }, "", [
      { path: "akasha/one.module.test.ts", cpuSeconds: 5.83 },
    ]),
    ["akasha/one.module.test.ts"],
    []
  )
  expect(said).toContain("akasha/one.module.test.ts spent 5.8 processor seconds")
  expect(said).toContain("a test file is given 5 processor seconds")
})

test("a run ended at the ceiling is not refused as the runner failing", () => {
  const said = reasonOf(
    ranAs("slow", { files: null, failed: null, passed: null }, "", [], 5.24),
    ["akasha/one.module.test.ts"],
    []
  )
  expect(said).toContain("5.2 processor seconds")
  expect(said).toContain("put none of them past the ceiling")
  expect(said).not.toContain("the runner failing")
})

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

test("a change carrying no file with a test beside it is judged by no run", () => {
  const root = repo({ "akasha/held.md": "held" })
  expect(
    withoutGuard(() => refusalsOver(change(root, ["akasha/held.md"]), shadowAt(root)))
  ).toEqual([])
})

test("a change is judged by the body it proposes, not the one standing on disk", () => {
  const root = repo({
    "akasha/one.module.code.ts": HOLDS,
    "akasha/one.module.test.ts": READS,
  })
  const at = proposing(root, "akasha/one.module.code.ts", BREAKS)
  const said = withoutGuard(() =>
    refusalsOver(change(root, ["akasha/one.module.code.ts"], at), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
  expect(readFileSync(join(root, "akasha/one.module.code.ts"), "utf8")).toBe(HOLDS)
  expect(
    withoutGuard(() => refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root)))
  ).toEqual([])
})

test("a run already inside a run refuses rather than saying the tests passed", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = withGuard(() =>
    refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("no test ran")
})

test("a run already inside a run refuses nothing where the change names no test", () => {
  const root = repo({ "akasha/held.md": "held" })
  const said = withGuard(() => refusalsOver(change(root, ["akasha/held.md"]), shadowAt(root)))
  expect(said).toEqual([])
})

test("a run reaching fewer files than it named is refused as saying nothing about the rest", () => {
  const said = reasonOf(ranAs("short", { files: 1, failed: 0, passed: 3 }), ["one", "two"], [])
  expect(said).toContain("1 of the 2 test files named ran")
  expect(said).toContain("say nothing about the rest")
})

test("a run printing no summary is refused as the runner failing, not a test", () => {
  const said = reasonOf(ranAs("crash", { files: null, failed: null, passed: null }), ["one"], [])
  expect(said).toContain("nothing says the tests ran at all")
  expect(said).toContain("the runner failing, not a test")
})

test("one test file is counted in the singular", () => {
  const said = reasonOf(ranAs("fail", { files: 1, failed: 1, passed: 2 }), ["one"], [])
  expect(said).toContain("over 1 test file standing beside")
  expect(said).toContain("1 of 3 tests failed")
})

test("the color the runner painted the output with is taken out", () => {
  const painted = `${String.fromCharCode(27)}[31mheld${String.fromCharCode(27)}[0m`
  expect(saidOf(painted)).toBe("held")
})

test("a blank line the runner printed is taken out", () => {
  expect(saidOf("one\n\n   \ntwo")).toBe("one\ntwo")
})

test("the whole run is carried rather than the end of the run", () => {
  const many = Array.from({ length: 200 }, (_, at) => `line ${at}`).join("\n")
  const said = saidOf(many)
  expect(said).toContain("line 0\n")
  expect(said).toContain("line 199")
})

const TREE = "akasha"

const TYPE_WAS = `${TREE}/text-property.page-type.ts`

const TYPE_NOW = `${TREE}/types/text-property.page-type.ts`

const INDEXES = Bun.resolveSync(
  "akasha/pages/indexes/reading/index-reading.module.code.ts",
  import.meta.dir
)

const RESOLVES =
  'import { expect, test } from "bun:test"\n' +
  `import { listedAt } from ${JSON.stringify(INDEXES)}\n` +
  'test("one", () => {\n' +
  '  const found = listedAt(process.cwd(), "page-type", "text-property")\n' +
  `  expect(found.map((one) => one.path)).toEqual([${JSON.stringify(TYPE_NOW)}])\n` +
  "})\n"

test("a run under a change that moves a page type resolves that page type where it lands", () => {
  const root = repoAt(realpathSync(scratch.rootFor("tests-pass-moved-")), typingUnder(TREE))
  const body = readFileSync(join(root, TYPE_WAS))
  const moved = landing(
    root,
    { [TYPE_WAS]: null, [TYPE_NOW]: body, "akasha/one.module.test.ts": bytesOf(RESOLVES) },
    { [TYPE_WAS]: body }
  )

  const said = withoutGuard(() => refusalsOver(moved, shadowAsked(moved)))

  expect(said).toEqual([])
})

test("a failing run is reported against the file whose tests failed", () => {
  const named = [COUNTED_AT, SORTED_AT].sort()
  expect(named[0]).toBe(SORTED_AT)
  const ran = ranAs("fail", { files: 2, failed: 1, passed: 7 }, RAN_ONE_FAILED)
  expect(refusedOf(ran, named, SORTED_AT).path).toBe(COUNTED_AT)
})

test("that refusal names each file the output blames", () => {
  const named = [SORTED_AT, COUNTED_AT]
  const ran = ranAs("fail", { files: 2, failed: 3, passed: 3 }, RAN_TWO_FAILED)
  const said = refusedOf(ran, named, SORTED_AT)
  expect(said.path).toBe(SORTED_AT)
  expect(said.reason).toContain("2 test files failed")
  expect(said.reason).toContain(SORTED_AT)
  expect(said.reason).toContain(COUNTED_AT)
})

test("a run whose output blames no file is reported against the first test file named", () => {
  const ran = ranAs("crash", { files: null, failed: null, passed: null })
  expect(refusedOf(ran, ["one"], "one").path).toBe("one")
})

test("a file the output names that the run did not name is blamed by nothing", () => {
  expect(failedIn(RAN_ONE_FAILED, [SORTED_AT])).toEqual([])
})

test("a file that printed and passed is left out while the one that failed is named", () => {
  expect(failedIn(RAN_CHATTY_PASSED, [SORTED_AT, COUNTED_AT])).toEqual([COUNTED_AT])
})

test("a run whose files only printed blames no file at all", () => {
  expect(failedIn(RAN_CHATTY_CLEAN, [SORTED_AT, COUNTED_AT])).toEqual([])
})

test("an error a passing file's test logged blames that file with nothing", () => {
  expect(failedIn(RAN_LOGGED_ERROR, [SORTED_AT, COUNTED_AT])).toEqual([COUNTED_AT])
})

test("a failure under a file the run did not name blames no file", () => {
  expect(failedIn(RAN_FOREIGN_HEADER, [SORTED_AT, COUNTED_AT])).toEqual([])
})

test("a run that only errored is not said to have failed a count of tests", () => {
  const ran = ranAs("fail", { files: 1, failed: 0, passed: 5 }, RAN_ERRORED)
  const said = refusedOf(ran, [SORTED_AT], SORTED_AT)
  expect(said.path).toBe(SORTED_AT)
  expect(said.reason).toContain("1 test file errored")
  expect(said.reason).toContain("1 error was raised outside any test, and no test failed")
  expect(said.reason).not.toContain("0 of 5 tests failed")
})

test("a run that failed and errored counts both", () => {
  const ran = ranAs("fail", { files: 2, failed: 3, passed: 3 }, RAN_TWO_FAILED)
  expect(refusedOf(ran, [SORTED_AT, COUNTED_AT], SORTED_AT).reason).toContain(
    "3 of 6 tests failed, and 1 error was raised outside any test"
  )
})

test("what the runner said after a batch ended blames no file in that batch", () => {
  const said = `${RAN_CHATTY_CLEAN}error: regex "^held$" matched 0 tests. Searched 2 files\n`
  expect(failedIn(said, [SORTED_AT, COUNTED_AT])).toEqual([])
})

test("a refusal blaming no file says the file it names is not the one that failed", () => {
  const ran = ranAs("fail", { files: 2, failed: 1, passed: 12 }, RAN_CHATTY_CLEAN)
  expect(reasonOf(ran, [SORTED_AT], [])).toContain("prints no failure under any file")
})

test("the reason names a file where it stands in the change, not in the world it ran in", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = withoutGuard(() =>
    refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said[0]?.reason).not.toContain("/var/tmp/akasha-world-")
  expect(said[0]?.reason).toContain("akasha/one.module.test.ts")
})

test("a file that throws as it loads is the file the refusal names", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
    "akasha/two.module.code.ts": "",
    "akasha/two.module.test.ts": THROWS,
  })
  const said = withoutGuard(() =>
    refusalsOver(
      change(root, ["akasha/one.module.code.ts", "akasha/two.module.code.ts"]),
      shadowAt(root)
    )
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/two.module.test.ts")
  expect(said[0]?.reason).toContain("1 error was raised outside any test")
})
