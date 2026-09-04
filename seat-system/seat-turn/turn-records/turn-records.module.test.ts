import { expect, test } from "bun:test"
import {
  turnEndReadingLine,
  turnEndReadingOf,
  turnPendingSourceLine,
  turnPendingSourceOf,
  turnStateOf,
} from "./turn-records.module.code.ts"

test("a record akasha declares no property for reads as absent", () => {
  expect(turnEndReadingOf("any-agent")).toBeNull()
  expect(turnStateOf("any-agent")).toBeNull()
  expect(turnPendingSourceOf("any-agent")).toBeNull()
})

test("an absent record is said in words", () => {
  expect(turnEndReadingLine(null)).toContain("no turn end read")
  expect(turnPendingSourceLine(null)).toContain("no turn end measured")
})

test("a record that is there is said with the moment it was read", () => {
  const at = Date.parse("2026-09-03T00:00:00.000Z")
  expect(turnEndReadingLine({ value: "stopped", at })).toContain("stopped")
  expect(turnEndReadingLine({ value: "stopped", at })).toContain("2026-09-03T00:00:00.000Z")
})
