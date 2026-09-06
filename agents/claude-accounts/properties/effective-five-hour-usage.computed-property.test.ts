import { expect, test } from "bun:test"
import type { Computed, Reach } from "@akasha/pages/page-computing"
import { computingOver } from "@akasha/pages/page-computing"
import type { WorkedClaudeAccount } from "../claude-account.page-type.worked.ts"
import { work } from "./effective-five-hour-usage.computed-property.code.ts"
import { work as sevenDay } from "./effective-seven-day-usage.computed-property.code.ts"

const REACH: Reach = { target: () => null }

function account(held: Record<string, unknown>): WorkedClaudeAccount {
  return { slug: "aine", ...held } as unknown as WorkedClaudeAccount
}

test("an account that has spent its seven-day window has spent its five-hour window", () => {
  const spent = { effectiveSevenDayUsage: 100, fiveHourPercentUsed: 4 }
  expect(work(account(spent), REACH)).toBe(100)
})

test("a seven-day window under the ceiling leaves the five-hour figure alone", () => {
  const held = { effectiveSevenDayUsage: 11, fiveHourPercentUsed: 4 }
  expect(work(account(held), REACH)).toBe(4)
})

test("an account carrying no percent is no reading rather than zero", () => {
  expect(work(account({ effectiveSevenDayUsage: 11 }), REACH)).toBeNull()
})

test("a percent standing as text is read as the number that percent spells", () => {
  const held = { effectiveSevenDayUsage: 11, fiveHourPercentUsed: "42" }
  expect(work(account(held), REACH)).toBe(42)
})

// The withdrawal is not tested in this calculation at all, so proving it reaches the five-hour
// figure means running both calculations the way a reader runs them, over the lazy view
// `computingOver` builds. A page carrying no five-hour figure worth 100 still answers 100 here,
// and that is the whole of what reading the sibling buys.
test("a withdrawn subscription reaches the five-hour figure through the seven-day one", () => {
  const computed: readonly Computed[] = [
    {
      slug: "effective-seven-day-usage",
      key: "effectiveSevenDayUsage",
      holds: "number",
      work: sevenDay as Computed["work"],
    },
    {
      slug: "effective-five-hour-usage",
      key: "effectiveFiveHourUsage",
      holds: "number",
      work: work as Computed["work"],
    },
  ]
  const value = {
    id: "one",
    sevenDayPercentUsed: 3,
    fiveHourPercentUsed: 1,
    subscriptionDisabledReason: "the card was declined",
  }
  const subject = { id: "one", value, computed }
  const worked = computingOver({ subjectAt: () => subject }).workedAt("one")
  expect(worked?.value.effectiveSevenDayUsage).toBe(100)
  expect(worked?.value.effectiveFiveHourUsage).toBe(100)
  expect(worked?.dark.size).toBe(0)
})
