import { expect, test } from "bun:test"
import {
  HEADLESS_FLAG,
  isSeatMode,
  runningModeIn,
  SEAT_MODE_HEADLESS,
  SEAT_MODE_INTERACTIVE,
  SEAT_MODES,
} from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"

test("a seat starts in one of two modes and no third", () => {
  expect(SEAT_MODES).toEqual([SEAT_MODE_INTERACTIVE, SEAT_MODE_HEADLESS])
})

test("each mode is a mode", () => {
  expect(isSeatMode(SEAT_MODE_INTERACTIVE)).toBe(true)
  expect(isSeatMode(SEAT_MODE_HEADLESS)).toBe(true)
})

test("what is not one of the two is no mode", () => {
  expect(isSeatMode("")).toBe(false)
  expect(isSeatMode("spawned")).toBe(false)
  expect(isSeatMode("Interactive")).toBe(false)
})

test("a command line carrying the flag is running headless", () => {
  expect(runningModeIn([HEADLESS_FLAG, "-a", "aawalton"])).toBe(SEAT_MODE_HEADLESS)
  expect(runningModeIn(["-a", "aawalton", HEADLESS_FLAG])).toBe(SEAT_MODE_HEADLESS)
})

test("a command line carrying no flag is running interactive", () => {
  expect(runningModeIn([])).toBe(SEAT_MODE_INTERACTIVE)
  expect(runningModeIn(["-a", "aawalton", "--agent-id", "one", "--resume"])).toBe(
    SEAT_MODE_INTERACTIVE
  )
})

test("a word merely holding the flag is not the flag", () => {
  expect(runningModeIn(["--headlessly"])).toBe(SEAT_MODE_INTERACTIVE)
  expect(runningModeIn(["run --headless now"])).toBe(SEAT_MODE_INTERACTIVE)
})
