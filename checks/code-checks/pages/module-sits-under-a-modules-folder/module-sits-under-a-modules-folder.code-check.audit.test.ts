import { afterAll, expect, test } from "bun:test"
import { moduleSitsUnderAModulesFolder } from "akasha/checks/code-checks/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.code-check.audit.code.ts"
import {
  BODY,
  LOOSE_AT,
  NESTED_AT,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

test("an audit judges every module page in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [LOOSE_AT]: BODY, [NESTED_AT]: BODY })

  const said = moduleSitsUnderAModulesFolder(root)

  expect(said.map((one) => one.path)).toEqual([LOOSE_AT])
  expect(said[0]?.reason).toContain("`akasha/one/answering`")
})

test("an audit lets through a tree whose every module page sits under a `modules` folder", () => {
  const root = tracked(rooted(), { [NESTED_AT]: BODY })

  expect(moduleSitsUnderAModulesFolder(root)).toEqual([])
})
