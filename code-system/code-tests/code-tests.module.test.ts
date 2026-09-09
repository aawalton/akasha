import { afterAll, test as check, expect } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  alreadyRunning,
  BATCH,
  batchedOf,
  groupedBy,
  judgedAs,
  plain,
  preloadsIn,
  RUNNING,
  ranOver,
  slowIn,
  spentOver,
  summaryIn,
  testsBesideOf,
  testsUnder,
  verdictOf,
} from "./code-tests.module.code.ts"
import { BURNS, FAILS, MARKED, NEEDS, PASSES, SETS } from "./code-tests.module.test-fixtures.ts"

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

check("a test written with JSX is counted as readily as one written without", () => {
  const root = repo({ "one.test.tsx": PASSES, "deep/two.test.ts": PASSES })
  expect(testsUnder(join(root, "akasha"))).toBe(2)
  expect(testsUnder(join(root, "akasha/one.test.tsx"))).toBe(1)
})

check("a test the installed modules folder or the git folder holds is not counted", () => {
  const root = repo({
    "node_modules/one.test.ts": PASSES,
    ".git/two.test.ts": PASSES,
    "three.test.ts": PASSES,
  })
  expect(testsUnder(join(root, "akasha"))).toBe(1)
})

check(
  "a code file, its page and its fixtures all answer the tests that could sit beside them",
  () => {
    const both = ["akasha/one/held.module.test.ts", "akasha/one/held.module.test.tsx"]
    expect(testsBesideOf("akasha/one/held.module.code.ts")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.ts")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.code.tsx")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.test-fixtures.ts")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.test-fixtures.tsx")).toEqual(both)
  }
)

check("a test answers itself alone, whichever of the two it is written in", () => {
  expect(testsBesideOf("akasha/one/held.module.test.ts")).toEqual([
    "akasha/one/held.module.test.ts",
  ])
  expect(testsBesideOf("akasha/one/held.module.test.tsx")).toEqual([
    "akasha/one/held.module.test.tsx",
  ])
})

check("a file that is no TypeScript file sits beside no test", () => {
  expect(testsBesideOf("akasha/one/notes.md")).toEqual([])
  expect(testsBesideOf("akasha/one/held")).toEqual([])
})

