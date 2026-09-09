import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Ran } from "@akasha/code/code-tests"
import { RUNNING } from "@akasha/code/code-tests"
import { scratchWorld } from "@akasha/command-system/scratching"
import { noPathsFiled, pathFiled, repoAt } from "@akasha/indexes/testing"
import { shadowAsked, shadowAt } from "@akasha/pages/shadow"
import { bytesOf } from "@akasha/testing-system/bodying"
import { typingUnder } from "@akasha/testing-system/declaring"
import {
  change,
  gone,
  landing,
  proposing,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  linksIn,
  namedIn,
  reasonOf,
  saidOf,
  spentlyOf,
  testsPass,
} from "./tests-pass.code-check.code.ts"

const PASSES = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

const FAILS = 'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

const HOLDS = "export const held = 1\n"

const BREAKS = "export const held = 2\n"

const READS =
  'import { expect, test } from "bun:test"\n' +
  'import { held } from "./one.module.code.ts"\n' +
  'test("one", () => { expect(held).toBe(1) })\n'

const HELD_ID = "01a05fd0-1c4a-7000-8f3b-6a1d4e2c9b70"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("tests-pass-"))
  noPathsFiled(root)
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
    pathFiled(root, name, [{ path: name, id: HELD_ID }])
  }
  return root
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
    ["akasha/one.module.test.ts"]
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
    ["akasha/one.module.test.ts"]
  )
  expect(said).toContain("akasha/one.module.test.ts spent 5.8 processor seconds")
  expect(said).toContain("a test file is given 5 processor seconds")
})

test("a run ended at the ceiling is not refused as the runner failing", () => {
  const said = reasonOf(ranAs("slow", { files: null, failed: null, passed: null }, "", [], 5.24), [
    "akasha/one.module.test.ts",
  ])
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
  expect(withoutGuard(() => testsPass(change(root, ["akasha/held.md"]), shadowAt(root)))).toEqual(
    []
  )
})

test("a file the index files a test beside is input to the check", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const shadow = shadowAt(root)
  const taken = ["akasha/one.module.ts", "akasha/one.module.code.ts", "akasha/one.module.test.ts"]
  expect(taken.map((path) => testsPass.isInput(path, shadow))).toEqual([true, true, true])
})

test("a file the index files no test beside is no input to the check", () => {
  const root = repo({ "akasha/one.module.code.ts": "", "akasha/held.md": "held" })
  const shadow = shadowAt(root)
  const asleep = ["akasha/one.module.code.ts", "akasha/one.module.ts", "akasha/held.md"]
  expect(asleep.map((path) => testsPass.isInput(path, shadow))).toEqual([false, false, false])
})

test("a test is input to the check by standing beside itself", () => {
  const root = repo({})
  expect(testsPass.isInput("akasha/new.module.test.ts", shadowAt(root))).toBe(true)
})

test("a change whose tests pass is not refused", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const said = withoutGuard(() =>
    testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said).toEqual([])
})

test("a change whose tests fail is refused, and the reason says how many", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = withoutGuard(() =>
    testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})

test("a change is judged by the body it proposes, not the one standing on disk", () => {
  const root = repo({
    "akasha/one.module.code.ts": HOLDS,
    "akasha/one.module.test.ts": READS,
  })
  const at = proposing(root, "akasha/one.module.code.ts", BREAKS)
  const said = withoutGuard(() =>
    testsPass(change(root, ["akasha/one.module.code.ts"], at), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
  expect(readFileSync(join(root, "akasha/one.module.code.ts"), "utf8")).toBe(HOLDS)
  expect(
    withoutGuard(() => testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root)))
  ).toEqual([])
})

test("a run already inside a run judges nothing and lets the outer one answer", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const held = process.env[RUNNING]
  process.env[RUNNING] = "1"
  try {
    expect(testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))).toEqual([])
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

const INDEXES = Bun.resolveSync("@akasha/indexes", import.meta.dir)

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

  const said = withoutGuard(() => testsPass(moved, shadowAsked(moved)))

  expect(said).toEqual([])
})

test("the reason names a file where it stands in the change, not in the world it ran in", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = withoutGuard(() =>
    testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said[0]?.reason).not.toContain("/var/tmp/akasha-world-")
  expect(said[0]?.reason).toContain("akasha/one.module.test.ts")
})
