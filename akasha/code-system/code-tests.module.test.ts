import { afterAll, expect, test as check } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../command-system/scratching.module.code.ts"
import {
  alreadyRunning,
  plain,
  ranOver,
  RUNNING,
  summaryIn,
  testBesideOf,
  testsUnder,
  verdictOf,
} from "./code-tests.module.code.ts"

const PASSES = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

const FAILS = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

const MARKED =
  'import { expect, test } from "bun:test"\n' +
  `test("one", () => { expect(process.env["${RUNNING}"]).toBe("1") })\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("code-tests-"))
  mkdirSync(join(root, "akasha"), { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, "akasha", name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

check("the test files under a path are counted, and other files are not", () => {
  const root = repo({
    "one.test.ts": PASSES,
    "held.ts": "export const held = 1\n",
    "deep/two.test.ts": PASSES,
  })
  expect(testsUnder(join(root, "akasha"))).toBe(2)
  expect(testsUnder(join(root, "akasha/held.ts"))).toBe(0)
  expect(testsUnder(join(root, "akasha/one.test.ts"))).toBe(1)
  expect(testsUnder(join(root, "akasha/nowhere"))).toBe(0)
})

check("a code file, its page and its test all answer the one test beside them", () => {
  expect(testBesideOf("akasha/one/held.module.code.ts")).toBe("akasha/one/held.module.test.ts")
  expect(testBesideOf("akasha/one/held.module.ts")).toBe("akasha/one/held.module.test.ts")
  expect(testBesideOf("akasha/one/held.module.test.ts")).toBe("akasha/one/held.module.test.ts")
})

check("a file that is no TypeScript file stands beside no test", () => {
  expect(testBesideOf("akasha/one/notes.md")).toBeNull()
  expect(testBesideOf("akasha/one/held")).toBeNull()
})

check("colour is taken out before the summary is read", () => {
  const painted = `${String.fromCharCode(27)}[32m 3 pass${String.fromCharCode(27)}[0m`
  expect(plain(painted)).toBe(" 3 pass")
  expect(summaryIn(painted).passed).toBe(3)
})

check("the summary is read out of what the run printed", () => {
  const output = " 7 pass\n 2 fail\nRan 9 tests across 4 files."
  expect(summaryIn(output)).toEqual({ files: 4, failed: 2, passed: 7 })
})

check("a run that printed no summary is read as a crash, whatever it exited", () => {
  expect(verdictOf(0, "", 3)).toBe("crash")
  expect(verdictOf(1, "bun: command not found", 3)).toBe("crash")
})

check("a run reaching fewer files than stand under it is short, not a pass", () => {
  const output = " 1 pass\n 0 fail\nRan 1 tests across 1 files."
  expect(verdictOf(0, output, 4)).toBe("short")
  expect(verdictOf(0, output, 1)).toBe("pass")
})

check("a green run exiting non-zero on a leaked handle is still a pass", () => {
  const output = " 9 pass\n 0 fail\nRan 9 tests across 2 files."
  expect(verdictOf(1, output, 2)).toBe("pass")
})

check("a run with a failing test is a failure whatever it exited", () => {
  const output = " 8 pass\n 1 fail\nRan 9 tests across 2 files."
  expect(verdictOf(0, output, 2)).toBe("fail")
  expect(verdictOf(1, output, 2)).toBe("fail")
})

check("a run answers what it printed, the summary in it, and the verdict that follows", () => {
  const root = repo({ "one.test.ts": PASSES })
  const done = ranOver(root, ["akasha"], 1)
  expect(done.code).toBe(0)
  expect(done.output).toContain("1 pass")
  expect(done.summary.passed).toBe(1)
  expect(done.verdict).toBe("pass")
})

check("a run holding a failing test answers a failing verdict", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const done = ranOver(root, ["akasha"], 2)
  expect(done.summary.failed).toBe(1)
  expect(done.verdict).toBe("fail")
})

check("one named path runs alone, and its neighbour does not", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const done = ranOver(root, ["akasha/one.test.ts"], 1)
  expect(done.verdict).toBe("pass")
})

check("what a run spawns is marked as standing inside one", () => {
  const root = repo({ "one.test.ts": MARKED })
  expect(ranOver(root, ["akasha"], 1).verdict).toBe("pass")
})

check("the mark a run carries is read back by whoever stands inside it", () => {
  expect(RUNNING).toBe("AKASHA_TESTS_RUNNING")
  const was = process.env[RUNNING]
  process.env[RUNNING] = "1"
  expect(alreadyRunning()).toBe(true)
  delete process.env[RUNNING]
  expect(alreadyRunning()).toBe(false)
  if (was === undefined) delete process.env[RUNNING]
  else process.env[RUNNING] = was
})
