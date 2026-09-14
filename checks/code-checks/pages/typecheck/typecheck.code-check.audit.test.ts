import { afterAll, expect, test } from "bun:test"
import { typecheck } from "akasha/checks/code-checks/pages/typecheck/typecheck.code-check.audit.code.ts"
import {
  breaking,
  numbered,
} from "akasha/checks/code-checks/pages/typecheck/typecheck.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratch } from "akasha/checks/test-fixtures/staging/check-staging.test-fixture.code.ts"

afterAll(scratch.sweep)

test("a repository whose TypeScript does not compile is refused", async () => {
  const said = await typecheck(tracked(breaking()))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain("TS2322")
})

test("a repository whose TypeScript compiles is refused nothing", async () => {
  expect(await typecheck(tracked(numbered()))).toEqual([])
})
