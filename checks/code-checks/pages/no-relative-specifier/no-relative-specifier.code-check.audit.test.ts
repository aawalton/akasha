import { afterAll, expect, test } from "bun:test"
import { noRelativeSpecifier } from "akasha/checks/code-checks/pages/no-relative-specifier/no-relative-specifier.code-check.audit.code.ts"
import {
  AT,
  BESIDE,
  NAMED,
  NAMED_AT,
  ROOTED,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-relative-specifier/no-relative-specifier.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

test("an audit judges every body in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [AT]: BESIDE, [NAMED_AT]: NAMED })

  const said = noRelativeSpecifier(root)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`./ledger.module.code.ts`")
})

test("an audit lets through a tree where every specifier is spelled from the root", () => {
  const root = tracked(rooted(), { [AT]: ROOTED, [NAMED_AT]: NAMED })

  expect(noRelativeSpecifier(root)).toEqual([])
})
