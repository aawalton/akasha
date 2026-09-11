import { expect, test } from "bun:test"
import type { ClaudeAccount } from "akasha/agents/claude-accounts/claude-account.page-type.types.ts"
import { work } from "akasha/agents/claude-accounts/properties/effective-five-hour-usage.computed-property.code.ts"
import { work as sevenDay } from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.code.ts"
import type { Reach } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { Computed } from "akasha/pages/computing/page-computing.module.code.ts"
import { computingOver } from "akasha/pages/computing/page-computing.module.code.ts"

const REACH: Reach = { target: () => null, naming: () => [] }

const BASE: ClaudeAccount = {
  id: "one",
  slug: "aine",
  email: "aine@alanwalton.com",
  aliasIndex: 0,
}

function account(held: Record<string, unknown>): ClaudeAccount {
  return Object.assign({ ...BASE }, held)
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
