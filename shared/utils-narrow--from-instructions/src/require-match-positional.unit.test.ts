import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { NarrowError } from "./narrow-error"
import { requireMatchPositional } from "./require-match-positional"

const dateRe = /^(\d{4})-(\d{2})-(\d{2})$/
const dateSchema = z.tuple([z.string(), z.string(), z.string()])

describe("requireMatchPositional", () => {
  test("returns the parsed positional captures on a successful match", () => {
    const result = requireMatchPositional(dateRe, dateSchema, "2026-04-27")
    expect(result).toEqual(["2026", "04", "27"])
  })

  test("throws NarrowError when the regex does not match", () => {
    expect(() => requireMatchPositional(dateRe, dateSchema, "not-a-date")).toThrow(NarrowError)
  })

  test("error message references the regex when no label is supplied", () => {
    expect(() => requireMatchPositional(dateRe, dateSchema, "garbage")).toThrow(
      /requireMatchPositional: no match for/
    )
  })

  test("error message includes the label when supplied", () => {
    expect(() => requireMatchPositional(dateRe, dateSchema, "garbage", "iso-date")).toThrow(
      /requireMatchPositional: no match for .* in iso-date/
    )
  })

  test("propagates the zod parse error when captures fail validation", () => {
    const strictSchema = z.tuple([z.string().length(4), z.string().length(2), z.string().length(2)])
    const tooShortRe = /^(\d+)-(\d+)-(\d+)$/
    expect(() => requireMatchPositional(tooShortRe, strictSchema, "26-4-27")).toThrow()
  })

  test("supports a single-capture regex", () => {
    const asinRe = /\/dp\/([A-Z0-9]{10})/
    const asinSchema = z.tuple([z.string()])
    const result = requireMatchPositional(asinRe, asinSchema, "/dp/B07XJ8C8F5")
    expect(result).toEqual(["B07XJ8C8F5"])
  })
})
