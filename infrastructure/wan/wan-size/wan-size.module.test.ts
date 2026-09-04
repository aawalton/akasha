import { expect, test } from "bun:test"
import { parseSizeOrNull } from "./wan-size.module.code.ts"

test("two whole numbers parted by an x read as a size", () => {
  expect(parseSizeOrNull("1280x720")).toEqual({ width: 1280, height: 720 })
  expect(parseSizeOrNull("480x480")).toEqual({ width: 480, height: 480 })
})

test("anything that is not two whole positive numbers reads as nothing", () => {
  expect(parseSizeOrNull("")).toBeNull()
  expect(parseSizeOrNull("1280")).toBeNull()
  expect(parseSizeOrNull("1280x")).toBeNull()
  expect(parseSizeOrNull("x720")).toBeNull()
  expect(parseSizeOrNull("0x720")).toBeNull()
  expect(parseSizeOrNull("1280x720p")).toBeNull()
  expect(parseSizeOrNull("1280 x 720")).toBeNull()
})
