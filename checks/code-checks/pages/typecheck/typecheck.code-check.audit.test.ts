import { afterAll, expect, test } from "bun:test"
import { typecheck } from "akasha/checks/code-checks/pages/typecheck/typecheck.code-check.audit.code.ts"
import {
  breaking,
  numbered,
} from "akasha/checks/code-checks/pages/typecheck/typecheck.code-check.decision.test-fixtures.ts"
import { scratch } from "akasha/checks/modules/check-staging/check-staging.module.code.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

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
