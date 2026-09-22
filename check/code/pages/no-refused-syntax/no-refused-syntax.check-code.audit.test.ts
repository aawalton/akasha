import { afterAll, expect, test } from "bun:test"
import { noRefusedSyntax } from "akasha/check/code/pages/no-refused-syntax/no-refused-syntax.check-code.audit.code.ts"
import {
  JUDGED_AT,
  scratch,
  TEXT,
  tracked,
} from "akasha/check/code/pages/no-refused-syntax/no-refused-syntax.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree no rule refuses is let through", () => {
  expect(noRefusedSyntax(tracked())).toEqual([])
})

test("a text no change names is refused, because an audit reads the whole tree", () => {
  const said = noRefusedSyntax(tracked({ [JUDGED_AT]: TEXT }))
  expect(said.map((one) => one.path)).toEqual([JUDGED_AT])
  expect(said[0]?.reason).toContain("`probe`")
})
