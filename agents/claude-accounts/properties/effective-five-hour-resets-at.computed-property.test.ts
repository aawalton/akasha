import { expect, test } from "bun:test"
import { work } from "akasha/agents/claude-accounts/properties/effective-five-hour-resets-at.computed-property.code.ts"
import { work as sevenDay } from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.code.ts"
import {
  account,
  REACH,
} from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.test-fixtures.ts"
import type { Computed } from "akasha/pages/computing/page-computing.module.code.ts"
import { computingOver } from "akasha/pages/computing/page-computing.module.code.ts"

const RESETS_AT = "2026-09-11T17:09:59.924Z"

test("an account that has spent its seven-day window has no five-hour reset", () => {
  const spent = { effectiveSevenDayUsage: 100, fiveHourResetsAt: RESETS_AT }
  expect(work(account(spent), REACH)).toBeNull()
})

test("a seven-day window under the ceiling leaves the five-hour reset alone", () => {
  const held = { effectiveSevenDayUsage: 11, fiveHourResetsAt: RESETS_AT }
  expect(work(account(held), REACH)).toBe(RESETS_AT)
})

test("an account stating no five-hour reset has none worked out", () => {
  expect(work(account({ effectiveSevenDayUsage: 11 }), REACH)).toBeNull()
})

test("a withdrawn subscription reaches the five-hour reset through the seven-day usage", () => {
  const computed: readonly Computed[] = [
    {
      slug: "effective-seven-day-usage",
      key: "effectiveSevenDayUsage",
      holds: "number",
      work: sevenDay as Computed["work"],
    },
    {
      slug: "effective-five-hour-resets-at",
      key: "effectiveFiveHourResetsAt",
      holds: "instant",
      work: work as Computed["work"],
    },
  ]
  const value = {
    id: "one",
    sevenDayPercentUsed: 3,
    fiveHourResetsAt: RESETS_AT,
    subscriptionDisabledReason: "the card was declined",
  }
  const subject = { id: "one", value, computed }
  const worked = computingOver({ subjectAt: () => subject }).workedAt("one")
  expect(worked?.value.effectiveSevenDayUsage).toBe(100)
  expect(worked?.value.effectiveFiveHourResetsAt).toBeUndefined()
  expect(worked?.dark.size).toBe(0)
})
