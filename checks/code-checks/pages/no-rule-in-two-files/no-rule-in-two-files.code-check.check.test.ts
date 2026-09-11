import { afterAll, expect, test } from "bun:test"
import { noRuleInTwoFiles } from "akasha/checks/code-checks/pages/no-rule-in-two-files/no-rule-in-two-files.code-check.check.code.ts"
import {
  bothArriving,
  bothLeaving,
  CAMEL,
  EXPORTED_AS,
  ONE_CODE,
  ONE_PAGE,
  pageText,
  rooted,
  scratch,
  TWO_CODE,
  TWO_PAGE,
  tracked,
} from "akasha/checks/code-checks/pages/no-rule-in-two-files/no-rule-in-two-files.code-check.decision.test-fixtures.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("two files arriving in one change, both spelling one rule, are both refused", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noRuleInTwoFiles(change, cast.shadow)
  expect(said.map((one) => one.path).sort()).toEqual([ONE_CODE, TWO_CODE])
  expect(said[0]?.reason).toContain("one rule belongs in one file")
})

test("one change taking a rule out of both files and into a new home refuses nothing", () => {
  const root = tracked({
    [ONE_PAGE]: pageText("one", "1"),
    [ONE_CODE]: CAMEL,
    [TWO_PAGE]: pageText("two", "2"),
    [TWO_CODE]: EXPORTED_AS,
  })
  const change = bothLeaving(root)
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(noRuleInTwoFiles(change, cast.shadow)).toEqual([])
})
