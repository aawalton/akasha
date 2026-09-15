import { afterAll, expect, test } from "bun:test"
import { noUnusedExports } from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.audit.code.ts"
import {
  AT,
  HELD_TEXT,
  importedBy,
  landed,
  READER,
  readerText,
  rooted,
  scratch,
} from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.test-fixtures.ts"
import {
  tracked,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

const A_DAY = 86_400_000

const TWO_DAYS = 2 * A_DAY

test("an audit judges every file in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [AT]: HELD_TEXT })

  const said = noUnusedExports(root)

  expect(said.filter((one) => one.path === AT).map((one) => one.path)).toEqual([AT, AT])
})

test("an audit lets through a value another file in the tree names", () => {
  const root = rooted()
  importedBy(root, [READER])
  tracked(root, { [AT]: "export const held = 1\n", [READER]: readerText("held") })

  expect(noUnusedExports(root).filter((one) => one.path === AT)).toEqual([])
})

test("an audit passes over a file whose last commit is inside the last day", () => {
  const root = landed(rooted(), { [AT]: HELD_TEXT })

  expect(noUnusedExports(root, Date.now()).filter((one) => one.path === AT)).toEqual([])
})

test("an audit refuses a file whose last commit is before that day", () => {
  const root = landed(rooted(), { [AT]: HELD_TEXT })
  const said = noUnusedExports(root, Date.now() + TWO_DAYS)

  expect(said.filter((one) => one.path === AT).map((one) => one.path)).toEqual([AT, AT])
})

test("an audit passes over a file no commit holds at all", () => {
  const root = landed(rooted())
  wrote(root, { [AT]: HELD_TEXT })

  expect(noUnusedExports(root, Date.now() + TWO_DAYS).filter((one) => one.path === AT)).toEqual([])
})
