import { expect, test } from "bun:test"
import {
  HEADLESS_FLAG,
  isSeatMode,
  rowLaunchOf,
  runningModeIn,
  SEAT_MODE_HEADLESS,
  SEAT_MODE_INTERACTIVE,
  SEAT_MODES,
  startModeOfRowLaunch,
} from "./seat-modes.module.code.ts"

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

test("a headless seat was spawned and an interactive seat was opened", () => {
  expect(rowLaunchOf(SEAT_MODE_HEADLESS)).toBe("spawned")
  expect(rowLaunchOf(SEAT_MODE_INTERACTIVE)).toBe("opened")
})

test("a launch reads back as the mode it was spelled from", () => {
  for (const mode of SEAT_MODES) {
    expect(startModeOfRowLaunch(rowLaunchOf(mode))).toBe(mode)
  }
})

test("a launch naming neither answers no mode", () => {
  expect(startModeOfRowLaunch(null)).toBeNull()
  expect(startModeOfRowLaunch("")).toBeNull()
  expect(startModeOfRowLaunch("headless")).toBeNull()
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
