import { afterAll, expect, test } from "bun:test"
import { typecheck } from "./typecheck.code-check.audit.code.ts"
import {
  breaking,
  numbered,
  scratch,
  tracked,
} from "./typecheck.code-check.decision.test-fixtures.ts"

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
