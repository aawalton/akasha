import { afterAll, expect, test } from "bun:test"
import { noRefusedSyntax } from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.audit.code.ts"
import {
  JUDGED_AT,
  scratch,
  TEXT,
  tracked,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

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
