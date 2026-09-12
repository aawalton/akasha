import { afterAll, expect, test } from "bun:test"
import { noUnusedExports } from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.audit.code.ts"
import {
  AT,
  HELD_TEXT,
  importedBy,
  READER,
  readerText,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

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
