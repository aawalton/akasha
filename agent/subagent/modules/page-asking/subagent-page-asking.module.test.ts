import { expect, test } from "bun:test"
import {
  logPathOf,
  seatNamedIn,
} from "akasha/agent/subagent/modules/page-asking/subagent-page-asking.module.code.ts"
import {
  ANOTHER,
  inScratch,
  PERSONA_AT,
  SEAT_ID,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.test-fixtures.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

test("a log sits in the seat's own folder named for the module landing a subagent's page", () => {
  expect(logPathOf(SEAT_ID, "/var/tmp/base")).toBe(`/var/tmp/base/${SEAT_ID}/subagent-presence.log`)
})

test("a seat is named by the page the index carries for its id", () => {
  inScratch((root) => {
    pageFiled(root, SEAT_ID, "akasha/agent/seat/pages/akasha.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe("akasha")
  })
})

test("a seat the index carries no page for is named by nothing", () => {
  inScratch((root) => {
    pageFiled(root, ANOTHER, "akasha/agent/seat/pages/thea.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  })
})

test("a page that is no seat names no seat", () => {
  inScratch((root) => {
    pageFiled(root, SEAT_ID, PERSONA_AT)
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  })
})
