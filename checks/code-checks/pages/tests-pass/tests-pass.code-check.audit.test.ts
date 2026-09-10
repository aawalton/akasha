import { afterAll, expect, test } from "bun:test"
import { testsPass } from "./tests-pass.code-check.audit.code.ts"
import {
  CODE_AT,
  FAILS,
  PASSES,
  scratch,
  TEST_AT,
  tracked,
  withoutGuard,
} from "./tests-pass.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a repository holding a failing test is refused, and the reason says how many", () => {
  const root = tracked({ [CODE_AT]: "", [TEST_AT]: FAILS })
  const said = withoutGuard(() => testsPass(root))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(TEST_AT)
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})

test("a repository whose tests are green is refused by nothing", () => {
  const root = tracked({ [CODE_AT]: "", [TEST_AT]: PASSES })
  expect(withoutGuard(() => testsPass(root))).toEqual([])
})
