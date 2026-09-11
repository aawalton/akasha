import { afterAll, expect, test } from "bun:test"
import { testsPass } from "akasha/checks/code-checks/pages/tests-pass/tests-pass.code-check.audit.code.ts"
import {
  CODE_AT,
  FAILS,
  PASSES,
  repo,
  scratch,
  TEST_AT,
  withoutGuard,
} from "akasha/checks/code-checks/pages/tests-pass/tests-pass.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

test("a repository holding a failing test is refused, and the reason says how many", () => {
  const root = tracked(repo({ [CODE_AT]: "", [TEST_AT]: FAILS }))
  const said = withoutGuard(() => testsPass(root))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(TEST_AT)
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})

test("a repository whose tests are green is refused by nothing", () => {
  const root = tracked(repo({ [CODE_AT]: "", [TEST_AT]: PASSES }))
  expect(withoutGuard(() => testsPass(root))).toEqual([])
})
