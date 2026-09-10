import { afterAll, expect, test } from "bun:test"
import { noRuleInTwoFiles } from "./no-rule-in-two-files.code-check.audit.code.ts"
import {
  CAMEL,
  EXPORTED_AS,
  ONE_CODE,
  scratch,
  TWO_CODE,
  tracked,
} from "./no-rule-in-two-files.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree spelling a rule in one file alone is let through", () => {
  expect(noRuleInTwoFiles(tracked({ [ONE_CODE]: CAMEL }))).toEqual([])
})

test("one rule in two files no change names is refused, an audit reading the whole tree", () => {
  const root = tracked({ [ONE_CODE]: CAMEL, [TWO_CODE]: EXPORTED_AS })
  const said = noRuleInTwoFiles(root)
  expect(said.map((one) => one.path).sort()).toEqual([ONE_CODE, TWO_CODE])
  expect(said[0]?.reason).toContain("one rule belongs in one file")
})
