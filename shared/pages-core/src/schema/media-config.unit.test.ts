import { describe, expect, test } from "bun:test"
import { audioMediaConfigSchema, mediaConfigSchema, parseMediaConfig } from "./media-config"

describe("audioMediaConfigSchema", () => {
  test("parses a full audio arm", () => {
    const parsed = audioMediaConfigSchema.safeParse({
      sourcePropertyId: "text",
      renderer: "tts",
      variantAxis: "narrator",
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data).toEqual({
        sourcePropertyId: "text",
        renderer: "tts",
        variantAxis: "narrator",
      })
    }
  })

  test("variantAxis is optional", () => {
    const parsed = audioMediaConfigSchema.safeParse({ sourcePropertyId: "text", renderer: "tts" })
    expect(parsed.success).toBe(true)
    if (parsed.success) expect(parsed.data.variantAxis).toBeUndefined()
  })

  test("rejects an unknown renderer", () => {
    expect(
      audioMediaConfigSchema.safeParse({ sourcePropertyId: "text", renderer: "speech" }).success
    ).toBe(false)
  })

  test("rejects an unknown variantAxis", () => {
    expect(
      audioMediaConfigSchema.safeParse({
        sourcePropertyId: "text",
        renderer: "tts",
        variantAxis: "speaker",
      }).success
    ).toBe(false)
  })

  test("rejects an empty sourcePropertyId", () => {
    expect(
      audioMediaConfigSchema.safeParse({ sourcePropertyId: "", renderer: "tts" }).success
    ).toBe(false)
  })

  test("rejects an unknown key (.strict)", () => {
    expect(
      audioMediaConfigSchema.safeParse({ sourcePropertyId: "text", renderer: "tts", extra: 1 })
        .success
    ).toBe(false)
  })
})

describe("mediaConfigSchema", () => {
  test("parses a config with an audio arm", () => {
    const parsed = mediaConfigSchema.safeParse({
      audio: { sourcePropertyId: "text", renderer: "tts", variantAxis: "narrator" },
    })
    expect(parsed.success).toBe(true)
  })

  test("audio arm is optional (empty config valid)", () => {
    expect(mediaConfigSchema.safeParse({}).success).toBe(true)
  })

  test("rejects an unknown medium key (.strict)", () => {
    expect(
      mediaConfigSchema.safeParse({
        audio: { sourcePropertyId: "text", renderer: "tts" },
        video: {},
      }).success
    ).toBe(false)
  })
})

describe("parseMediaConfig", () => {
  test("returns the parsed config on a valid blob", () => {
    expect(parseMediaConfig({ audio: { sourcePropertyId: "text", renderer: "tts" } })).toEqual({
      audio: { sourcePropertyId: "text", renderer: "tts" },
    })
  })

  test("returns null on absent / malformed input", () => {
    expect(parseMediaConfig(undefined)).toBeNull()
    expect(parseMediaConfig(null)).toBeNull()
    expect(parseMediaConfig("nope")).toBeNull()
    expect(parseMediaConfig({ audio: { renderer: "tts" } })).toBeNull()
    expect(parseMediaConfig({ audio: { sourcePropertyId: "text", renderer: "x" } })).toBeNull()
  })
})
