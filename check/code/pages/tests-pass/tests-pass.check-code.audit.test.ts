import { afterAll, expect, test } from "bun:test"
import { testsPass } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.audit.code.ts"
import { reasonOf } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import {
  AUTHORED_ONE_FAILED,
  AUTHORED_PASSED,
  CODE_AT,
  COUNTED_AT,
  FAILS,
  PASSES,
  ranOverEach,
  repo,
  scratch,
  TEST_AT,
  withoutGuard,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.test-fixtures.ts"
import { reasonSaid } from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

const MANY = 60

const CEILING = AUTHORED_ONE_FAILED.length + AUTHORED_PASSED.length

test("a refusal carries the failing file's own output rather than the head of the run", () => {
  const each = [
    ...Array.from({ length: MANY }, (_, at) => ({
      path: `held/clean-${String(at)}/one.module.test.ts`,
      out: AUTHORED_PASSED,
    })),
    { path: COUNTED_AT, out: AUTHORED_ONE_FAILED, code: 1 },
  ]
  const ran = ranOverEach("fail", { files: MANY + 1, failed: 1, passed: 607 }, each)
  const said = reasonOf(
    ran,
    each.map((one) => one.path),
    [COUNTED_AT]
  )
  expect(said).not.toContain("Ran 10 tests across 1 file")
  expect(ran.output.length).toBeGreaterThan(CEILING * 4)
  expect(reasonSaid(said, CEILING)).toContain('Expected: "1 fileish"')
})

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
