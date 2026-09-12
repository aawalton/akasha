import { expect, test } from "bun:test"
import {
  commandOf,
  runOf,
} from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import {
  HELD_TREE,
  NOWHERE,
  RUNNER,
} from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.test-fixtures.ts"

const ROOT = process.cwd()

const BUN = "bun"

function runnerPath(): string {
  const run = runOf(ROOT, RUNNER)
  if ("refused" in run) throw new Error(run.refused)
  expect(run.runner).toBe(BUN)
  return run.path
}

test("the file run is the one code file a page's type requires, under the program holding it", () => {
  expect(runnerPath().endsWith(".module.code.ts")).toBe(true)
})

test("the words a start states are written after the file that start names", () => {
  expect(commandOf(ROOT, { code: RUNNER, arguments: ["a-service"] })).toEqual({
    command: `${BUN} ${runnerPath()} a-service`,
  })
})

test("a run is spelled under the tree named where a tree is named", () => {
  expect(commandOf(ROOT, { code: RUNNER }, HELD_TREE)).toEqual({
    command: `${BUN} ${HELD_TREE}/${runnerPath()}`,
  })
})

test("a name reaching no page refuses rather than composing a path", () => {
  expect("refused" in commandOf(ROOT, { code: NOWHERE })).toBe(true)
})
