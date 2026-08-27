import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { NarrowError } from "./narrow-error"
import { requireMatch } from "./require-match"

const dateSchema = z.object({
  year: z.string(),
  month: z.string(),
  day: z.string(),
})

const dateRe = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/

describe("requireMatch", () => {
  test("returns the parsed named-group object on a successful match", () => {
    const result = requireMatch(dateRe, dateSchema, "2026-04-27")
    expect(result).toEqual({ year: "2026", month: "04", day: "27" })
  })

  test("throws NarrowError when the regex does not match", () => {
    expect(() => requireMatch(dateRe, dateSchema, "not-a-date")).toThrow(NarrowError)
  })

  test("error message references the regex when no label is supplied", () => {
    expect(() => requireMatch(dateRe, dateSchema, "garbage")).toThrow(/requireMatch: no match for/)
  })

  test("error message includes the label when supplied", () => {
    expect(() => requireMatch(dateRe, dateSchema, "garbage", "iso-date")).toThrow(
      /requireMatch: no match for .* in iso-date/
    )
  })

  test("propagates the zod parse error when groups fail validation", () => {
    const strictSchema = z.object({
      year: z.string().length(4),
      month: z.string().length(2),
      day: z.string().length(2),
    })
    const tooShortRe = /^(?<year>\d+)-(?<month>\d+)-(?<day>\d+)$/
    expect(() => requireMatch(tooShortRe, strictSchema, "26-4-27")).toThrow()
  })

  test("falls back to {} when the regex has no named groups, surfacing a zod parse error", () => {
    const noGroupsRe = /^\d+$/
    expect(() => requireMatch(noGroupsRe, dateSchema, "12345")).toThrow()
  })
})
