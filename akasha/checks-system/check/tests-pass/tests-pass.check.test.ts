import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Ran } from "../../../code-system/code-tests.module.code.ts"
import { RUNNING } from "../../../code-system/code-tests.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import type { Leaving } from "../../judging.module.code.ts"
import { namedIn, reasonOf, tailOf, testsPass } from "./tests-pass.check.code.ts"

const PASSES = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

const FAILS = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("tests-pass-"))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

function leaving(root: string, changed: readonly string[]): Leaving {
  const at = (): null => null
  return { root, changed, at, was: at }
}

function withoutGuard<T>(run: () => T): T {
  const held = process.env[RUNNING]
  delete process.env[RUNNING]
  try {
    return run()
  } finally {
    if (held !== undefined) process.env[RUNNING] = held
  }
}

function ranAs(verdict: Ran["verdict"], summary: Ran["summary"], output = ""): Ran {
  return { code: 1, output, summary, verdict }
}

test("the tests named are the ones standing beside the files the change carries", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
    "akasha/two.module.test.ts": PASSES,
  })
  const said = namedIn(leaving(root, ["akasha/one.module.code.ts", "akasha/two.module.ts"]))
  expect(said).toEqual(["akasha/one.module.test.ts", "akasha/two.module.test.ts"])
})

test("a page, its code and its test all name the one test beside them", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  const changed = ["akasha/one.module.ts", "akasha/one.module.code.ts", "akasha/one.module.test.ts"]
  expect(namedIn(leaving(root, changed))).toEqual(["akasha/one.module.test.ts"])
})

test("a file whose test does not stand beside it names no test", () => {
  const root = repo({ "akasha/one.module.code.ts": "" })
  expect(namedIn(leaving(root, ["akasha/one.module.code.ts"]))).toEqual([])
})

test("a file that is not typescript names no test", () => {
  const root = repo({ "akasha/one.module.test.ts": PASSES })
  expect(namedIn(leaving(root, ["akasha/held.md", "akasha/held.json"]))).toEqual([])
})

test("a change carrying no file with a test beside it is judged by no run", () => {
  const root = repo({ "akasha/held.md": "held" })
  expect(withoutGuard(() => testsPass(leaving(root, ["akasha/held.md"])))).toEqual([])
})

test("a change whose tests pass is not refused", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const said = withoutGuard(() => testsPass(leaving(root, ["akasha/one.module.code.ts"])))
  expect(said).toEqual([])
})

test("a change whose tests fail is refused, and the reason says how many", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = withoutGuard(() => testsPass(leaving(root, ["akasha/one.module.code.ts"])))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})

test("a run already inside a run judges nothing and lets the outer one answer", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const held = process.env[RUNNING]
  process.env[RUNNING] = "1"
  try {
    expect(testsPass(leaving(root, ["akasha/one.module.code.ts"]))).toEqual([])
  } finally {
    if (held === undefined) delete process.env[RUNNING]
    else process.env[RUNNING] = held
  }
})

test("a run reaching fewer files than it named is refused as saying nothing about the rest", () => {
  const said = reasonOf(ranAs("short", { files: 1, failed: 0, passed: 3 }), ["one", "two"])
  expect(said).toContain("1 of the 2 test files named ran")
  expect(said).toContain("say nothing about the rest")
})

test("a run printing no summary is refused as the runner failing, not a test", () => {
  const said = reasonOf(ranAs("crash", { files: null, failed: null, passed: null }), ["one"])
  expect(said).toContain("nothing says the tests ran at all")
  expect(said).toContain("the runner failing, not a test")
})

test("one test file is counted in the singular", () => {
  const said = reasonOf(ranAs("fail", { files: 1, failed: 1, passed: 2 }), ["one"])
  expect(said).toContain("over 1 test file standing beside")
  expect(said).toContain("1 of 3 tests failed")
})

test("the end of the run is what is kept, with its colour taken out", () => {
  const painted = `${String.fromCharCode(27)}[31mheld${String.fromCharCode(27)}[0m`
  expect(tailOf(painted)).toBe("held")
  const many = Array.from({ length: 200 }, (_, at) => `line ${at}`).join("\n")
  const said = tailOf(many)
  expect(said).toContain("line 199")
  expect(said).not.toContain("line 0\n")
})
