import { describe, expect, test } from "bun:test"
import { parseSequenceConfig, sequenceConfigSchema } from "./sequence-config"

describe("sequenceConfigSchema", () => {
  test("parses a full config", () => {
    const parsed = sequenceConfigSchema.safeParse({
      groupBy: "story",
      orderBy: "chapterNumber",
      direction: "asc",
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data).toEqual({ groupBy: "story", orderBy: "chapterNumber", direction: "asc" })
    }
  })

  test("direction is optional", () => {
    const parsed = sequenceConfigSchema.safeParse({ groupBy: "story", orderBy: "chapterNumber" })
    expect(parsed.success).toBe(true)
    if (parsed.success) expect(parsed.data.direction).toBeUndefined()
  })

  test("rejects an unknown key (.strict)", () => {
    const parsed = sequenceConfigSchema.safeParse({
      groupBy: "story",
      orderBy: "chapterNumber",
      extra: 1,
    })
    expect(parsed.success).toBe(false)
  })

  test("rejects an empty groupBy / orderBy", () => {
    expect(sequenceConfigSchema.safeParse({ groupBy: "", orderBy: "chapterNumber" }).success).toBe(
      false
    )
    expect(sequenceConfigSchema.safeParse({ groupBy: "story", orderBy: "" }).success).toBe(false)
  })

  test("rejects an invalid direction", () => {
    expect(
      sequenceConfigSchema.safeParse({
        groupBy: "story",
        orderBy: "chapterNumber",
        direction: "up",
      }).success
    ).toBe(false)
  })
})

describe("parseSequenceConfig", () => {
  test("returns the parsed config on a valid blob", () => {
    expect(
      parseSequenceConfig({ groupBy: "story", orderBy: "chapterNumber", direction: "desc" })
    ).toEqual({ groupBy: "story", orderBy: "chapterNumber", direction: "desc" })
  })

  test("returns null on absent / malformed input", () => {
    expect(parseSequenceConfig(undefined)).toBeNull()
    expect(parseSequenceConfig(null)).toBeNull()
    expect(parseSequenceConfig({})).toBeNull()
    expect(parseSequenceConfig({ groupBy: "story" })).toBeNull()
    expect(parseSequenceConfig("nope")).toBeNull()
  })
})
