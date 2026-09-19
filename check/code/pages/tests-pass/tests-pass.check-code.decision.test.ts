import { afterAll, expect, test } from "bun:test"
import { readFileSync, realpathSync } from "node:fs"
import { join } from "node:path"
import {
  failedIn,
  reasonOf,
  refusalsOver,
  refusedOf,
  saidOf,
  spentlyOf,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import {
  AUTHORED_CHATTY_CLEAN,
  AUTHORED_CHATTY_PASSED,
  AUTHORED_ERRORED,
  AUTHORED_LOGGED_ERROR,
  AUTHORED_ONE_FAILED,
  AUTHORED_PASSED,
  AUTHORED_TWO_FAILED,
  BREAKS,
  CAPTURED_FOREIGN_HEADER,
  COUNTED_AT,
  FAILS,
  HOLDS,
  PASSES,
  READS,
  RESOLVES,
  ranAs,
  ranOverEach,
  repo,
  SORTED_AT,
  scratch,
  spentAs,
  THROWS,
  TREE,
  TYPE_NOW,
  TYPE_WAS,
  withGuard,
  withoutGuard,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.test-fixtures.ts"
import { reasonSaid } from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { typingUnder } from "akasha/check/test/fixture/declaring/declaring.test-fixture.code.ts"
import {
  change,
  landing,
  proposing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { repoAt } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { shadowAsked, shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a run over the ceiling is refused by naming each file over it, and says it is over cost", () => {
  const at = "akasha/one.module.test.ts"
  const ran = ranAs("slow", { files: 1, failed: 0, passed: 9 }, "", [
    { path: at, cpuSeconds: 21.4 },
  ])
  const said = reasonOf(ran, [at], [])
  expect(said).toContain(at)
  expect(said).toContain("a test file is given 5 processor seconds")
  expect(said).toContain("The tests themselves are green")
  expect(refusedOf(ran, [at], at).slow).toBe(true)
})

test("a measuring run names each file beside the seconds that file spent", () => {
  const said = spentlyOf([
    spentAs("akasha/one.module.test.ts", 9.53, 0),
    spentAs("akasha/two.module.test.ts", 0.42, 0),
  ])
  expect(said).toContain("akasha/one.module.test.ts spent 9.5 processor seconds")
  expect(said).toContain("akasha/two.module.test.ts spent 0.4 processor seconds")
  expect(said).toContain("no ceiling")
  expect(said).toContain("Nothing landed")
  expect(said).toContain("A test file may spend 5 processor seconds")
  expect(said).not.toContain("did not come back clean")
})

test("a measured file whose run failed is not read as a cost", () => {
  const said = spentlyOf([spentAs("akasha/one.module.test.ts", 0.3, 1)])
  expect(said).toContain("did not come back clean")
})

test("what a test file's run cost is recorded beside the page that file is of", async () => {
  const root = repo({
    "akasha/one.module.ts": "",
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  await withoutGuard(
    async () => await refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  const line = readFileSync(join(root, "akasha/one.module.entries.uncommitted.jsonl"), "utf8")
  expect(line.trim().split("\n").length).toBe(1)
  expect(line).toContain('"phase":"test"')
  expect(line).toContain('"ran":"akasha/one.module.test.ts"')
  expect(line).toContain('"refusals":0')
  expect(line).not.toContain('"peakBytes":0')
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

test("a change carrying no file with a test beside it is judged by no run", async () => {
  const root = repo({ "akasha/held.md": "held" })
  expect(
    await withoutGuard(
      async () => await refusalsOver(change(root, ["akasha/held.md"]), shadowAt(root))
    )
  ).toEqual([])
})

test("a change is judged by the body it proposes, not the one standing on disk", async () => {
  const root = repo({
    "akasha/one.module.code.ts": HOLDS,
    "akasha/one.module.test.ts": READS,
  })
  const at = proposing(root, "akasha/one.module.code.ts", BREAKS)
  const said = await withoutGuard(
    async () => await refusalsOver(change(root, ["akasha/one.module.code.ts"], at), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
  expect(readFileSync(join(root, "akasha/one.module.code.ts"), "utf8")).toBe(HOLDS)
  expect(
    await withoutGuard(
      async () => await refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
    )
  ).toEqual([])
})

test("a run already inside a run refuses rather than saying the tests passed", async () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = await withGuard(
    async () => await refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("no test ran")
})

test("a run already inside a run refuses nothing where the change names no test", async () => {
  const root = repo({ "akasha/held.md": "held" })
  const said = await withGuard(
    async () => await refusalsOver(change(root, ["akasha/held.md"]), shadowAt(root))
  )
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

test("a run under a change that moves a page type resolves that page type where it lands", async () => {
  const root = repoAt(realpathSync(scratch.rootFor("tests-pass-moved-")), typingUnder(TREE))
  const body = readFileSync(join(root, TYPE_WAS))
  const moved = landing(
    root,
    { [TYPE_WAS]: null, [TYPE_NOW]: body, "akasha/one.module.test.ts": bytesOf(RESOLVES) },
    { [TYPE_WAS]: body }
  )

  const said = await withoutGuard(async () => await refusalsOver(moved, shadowAsked(moved)))

  expect(said).toEqual([])
})

test("a failing run is reported against the file whose tests failed", () => {
  const named = [COUNTED_AT, SORTED_AT].sort()
  expect(named[0]).toBe(SORTED_AT)
  const ran = ranAs("fail", { files: 2, failed: 1, passed: 7 }, AUTHORED_ONE_FAILED)
  expect(refusedOf(ran, named, SORTED_AT).path).toBe(COUNTED_AT)
  expect(refusedOf(ran, named, SORTED_AT).slow).toBeUndefined()
})

test("that refusal names each file the output blames", () => {
  const named = [SORTED_AT, COUNTED_AT]
  const ran = ranAs("fail", { files: 2, failed: 3, passed: 3 }, AUTHORED_TWO_FAILED)
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
  expect(failedIn(AUTHORED_ONE_FAILED, [SORTED_AT])).toEqual([])
})

test("a file that printed and passed is left out while the one that failed is named", () => {
  expect(failedIn(AUTHORED_CHATTY_PASSED, [SORTED_AT, COUNTED_AT])).toEqual([COUNTED_AT])
})

test("a run whose files only printed blames no file at all", () => {
  expect(failedIn(AUTHORED_CHATTY_CLEAN, [SORTED_AT, COUNTED_AT])).toEqual([])
})

test("an error a passing file's test logged blames that file with nothing", () => {
  expect(failedIn(AUTHORED_LOGGED_ERROR, [SORTED_AT, COUNTED_AT])).toEqual([COUNTED_AT])
})

test("a failure under a file the run did not name blames no file", () => {
  expect(failedIn(CAPTURED_FOREIGN_HEADER, [SORTED_AT, COUNTED_AT])).toEqual([])
})

test("a run that only errored is not said to have failed a count of tests", () => {
  const ran = ranAs("fail", { files: 1, failed: 0, passed: 5 }, AUTHORED_ERRORED)
  const said = refusedOf(ran, [SORTED_AT], SORTED_AT)
  expect(said.path).toBe(SORTED_AT)
  expect(said.reason).toContain("1 test file errored")
  expect(said.reason).toContain("1 error was raised outside any test, and no test failed")
  expect(said.reason).not.toContain("0 of 5 tests failed")
})

test("a run that failed and errored counts both", () => {
  const ran = ranAs("fail", { files: 2, failed: 3, passed: 3 }, AUTHORED_TWO_FAILED)
  expect(refusedOf(ran, [SORTED_AT, COUNTED_AT], SORTED_AT).reason).toContain(
    "3 of 6 tests failed, and 1 error was raised outside any test"
  )
})

test("what the runner said after a batch ended blames no file in that batch", () => {
  const said = `${AUTHORED_CHATTY_CLEAN}error: regex "^held$" matched 0 tests. Searched 2 files\n`
  expect(failedIn(said, [SORTED_AT, COUNTED_AT])).toEqual([])
})

test("a refusal blaming no file says the file it names is not the one that failed", () => {
  const ran = ranAs("fail", { files: 2, failed: 1, passed: 12 }, AUTHORED_CHATTY_CLEAN)
  expect(reasonOf(ran, [SORTED_AT], [])).toContain("prints no failure under any file")
})

const MANY = 60

const HELD = AUTHORED_ONE_FAILED.length + AUTHORED_PASSED.length

test("a refusal carries the failing file's own output rather than the head of the run", () => {
  const each = [
    ...Array.from({ length: MANY }, (_, at) => ({
      path: `held/clean-${String(at)}/one.module.test.ts`,
      out: AUTHORED_PASSED,
    })),
    { path: COUNTED_AT, out: AUTHORED_ONE_FAILED, code: 1 },
  ]
  const ran = ranOverEach("fail", { files: MANY + 1, failed: 1, passed: 607 }, each)
  const said = reasonOf(
    ran,
    each.map((one) => one.path),
    [COUNTED_AT]
  )
  expect(said).not.toContain("Ran 10 tests across 1 file")
  expect(ran.output.length).toBeGreaterThan(HELD * 4)
  expect(reasonSaid(said, HELD)).toContain('Expected: "1 fileish"')
})

test("the reason names a file where it stands in the change, not in the world it ran in", async () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = await withoutGuard(
    async () => await refusalsOver(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said[0]?.reason).not.toContain("/var/tmp/akasha-world-")
  expect(said[0]?.reason).toContain("Measured at 20")
  expect(said[0]?.reason).toContain("akasha/one.module.test.ts")
})

test("a file that throws as it loads is the file the refusal names", async () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
    "akasha/two.module.code.ts": "",
    "akasha/two.module.test.ts": THROWS,
  })
  const said = await withoutGuard(
    async () =>
      await refusalsOver(
        change(root, ["akasha/one.module.code.ts", "akasha/two.module.code.ts"]),
        shadowAt(root)
      )
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/two.module.test.ts")
  expect(said[0]?.reason).toContain("Measured between 20")
  expect(said[0]?.reason).toContain("1 error was raised outside any test")
})
