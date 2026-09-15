import { expect, test } from "bun:test"
import { seatNameFor } from "akasha/agent/seat/name/modules/initiative-seat-name/initiative-seat-name.module.code.ts"

test("the seat an initiative goes to is named by the initiative's first segment", () => {
  expect(seatNameFor("amy-harness-improvements")).toBe("amy")
})

test("an initiative of one segment names the seat of that whole slug", () => {
  expect(seatNameFor("amy")).toBe("amy")
})

test("a hyphen parts the first segment from the rest", () => {
  expect(seatNameFor("a-b")).toBe("a")
  expect(seatNameFor("-b")).toBe("")
})
