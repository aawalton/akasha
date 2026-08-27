import { describe, expect, test } from "bun:test"
import { isPublishedTurnStatus, parseBankedRemainder, TurnStatusSchema } from "./turn-schema"

describe("TurnStatusSchema", () => {
  test("accepts the three vocabulary values", () => {
    expect(TurnStatusSchema.parse("draft")).toBe("draft")
    expect(TurnStatusSchema.parse("published")).toBe("published")
    expect(TurnStatusSchema.parse("complete")).toBe("complete")
  })

  test("refuses an unknown status value at the commit boundary", () => {
    expect(() => TurnStatusSchema.parse("archived")).toThrow()
    expect(() => TurnStatusSchema.parse("")).toThrow()
  })
})

describe("isPublishedTurnStatus", () => {
  test("published and the legacy complete read as visible", () => {
    expect(isPublishedTurnStatus("published")).toBe(true)
    expect(isPublishedTurnStatus("complete")).toBe(true)
  })

  test("missing status reads as published — never hides the live story", () => {
    expect(isPublishedTurnStatus(undefined)).toBe(true)
    expect(isPublishedTurnStatus(null)).toBe(true)
  })

  test("an unknown/legacy status value reads as visible (only draft hides)", () => {
    expect(isPublishedTurnStatus("archived")).toBe(true)
    expect(isPublishedTurnStatus("")).toBe(true)
  })

  test("draft is the ONLY status that hides a turn", () => {
    expect(isPublishedTurnStatus("draft")).toBe(false)
  })
})

describe("parseBankedRemainder — the continuation-weave buffer boundary read (#15077)", () => {
  test("a non-empty stored string parses to itself", () => {
    expect(parseBankedRemainder("...and the door swung wider.")).toBe(
      "...and the door swung wider."
    )
  })

  test("absent (undefined / null) reads as null — no banked tail", () => {
    expect(parseBankedRemainder(undefined)).toBeNull()
    expect(parseBankedRemainder(null)).toBeNull()
  })

  test("an empty string reads as null — an empty buffer is 'begin fresh', not a tail", () => {
    expect(parseBankedRemainder("")).toBeNull()
  })

  test("a non-string stored value reads as null (fail-soft boundary parse)", () => {
    expect(parseBankedRemainder(42)).toBeNull()
    expect(parseBankedRemainder({ text: "x" })).toBeNull()
  })
})
