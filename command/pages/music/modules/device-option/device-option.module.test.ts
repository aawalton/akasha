import { expect, test } from "bun:test"
import {
  optionFor,
  whereOf,
} from "akasha/command/pages/music/modules/device-option/device-option.module.code.ts"

test("a call naming no device leaves the option empty", () => {
  expect(optionFor(undefined)).toEqual({})
  expect(whereOf(undefined)).toBe("the active device")
})

test("a device named is carried into the option and into the words", () => {
  expect(optionFor("abc123")).toEqual({ deviceId: "abc123" })
  expect(whereOf("abc123")).toBe("device abc123")
})
