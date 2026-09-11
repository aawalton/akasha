import { expect, test } from "bun:test"
import { fiveHourResetIn } from "akasha/agents/claude-accounts/modules/five-hour-reset/five-hour-reset.computed-property-module.code.ts"

const RESETS_AT = "2026-09-11T17:09:59.924Z"

test("an account that has spent its seven-day window has no five-hour reset", () => {
  expect(fiveHourResetIn(100, RESETS_AT)).toBeNull()
})

test("an account that has spent its five-hour window has that window's own reset", () => {
  expect(fiveHourResetIn(62, RESETS_AT)).toBe(RESETS_AT)
})

test("an account stating no five-hour reset has no five-hour reset", () => {
  expect(fiveHourResetIn(0, null)).toBeNull()
  expect(fiveHourResetIn(0, "")).toBeNull()
})

test("a seven-day window nothing has been read of holds no reset back", () => {
  expect(fiveHourResetIn(null, RESETS_AT)).toBe(RESETS_AT)
})
