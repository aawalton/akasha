import { describe, expect, test } from "bun:test"
import { parseCompletionOverrideRow } from "./completion-override-row.module.code.ts"

const CHARACTER_ID = "01970000-0000-7000-8000-aaaaaaaaaaaa"

const wellFormedRow = () => ({
  id: "01970000-0000-7000-8000-bbbbbbbbbbbb",
  character: CHARACTER_ID,
  completionCardId: "skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  floor: 1,
  reason: "ESO under-reports the Folium Discognitum skill point.",
})

describe("parseCompletionOverrideRow", () => {
  test("parses a well-formed override row", () => {
    const parsed = parseCompletionOverrideRow(wellFormedRow())
    expect(parsed).not.toBeNull()
    expect(parsed?.characterId).toBe(CHARACTER_ID)
    expect(parsed?.override).toEqual({
      completionCardId: "skill-points",
      completionItemPath: ["general", "foliumDiscognitum"],
      floor: 1,
    })
  })

  test("reads the character relation as a bare target page id string", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), character: { id: CHARACTER_ID } })
    ).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), character: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), character: "" })).toBeNull()
  })

  test("returns null for a missing or non-string completionCardId", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionCardId: undefined })
    ).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), completionCardId: 42 })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), completionCardId: "" })).toBeNull()
  })

  test("returns null for a card id no completion card answers to", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionCardId: "not-a-card" })
    ).toBeNull()
  })

  test("accepts numeric and string path segments", () => {
    const parsed = parseCompletionOverrideRow({
      ...wellFormedRow(),
      completionItemPath: ["skyshards", 5],
    })
    expect(parsed?.override.completionItemPath).toEqual(["skyshards", 5])
  })

  test("returns null when completionItemPath is not an array of string or number", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: undefined })
    ).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: "general" })
    ).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: ["general", { x: 1 }] })
    ).toBeNull()
  })

  test("accepts an empty completionItemPath array", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: [] })?.override
        .completionItemPath
    ).toEqual([])
  })

  test("returns null for a missing or non-finite floor", () => {
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: "1" })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: Number.NaN })).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), floor: Number.POSITIVE_INFINITY })
    ).toBeNull()
  })

  test("accepts a floor of 0", () => {
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: 0 })?.override.floor).toBe(0)
  })
})
