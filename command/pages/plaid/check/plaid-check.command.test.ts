import { expect, test } from "bun:test"
import { firstDay } from "akasha/command/argument/pages/first-day.argument.ts"
import { plaidItem } from "akasha/command/argument/pages/plaid-item.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  countSaid,
  lineFor,
  type MonarchRow,
  type PlaidRow,
  plaidCheck,
  unmatched,
} from "akasha/command/pages/plaid/check/plaid-check.command.code.ts"

const GIVEN: Given = {
  root: rootOf(process.cwd()),
  calledAs: "plaid check",
  from: ".",
  writer: null,
  agentId: null,
}

function plaidRow(id: string, date: string, amount: number): PlaidRow {
  return { id, date, amount, name: id }
}

function monarchRow(date: string, amount: number): MonarchRow {
  return { date, amount }
}

test("a Monarch row of the opposite amount within three days matches", () => {
  const plaid = [plaidRow("a", "2026-08-10", 21.48)]
  expect(unmatched(plaid, [monarchRow("2026-08-12", -21.48)])).toEqual([])
})

test("a Monarch row of the same sign does not match", () => {
  const plaid = [plaidRow("a", "2026-08-10", 21.48)]
  expect(unmatched(plaid, [monarchRow("2026-08-10", 21.48)])).toEqual(plaid)
})

test("a Monarch row four days away does not match", () => {
  const plaid = [plaidRow("a", "2026-08-10", 21.48)]
  expect(unmatched(plaid, [monarchRow("2026-08-14", -21.48)])).toEqual(plaid)
})

test("a Monarch row a cent off does not match", () => {
  const plaid = [plaidRow("a", "2026-08-10", 21.48)]
  expect(unmatched(plaid, [monarchRow("2026-08-10", -21.47)])).toEqual(plaid)
})

test("one Monarch row matches one Plaid row, and the nearer day takes it", () => {
  const disney = plaidRow("disney", "2026-08-08", 21.48)
  const netflix = plaidRow("netflix", "2026-08-10", 21.48)
  const missing = unmatched([netflix, disney], [monarchRow("2026-08-08", -21.48)])
  expect(missing).toEqual([netflix])
})

test("two equal rows on two days each find their own Monarch row", () => {
  const plaid = [plaidRow("a", "2026-08-08", 9.99), plaidRow("b", "2026-08-10", 9.99)]
  const monarch = [monarchRow("2026-08-10", -9.99), monarchRow("2026-08-08", -9.99)]
  expect(unmatched(plaid, monarch)).toEqual([])
})

test("a credit in Plaid matches a credit in Monarch", () => {
  expect(unmatched([plaidRow("a", "2026-08-07", -0.99)], [monarchRow("2026-08-07", 0.99)])).toEqual(
    []
  )
})

test("a line says the amount with Monarch's sign", () => {
  expect(lineFor(plaidRow("t1", "2026-08-04", 85.34))).toContain("-85.34")
  expect(lineFor(plaidRow("t1", "2026-08-04", 85.34))).toContain("t1")
})

test("the count says how many are missing of how many weighed", () => {
  expect(countSaid(2, 10, "2025-04-01")).toBe(
    "2 of 10 posted Plaid rows since 2025-04-01 are missing from Monarch"
  )
})

test("a bank no plaid-item page names is refused before anything is read", async () => {
  const answer = await plaidCheck(["no-such-bank"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("no-such-bank")
})

test("a window start that is no day is refused", async () => {
  const answer = await plaidCheck(["citi", firstDay.said, "last-week"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("last-week")
})

test("no bank named is refused", async () => {
  const answer = await plaidCheck([], GIVEN)
  expect(answer.refusals.length).toBeGreaterThan(0)
  expect(plaidItem.placeholder).toBe("item")
})
