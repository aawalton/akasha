import { expect, test } from "bun:test"
import { work } from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.code.ts"
import {
  account,
  REACH,
} from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.test-fixtures.ts"

test("a withdrawn subscription has spent the whole of the window", () => {
  expect(work(account({ subscriptionDisabledReason: "cancelled" }), REACH)).toBe(100)
  const withdrawn = { sevenDayPercentUsed: 2, subscriptionDisabledReason: "gone" }
  expect(work(account(withdrawn), REACH)).toBe(100)
})

test("an account carrying no percent is no reading rather than zero", () => {
  expect(work(account({}), REACH)).toBeNull()
  expect(work(account({ sevenDayPercentUsed: "" }), REACH)).toBeNull()
})

test("a percent standing as text is read as the number that percent spells", () => {
  expect(work(account({ sevenDayPercentUsed: "42" }), REACH)).toBe(42)
})

test("a percent standing as a number is read as it is", () => {
  expect(work(account({ sevenDayPercentUsed: 11 }), REACH)).toBe(11)
})

test("an empty reason is no withdrawal", () => {
  const held = { sevenDayPercentUsed: 5, subscriptionDisabledReason: "" }
  expect(work(account(held), REACH)).toBe(5)
})
