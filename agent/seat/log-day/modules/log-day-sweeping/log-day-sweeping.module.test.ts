import { expect, test } from "bun:test"
import { removalFor } from "akasha/agent/seat/log-day/modules/log-day-sweeping/log-day-sweeping.module.code.ts"

const DAY = "agent/seat/log-day/pages/a-seat-2026-09-01/a-seat-2026-09-01.seat-log-day.ts"

test("a removal states the commit the checkout was at before its days were read", () => {
  const read = "e".repeat(40)
  const asked = removalFor([DAY], read)
  expect(asked.removes).toEqual([DAY])
  expect(asked.read).toBe(read)
})
