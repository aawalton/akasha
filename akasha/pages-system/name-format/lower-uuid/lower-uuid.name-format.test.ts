import { expect, test } from "bun:test"
import { lowerUuid } from "./lower-uuid.name-format.code.ts"

const HELD = "01a04eba-7459-7836-ab9f-30dd5c70d710"

test("hex groups joined with hyphens and all letters lower are written in it", () => {
  expect(lowerUuid(HELD)).toBe(true)
})

test("a capital letter is upper uuid, not this", () => {
  expect(lowerUuid(HELD.toUpperCase())).toBe(false)
})

test("no version or variant is judged, so any hex in those places is written in it", () => {
  expect(lowerUuid("00000000-0000-0000-0000-000000000000")).toBe(true)
  expect(lowerUuid("ffffffff-ffff-ffff-ffff-ffffffffffff")).toBe(true)
})

test("groups of other lengths, or none at all, are not written in it", () => {
  expect(lowerUuid("")).toBe(false)
  expect(lowerUuid(HELD.replace(/-/g, ""))).toBe(false)
  expect(lowerUuid("01a04eba-7459-7836-ab9f-30dd5c70d71")).toBe(false)
  expect(lowerUuid("01a04eba-7459-7836-ab9f-30dd5c70d7100")).toBe(false)
})

test("a letter past f is no hex digit", () => {
  expect(lowerUuid("01a04ebg-7459-7836-ab9f-30dd5c70d710")).toBe(false)
})
