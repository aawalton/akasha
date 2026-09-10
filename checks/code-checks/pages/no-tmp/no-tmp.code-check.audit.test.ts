import { afterAll, expect, test } from "bun:test"
import { noTmp } from "./no-tmp.code-check.audit.code.ts"
import { CODE_AT, SPELLING, scratch, tracked } from "./no-tmp.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree reaching for no scratch we refuse is let through", () => {
  expect(noTmp(tracked({ [CODE_AT]: "export const one = 1\n" }))).toEqual([])
})

test("a reach no change names is refused, because an audit reads the whole tree", () => {
  const said = noTmp(tracked({ [CODE_AT]: SPELLING }))
  expect(said.map((one) => one.path)).toEqual([CODE_AT])
  expect(said[0]?.reason).toContain("where no scratch of ours sits")
})
