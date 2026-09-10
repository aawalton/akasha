import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import { noRuleInTwoFiles } from "./no-rule-in-two-files.code-check.check.code.ts"
import {
  bothArriving,
  ONE_CODE,
  rooted,
  scratch,
  TWO_CODE,
} from "./no-rule-in-two-files.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("two files arriving in one change, both spelling one rule, are both refused", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noRuleInTwoFiles(change, cast.shadow)
  expect(said.map((one) => one.path).sort()).toEqual([ONE_CODE, TWO_CODE])
  expect(said[0]?.reason).toContain("one rule belongs in one file")
})
