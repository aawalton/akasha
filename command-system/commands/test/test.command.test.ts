import { afterAll, test as check, expect } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Given } from "../../calling/calling.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { ANSWER_CEILING, aiming, bounded, detailOf, tailOf, test } from "./test.command.code.ts"

const PASSES = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

const FAILS = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

const TWICE =
  'import { expect, test } from "bun:test"\n' +
  'test("first", () => { expect(1).toBe(2) })\n' +
  'test("second", () => { expect(3).toBe(4) })\n'

const LOADS = 'import { nope } from "./nowhere.ts"\nconsole.log(nope)\n'

const PAIR =
  'import { expect, test } from "bun:test"\n' +
  'test("held (one)", () => { expect(1).toBe(1) })\n' +
  'test("held (one) and more", () => { expect(1).toBe(2) })\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("akasha-test-"))
  mkdirSync(join(root, "akasha"), { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, "akasha", name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

function given(root: string): Given {
  return { root, calledAs: "akasha test", from: root, writer: null, agentId: null }
}

check("a path outside the repository is refused, and nothing is run", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = aiming(["../one.test.ts"], given(root))
  expect(said.named).toEqual([])
  expect(said.refusals[0]).toContain("outside the repository")
})

check("every spelling of a path outside the folder is refused the same", () => {
  const root = repo({ "one.test.ts": PASSES })
  for (const one of ["../elsewhere", "/etc", join(root, "tools"), "akasha/../tools"]) {
    expect(aiming([one], given(root)).refusals.length).toBe(1)
  }
})

check("a call naming no file is refused, and the refusal says how to name one", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test([], given(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--file-path names the test file to run")
})

check("a call naming no file points at the checks for every test", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(test([], given(root)).refusals.join("\n")).toContain(
    "the checks run every test in this repository"
  )
})

check("a call naming a test but no file is refused", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test(["--named", "one"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--file-path names the test file to run")
})

check("a call naming a second file is refused, and nothing is run", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": PASSES })
  const said = test(
    ["--file-path", "akasha/one.test.ts", "--file-path", "akasha/two.test.ts"],
    given(root)
  )
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--file-path is given more than once")
  expect(said.refusals.join("\n")).toContain("the checks run every test in this repository")
})

check("naming one file twice over is refused as naming two is", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test(
    ["--file-path", "akasha/one.test.ts", "--file-path", "akasha/one.test.ts"],
    given(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--file-path is given more than once")
})

check("a folder is refused rather than run, and the refusal points at the checks", () => {
  const root = repo({ "held/one.test.ts": PASSES })
  const said = test(["--file-path", "akasha/held"], given(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("is a folder")
  expect(said.refusals.join("\n")).toContain("the checks run every test in this repository")
})

check("the repository root is refused as any other folder is", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(test(["--file-path", "."], given(root)).refusals[0]).toContain("is a folder")
})

check("a file that is no test file is refused, and the test beside it is named", () => {
  const root = repo({
    "held.module.code.ts": "export const held = 1\n",
    "held.module.test.ts": PASSES,
  })
  const said = test(["--file-path", "akasha/held.module.code.ts"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is no test file")
  expect(said.refusals[0]).toContain("akasha/held.module.test.ts")
})

check("a file with no test beside it is refused and says so", () => {
  const root = repo({ "notes.md": "held\n" })
  const said = test(["--file-path", "akasha/notes.md"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("no test file is beside it")
})

check("a path that is not there is refused rather than run", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(aiming(["akasha/nowhere.test.ts"], given(root)).refusals[0]).toContain(
    "nothing that is there"
  )
})

check("an argument this does not take is refused by name", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test(["--watch"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--watch` is not an argument this takes")
})

check("a flag naming no path is refused", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(test(["--file-path"], given(root)).refusals[0]).toContain("nothing followed it")
})

check("an output past what one answer holds keeps its end, where the summary is", () => {
  const output = `${"held\n".repeat(ANSWER_CEILING)}Ran 1 tests across 1 files.`
  const said = bounded(output).join("\n")
  expect(said).toContain("Ran 1 tests across 1 files.")
  expect(said).toContain("bytes of this run are not here")
  expect(new TextEncoder().encode(said).length).toBeLessThan(ANSWER_CEILING + 200)
})

check("the advice an over-long answer carries is the caller's own", () => {
  const output = `${"held\n".repeat(ANSWER_CEILING)}Ran 1 tests across 1 files.`
  expect(bounded(output).join("\n")).toContain("Name fewer paths to see the rest.")
  expect(bounded(output, "Name one test to see the rest.").join("\n")).toContain(
    "Name one test to see the rest."
  )
})

check("a passing file answers 0 and says how many tests ran", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test(["--file-path", "akasha/one.test.ts"], given(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["1 test ran: 1 passed, 0 failed."])
})

check("a failing run says how many ran, which file failed, and how many failed in it", () => {
  const root = repo({ "two.test.ts": TWICE })
  const said = test(["--file-path", "akasha/two.test.ts"], given(root)).report
  expect(said[0]).toBe("2 tests ran: 0 passed, 2 failed.")
  expect(said[1]).toBe("1 test file failed:")
  expect(said[2]).toBe("  akasha/two.test.ts — 2 failed")
})

check("a file that will not load is named with the one line it gave", () => {
  const root = repo({ "gone.test.ts": LOADS })
  const said = test(["--file-path", "akasha/gone.test.ts"], given(root))
  expect(said.code).not.toBe(0)
  expect(said.report.join("\n")).toContain("1 file would not load:")
  expect(said.report.join("\n")).toContain(
    "akasha/gone.test.ts — Cannot find module './nowhere.ts'"
  )
})

check("a report points at one test rather than carrying a trace or a failure in full", () => {
  const root = repo({ "two.test.ts": FAILS })
  const said = test(["--file-path", "akasha/two.test.ts"], given(root)).report.join("\n")
  expect(said).toContain('--named "<the test\'s name>"')
  expect(said).not.toContain("at <anonymous>")
  expect(said).not.toContain("Expected: 2")
  expect(new TextEncoder().encode(said).length).toBeLessThan(500)
})

check("a failing file answers 1 and says how many failed", () => {
  const root = repo({ "two.test.ts": FAILS })
  const said = test(["--file-path", "akasha/two.test.ts"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("1 of 1 tests failed")
})

check("one named file runs alone, and its neighbour does not", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const said = test(["--file-path", "akasha/one.test.ts"], given(root))
  expect(said.code).toBe(0)
})

check("a run printing no summary carries what the runner printed rather than a pointer", () => {
  const root = repo({ "web/one.test.ts": PASSES })
  writeFileSync(join(root, "akasha/web/bunfig.toml"), '[test]\npreload = ["./nowhere.ts"]\n')
  const said = test(["--file-path", "akasha/web/one.test.ts"], given(root))
  expect(said.code).toBe(3)
  expect(said.report[0]).toBe("0 tests ran: 0 passed, 0 failed.")
  expect(said.report[1]).toContain("of what it printed")
  expect(said.report.join("\n")).toContain("preload not found")
  expect(said.report.join("\n")).not.toContain("--named")
})

check("the tail a crash carries is bounded in lines and in bytes alike", () => {
  const counted = Array.from({ length: 40 }, (one, at) => `line ${at}`).join("\n")
  expect(tailOf(counted).length).toBe(21)
  expect(tailOf(counted)[0]).toContain("its last 20 lines")
  expect(tailOf(counted)[1]).toBe("  line 20")
  const wide = Array.from({ length: 40 }, () => "x".repeat(300)).join("\n")
  expect(tailOf(wide).length).toBe(7)
  expect(tailOf("held\nthere\n")[0]).toContain("all 2 lines of what it printed")
})

check("a run naming a test runs that one, and no test whose name it opens", () => {
  const root = repo({ "one.test.ts": PAIR })
  const said = test(["--file-path", "akasha/one.test.ts", "--named", "held (one)"], given(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["1 test ran: 1 passed, 0 failed."])
})

check("a name no test is called runs nothing rather than refusing", () => {
  const root = repo({ "one.test.ts": PAIR })
  const said = test(
    ["--file-path", "akasha/one.test.ts", "--named", "no test is called this"],
    given(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["0 tests ran: 0 passed, 0 failed."])
})

check("a name flag naming nothing, and a second one, are each refused", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(test(["--named"], given(root)).refusals[0]).toContain("nothing followed it")
  const twice = test(["--named", "a", "--named", "b"], given(root))
  expect(twice.refusals[0]).toContain("given more than once")
})

check("a run naming one test carries why that test failed rather than a pointer", () => {
  const root = repo({ "one.test.ts": FAILS })
  const said = test(["--file-path", "akasha/one.test.ts", "--named", "one"], given(root))
  expect(said.code).toBe(1)
  const report = said.report.join("\n")
  expect(report).toContain("what the runner said:")
  expect(report).toContain("Expected: 2")
  expect(report).toContain("Received: 1")
  expect(report).not.toContain('--named "<the test\'s name>"')
})

check("a run naming one test that passes carries no detail", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test(["--file-path", "akasha/one.test.ts", "--named", "one"], given(root))
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["1 test ran: 1 passed, 0 failed."])
})

check("what a named run carries is bounded in lines and in bytes alike", () => {
  const counted = `(fail) one\n${Array.from({ length: 60 }, (one, at) => `line ${at}`).join("\n")}`
  expect(detailOf(counted).length).toBe(41)
  expect(detailOf(counted)[1]).toBe("  (fail) one")
  const wide = `(fail) one\n${Array.from({ length: 40 }, () => "x".repeat(300)).join("\n")}`
  expect(detailOf(wide).length).toBeLessThan(20)
  expect(detailOf("")[0]).toContain("printed nothing about the test that failed")
})

check("a named run carrying no failing line falls back to what was printed", () => {
  expect(detailOf("held\nthere\n")[1]).toBe("  held")
})

check("a path is read against the root rather than the folder the call was made in", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = aiming(["akasha/one.test.ts"], { ...given(root), from: join(root, "akasha") })
  expect(said.refusals).toEqual([])
  expect(said.named).toEqual(["akasha/one.test.ts"])
})
