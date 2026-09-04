import { expect, test } from "bun:test"
import { shouldWriteTerminalStoppedStatus } from "./supervisor-lifecycle-death-write.module.code.ts"

test("a supervisor going down to re-exec writes no stopped status", () => {
  expect(shouldWriteTerminalStoppedStatus(true)).toBe(false)
})

test("every other way down writes the stopped status", () => {
  expect(shouldWriteTerminalStoppedStatus(false)).toBe(true)
})
