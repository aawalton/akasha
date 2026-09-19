import { afterAll, expect, test } from "bun:test"
import { omittingIn } from "akasha/check/code/pages/typecheck/modules/page-narrowing/page-narrowing.module.code.ts"
import {
  EARLY,
  generating,
  judged,
  THING_AT,
  WHOLE,
  WITHOUT,
  WRONG,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.test-fixtures.ts"
import {
  change,
  scratch,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"

afterAll(scratch.sweep)

test("a satisfies clause is narrowed on its own line, the body keeping every line and import", () => {
  const said = omittingIn(THING_AT, WITHOUT, ["held", "other"]) ?? ""
  expect(said).toContain('satisfies Omit<Thing, "held" | "other">')
  expect(said.split("\n").length).toBe(WITHOUT.split("\n").length)
  expect(said.match(/^import/gm)).toEqual(WITHOUT.match(/^import/gm))
})

test("keys naming nothing, and a body with no satisfies clause, narrow nothing at all", () => {
  expect(omittingIn(THING_AT, WITHOUT, [])).toBe(null)
  expect(omittingIn("akasha/one.ts", "export const one = 1\n", ["held"])).toBe(null)
})

test("a page being created compiles without the property a generator fills after the checks", async () => {
  expect(await judged(change(generating({}), { [THING_AT]: WITHOUT }))).toEqual([])
})

test("a page being created is refused for the property a generator fills before the checks, the value standing in the body by then", async () => {
  const said = await judged(change(generating({}, EARLY), { [THING_AT]: WITHOUT }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(THING_AT)
  expect(said[0]?.reason).toContain("held")
})

test("a page already standing is refused for dropping the property a generator fills", async () => {
  const said = await judged(change(generating({ [THING_AT]: WHOLE }), { [THING_AT]: WITHOUT }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(THING_AT)
  expect(said[0]?.reason).toContain("held")
})

test("a page being created is still refused for what the narrowing does not cover", async () => {
  const said = await judged(change(generating({}), { [THING_AT]: WRONG }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(THING_AT)
  expect(said[0]?.reason).toContain("TS2322")
  expect(said[0]?.reason).toContain("not assignable")
})
