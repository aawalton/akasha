import { expect, test } from "bun:test"
import {
  isSeatMode,
  rowLaunchOf,
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
