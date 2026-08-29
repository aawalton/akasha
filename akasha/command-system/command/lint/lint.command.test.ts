import { afterAll, test as check, expect } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Found } from "../../../code-system/code-lint/code-lint.module.code.ts"
import type { Given } from "../../calling.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import { lint, many, reportOf, sayingOf } from "./lint.command.code.ts"

const UNUSED = "export function held(a: number, b: number): number {\n  return a\n}\n"

const CLEAN = "export function held(a: number): number {\n  return a\n}\n"

const LINTING =
  '{"formatter":{"enabled":false},"assist":{"enabled":false},"linter":{"rules":' +
  '{"recommended":true,"correctness":{"noUnusedFunctionParameters":"error"}}}}\n'

const CONFIG = "biome.json"

const MODULES = "node_modules"

const RULE = "lint/correctness/noUnusedVariables"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>, linter: boolean): string {
  const root = realpathSync(scratch.rootFor("akasha-lint-"))
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, CONFIG), LINTING)
  if (linter) symlinkSync(join(process.cwd(), MODULES), join(root, MODULES))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, "akasha", name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

function given(root: string): Given {
  return { root, calledAs: "akasha lint", from: root, writer: null, agentId: null }
}

function standing(path: string, line: number): Found {
  return { path, line, column: 1, rule: RULE, said: "This variable is unused." }
}

check("a path outside the akasha folder is refused, and nothing is read", () => {
  const root = repo({ "one.ts": UNUSED }, true)
  const said = lint(["--file-path", "tools/one.ts"], given(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("stands outside `akasha/`")
})

check("every spelling of a path outside the folder is refused the same", () => {
  const root = repo({ "one.ts": UNUSED }, true)
  for (const one of ["../elsewhere", "/etc", join(root, "tools"), "akasha/../tools"]) {
    expect(lint(["--file-path", one], given(root)).code).toBe(1)
  }
})

check("a path that is not there is refused rather than read", () => {
  const root = repo({ "one.ts": UNUSED }, true)
  const said = lint(["--file-path", "akasha/nowhere.ts"], given(root))
  expect(said.refusals[0]).toContain("nothing that is there")
})

check("an argument this does not take is refused by name", () => {
  const root = repo({ "one.ts": UNUSED }, true)
  const said = lint(["--write"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--write` is not an argument this takes")
})

check("a flag naming no path is refused", () => {
  const root = repo({ "one.ts": UNUSED }, true)
  expect(lint(["--file-path"], given(root)).refusals[0]).toContain("nothing followed it")
})

check("a tree the linter finds nothing in answers 0 and says so", () => {
  const root = repo({ "one.ts": CLEAN }, true)
  const said = lint([], given(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("found nothing under `akasha`")
})

check("a finding is reported where it stands, by the rule that named it, and counted", () => {
  const root = repo({ "one.ts": UNUSED }, true)
  const said = lint([], given(root))
  expect(said.code).toBe(1)
  expect(said.report[0]).toBe(
    "akasha/one.ts:1:33  lint/correctness/noUnusedFunctionParameters  This parameter is unused."
  )
  expect(said.report[said.report.length - 1]).toBe("1 finding in 1 file.")
})

check("one named file is read alone, and its neighbour is not", () => {
  const root = repo({ "one.ts": CLEAN, "two.ts": UNUSED }, true)
  expect(lint(["--file-path", "akasha/one.ts"], given(root)).code).toBe(0)
  expect(lint(["--file-path", "akasha/two.ts"], given(root)).code).toBe(1)
})

check("a run that could not be made answers 3 and says the tree was not judged", () => {
  const root = repo({ "one.ts": UNUSED }, false)
  const said = lint([], given(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("could not look has verified nothing")
})

check("findings are grouped by the file they stand in", () => {
  const said = reportOf([
    standing("akasha/one.ts", 1),
    standing("akasha/one.ts", 12),
    standing("akasha/two.ts", 3),
  ])
  expect(said[0]).toBe(`akasha/one.ts:1:1   ${RULE}  This variable is unused.`)
  expect(said[1]).toBe(`akasha/one.ts:12:1  ${RULE}  This variable is unused.`)
  expect(said[2]).toBe("")
  expect(said[3]).toBe(`akasha/two.ts:3:1  ${RULE}  This variable is unused.`)
})

check("what is counted is the findings and the files they stand in", () => {
  expect(many(1, "finding")).toBe("1 finding")
  expect(many(0, "file")).toBe("0 files")
  const said = sayingOf([standing("akasha/one.ts", 1), standing("akasha/two.ts", 3)])
  expect(said[said.length - 1]).toBe("2 findings in 2 files.")
})

check("a report past what one answer holds keeps its end, where the count stands", () => {
  const found = Array.from({ length: 4000 }, (_, at) => standing(`akasha/held-${at}.ts`, at))
  const said = sayingOf(found).join("\n")
  expect(said).toContain("4000 findings in 4000 files.")
  expect(said).toContain("bytes of this run are not here")
  expect(new TextEncoder().encode(said).length).toBeLessThan(28200)
})
