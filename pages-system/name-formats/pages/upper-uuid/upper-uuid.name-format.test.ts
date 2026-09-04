import { expect, test } from "bun:test"
import { upperUuid } from "./upper-uuid.name-format.code.ts"

const HELD = "01A04EBA-7459-7C0D-8DEE-2A96140424A2"

test("hex groups joined with hyphens and all letters capital are written in it", () => {
  expect(upperUuid(HELD)).toBe(true)
})

test("a lower letter is lower uuid, not this", () => {
  expect(upperUuid(HELD.toLowerCase())).toBe(false)
})

test("no version or variant is judged, so any hex in those places is written in it", () => {
  expect(upperUuid("00000000-0000-0000-0000-000000000000")).toBe(true)
  expect(upperUuid("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")).toBe(true)
})

test("groups of other lengths, or none at all, are not written in it", () => {
  expect(upperUuid("")).toBe(false)
  expect(upperUuid(HELD.replace(/-/g, ""))).toBe(false)
  expect(upperUuid("01A04EBA-7459-7C0D-8DEE-2A96140424A")).toBe(false)
  expect(upperUuid("01A04EBA-7459-7C0D-8DEE-2A96140424A22")).toBe(false)
})

test("a letter past F is no hex digit", () => {
  expect(upperUuid("01A04EBG-7459-7C0D-8DEE-2A96140424A2")).toBe(false)
})
