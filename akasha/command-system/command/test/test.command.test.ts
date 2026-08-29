import { afterAll, test as check, expect } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Given } from "../../calling/calling.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { ANSWER_CEILING, aiming, bounded, test } from "./test.command.code.ts"

const PASSES = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

const FAILS = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

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

check("a path outside the akasha folder is refused, and nothing is run", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = aiming(["tools/one.test.ts"], given(root))
  expect(said.named).toEqual([])
  expect(said.refusals[0]).toContain("stands outside `akasha/`")
})

check("every spelling of a path outside the folder is refused the same", () => {
  const root = repo({ "one.test.ts": PASSES })
  for (const one of ["../elsewhere", "/etc", join(root, "tools"), "akasha/../tools"]) {
    expect(aiming([one], given(root)).refusals.length).toBe(1)
  }
})

check("a run named nothing runs the whole akasha folder", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(aiming([], given(root)).named).toEqual(["akasha"])
})

check("a path that is not there is refused rather than run", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(aiming(["akasha/nowhere.test.ts"], given(root)).refusals[0]).toContain(
    "nothing that is there"
  )
})

check("a path named twice is refused rather than run twice", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = aiming(["akasha/one.test.ts", "akasha/one.test.ts"], given(root))
  expect(said.refusals[0]).toContain("named more than once")
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

check("a folder holding no test is refused rather than reported as a pass", () => {
  const root = repo({ "held.ts": "export const held = 1\n" })
  const said = test([], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("no file under `akasha` is a test")
})

check("an output past what one answer holds keeps its end, where the summary stands", () => {
  const output = `${"held\n".repeat(ANSWER_CEILING)}Ran 1 tests across 1 files.`
  const said = bounded(output).join("\n")
  expect(said).toContain("Ran 1 tests across 1 files.")
  expect(said).toContain("bytes of this run are not here")
  expect(new TextEncoder().encode(said).length).toBeLessThan(ANSWER_CEILING + 200)
})

check("a passing suite answers 0 and reports what ran", () => {
  const root = repo({ "one.test.ts": PASSES })
  const said = test([], given(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("1 pass")
})

check("a failing suite answers 1 and says how many failed", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const said = test([], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("1 of 2 tests failed")
})

check("one named file runs alone, and its neighbour does not", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const said = test(["--file-path", "akasha/one.test.ts"], given(root))
  expect(said.code).toBe(0)
})
