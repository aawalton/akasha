import { afterAll, expect, test } from "bun:test"
import { testsPass } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.audit.code.ts"
import {
  CODE_AT,
  FAILS,
  PASSES,
  repo,
  scratch,
  TEST_AT,
  withoutGuard,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

test("a repository holding a failing test is refused, and the reason says how many", async () => {
  const root = tracked(repo({ [CODE_AT]: "", [TEST_AT]: FAILS }))
  const said = await withoutGuard(async () => await testsPass(root))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(TEST_AT)
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})

test("a repository whose tests are green is refused by nothing", async () => {
  const root = tracked(repo({ [CODE_AT]: "", [TEST_AT]: PASSES }))
  expect(await withoutGuard(async () => await testsPass(root))).toEqual([])
})