check("color is taken out before the summary is read", () => {
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

check("a name matching no test is read as no tests rather than as a crash", () => {
  const said = 'error: regex "^held$" matched 0 tests. Searched 2 files'
  expect(summaryIn(said)).toEqual({ files: 0, failed: 0, passed: 0 })
  expect(verdictOf(1, said, 0)).toBe("pass")
})

check("a run reaching fewer files than are under it is short, not a pass", () => {
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

check("a run handed bodies reads them over the checkout, which is left as it was", () => {
  const root = repo({ "one.test.ts": FAILS })
  const bodies = { "akasha/one.test.ts": PASSES }
  expect(ranOver(root, ["akasha"], 1, null, bodies).verdict).toBe("pass")
  expect(readFileSync(join(root, "akasha/one.test.ts"), "utf8")).toBe(FAILS)
})

check("what a run spawns is marked as inside one", () => {
  const root = repo({ "one.test.ts": MARKED })
  expect(ranOver(root, ["akasha"], 1).verdict).toBe("pass")
})

check("the mark a run carries is read back by whoever is inside it", () => {
  expect(RUNNING).toBe("AKASHA_TESTS_RUNNING")
  const was = process.env[RUNNING]
  process.env[RUNNING] = "1"
  expect(alreadyRunning()).toBe(true)
  delete process.env[RUNNING]
  expect(alreadyRunning()).toBe(false)
  if (was === undefined) delete process.env[RUNNING]
  else process.env[RUNNING] = was
})

check("a test is run with what the nearest bunfig.toml above it preloads", () => {
  const root = repo({ "web/one.test.ts": NEEDS, "web/sets.ts": SETS, "plain.test.ts": PASSES })
  writeFileSync(join(root, "akasha/web/bunfig.toml"), '[test]\npreload = ["./sets.ts"]\n')
  expect(groupedBy(root, ["akasha"])).toEqual([
    { preloads: [], named: ["akasha/plain.test.ts"] },
    { preloads: [join(root, "akasha/web/sets.ts")], named: ["akasha/web/one.test.ts"] },
  ])
  expect(ranOver(root, ["akasha"], 2).verdict).toBe("pass")
})

check("the bunfig.toml at the root is left to the runner rather than handed over", () => {
  const root = repo({ "one.test.ts": NEEDS, "sets.ts": SETS })
  writeFileSync(join(root, "bunfig.toml"), '[test]\npreload = ["./akasha/sets.ts"]\n')
  expect(groupedBy(root, ["akasha"])).toEqual([{ preloads: [], named: ["akasha/one.test.ts"] }])
  expect(ranOver(root, ["akasha"], 1).verdict).toBe("pass")
})

check("a list past one batch is parted into batches, and nothing is lost", () => {
  expect(batchedOf([])).toEqual([[]])
  const named = Array.from({ length: BATCH * 2 + 1 }, (_, at) => `${at}.test.ts`)
  const batches = batchedOf(named)
  expect(batches.length).toBe(3)
  expect(batches[0]?.length).toBe(BATCH)
  expect(batches[2]?.length).toBe(1)
  expect(batches.flat()).toEqual(named)
})

check("a group past one batch is run as several, and the counts are the sum", () => {
  const held: Record<string, string> = {}
  const many = BATCH + 5
  for (let at = 0; at < many; at += 1) held[`one-${at}.test.ts`] = PASSES
  const done = ranOver(repo(held), ["akasha"], many)
  expect(plain(done.output).match(/Ran \d+ tests across \d+ files/g)?.length).toBe(2)
  expect(done.summary.files).toBe(many)
  expect(done.summary.passed).toBe(many)
  expect(done.verdict).toBe("pass")
})

check(
  "a file past the ceiling is ended there and answered by name",
  () => {
    const root = repo({ "one.test.ts": PASSES, "slow.test.ts": BURNS })
    const found = slowIn(root, groupedBy(root, ["akasha"]), [], 1)
    expect(found.map((one) => one.path)).toEqual(["akasha/slow.test.ts"])
    expect(found[0]?.cpuSeconds).toBeLessThan(4)
  },
  30000
)

check("a run is slow only where a file went past the seconds one file may spend", () => {
  expect(judgedAs("pass", 1)).toBe("slow")
  expect(judgedAs("fail", 2)).toBe("slow")
  expect(judgedAs("pass", 0)).toBe("pass")
  expect(judgedAs("crash", 0)).toBe("crash")
})

check("a file under the ceiling is not answered as over it", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(slowIn(root, groupedBy(root, ["akasha"]), [])).toEqual([])
})

check("a file under the ceiling is still answered with what that file spent", () => {
  const root = repo({ "one.test.ts": PASSES })
  const found = spentOver(root, ["akasha"])
  expect(found.map((one) => one.path)).toEqual(["akasha/one.test.ts"])
  expect(found[0]?.signal).toBeNull()
  expect(found[0]?.cpuSeconds).toBeGreaterThan(0)
})

check("a run whose files are each under the ceiling is clean and carries what it spent", () => {
  const root = repo({ "one.test.ts": PASSES })
  const done = ranOver(root, ["akasha"], 1)
  expect(done.slow).toEqual([])
  expect(done.cpuSeconds).toBeGreaterThan(0)
})

check("a path named twice over is run once", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(groupedBy(root, ["akasha", "akasha/one.test.ts"])).toEqual([
    { preloads: [], named: ["akasha/one.test.ts"] },
  ])
})

check("what a bunfig.toml preloads is read out of it, a path against its own folder", () => {
  const at = join(repo({}), "akasha/bunfig.toml")
  writeFileSync(at, '[test]\npreload = ["./held.ts", "@named/held"]\n')
  expect(preloadsIn(at)).toEqual([join(dirname(at), "held.ts"), "@named/held"])
  writeFileSync(at, '[install]\nlinker = "hoisted"\n')
  expect(preloadsIn(at)).toEqual([])
})
