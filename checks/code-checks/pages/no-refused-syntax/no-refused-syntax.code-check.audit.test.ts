import { afterAll, expect, test } from "bun:test"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { noRefusedSyntax } from "./no-refused-syntax.code-check.audit.code.ts"
import {
  JUDGED_AT,
  scratch,
  TEXT,
  tracked,
} from "./no-refused-syntax.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree no rule refuses is let through", () => {
  expect(noRefusedSyntax(tracked())).toEqual([])
})

test("a text no change names is refused, because an audit reads the whole tree", () => {
  const root = tracked()
  writing(root, JUDGED_AT, TEXT)
  const said = noRefusedSyntax(root)
  expect(said.map((one) => one.path)).toEqual([JUDGED_AT])
  expect(said[0]?.reason).toContain("`probe`")
})
