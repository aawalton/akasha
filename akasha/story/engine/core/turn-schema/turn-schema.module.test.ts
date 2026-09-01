import { describe, expect, test } from "bun:test"
import {
  isPublishedTurnStatus,
  parseBankedRemainder,
  TurnStatusSchema,
} from "./turn-schema.module.code.ts"

describe("isPublishedTurnStatus", () => {
  test("a draft is not published", () => {
    expect(isPublishedTurnStatus("draft")).toBe(false)
  })

  test("complete and published both count as published", () => {
    expect(isPublishedTurnStatus("complete")).toBe(true)
    expect(isPublishedTurnStatus("published")).toBe(true)
  })

  test("a missing standing counts as published", () => {
    expect(isPublishedTurnStatus(null)).toBe(true)
    expect(isPublishedTurnStatus(undefined)).toBe(true)
  })
})

describe("TurnStatusSchema", () => {
  test("holds the three standings", () => {
    expect(TurnStatusSchema.options).toEqual(["draft", "complete", "published"])
  })
})

describe("parseBankedRemainder", () => {
  test("keeps a non-empty string", () => {
    expect(parseBankedRemainder("the rest of the paragraph")).toBe("the rest of the paragraph")
  })

  test("reads an empty string as nothing banked", () => {
    expect(parseBankedRemainder("")).toBe(null)
  })

  test("reads anything that is not a string as nothing banked", () => {
    expect(parseBankedRemainder(7)).toBe(null)
    expect(parseBankedRemainder(undefined)).toBe(null)
  })
})
