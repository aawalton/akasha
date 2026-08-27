import { describe, expect, it } from "bun:test"
import type { Asked } from "@shared/pages-query"
import { KOKORO_STREAM_VARIANT, STORED_READ_ALOUD_VARIANT } from "@shared/pages-ui/media/media-src"
import { voicedPersonasIn, withKokoroFallback } from "./media-variants"

const answering = (rows: readonly Record<string, unknown>[]): Asked => ({
  ok: true,
  answer: {
    n: rows.length,
    value: null,
    over: null,
    rows: rows.map((values) => ({ values })),
    faults: [],
    omitted: [],
    unfound: [],
  },
})

describe("voicedPersonasIn", () => {
  it("refuses a refused ask rather than reading it as no voices at all", () => {
    const refused: Asked = { ok: false, why: "the page query service replied 503" }
    expect(() => voicedPersonasIn(refused)).toThrow(/persona-all/)
    expect(() => voicedPersonasIn(refused)).toThrow(/503/)
  })

  it("names every persona carrying a voice reference, titling it by its own title", () => {
    const { candidateSlugs, displayNameBySlug } = voicedPersonasIn(
      answering([
        { slug: "amy", title: "Amy", "voice-reference-sha256": "aa" },
        { slug: "nimue", title: "Nimue", "voice-reference-sha256": "bb" },
      ])
    )
    expect([...candidateSlugs]).toEqual(["amy", "nimue"])
    expect(displayNameBySlug.get("amy")).toBe("Amy")
    expect(displayNameBySlug.get("nimue")).toBe("Nimue")
  })

  it("leaves out a persona with no voice reference, and falls back to the slug for a title", () => {
    const { candidateSlugs, displayNameBySlug } = voicedPersonasIn(
      answering([
        { slug: "claude", title: "Claude" },
        { slug: "amy", "voice-reference-sha256": "aa" },
        { slug: "zeli", title: "", "voice-reference-sha256": "cc" },
      ])
    )
    expect([...candidateSlugs]).toEqual(["amy", "zeli"])
    expect(displayNameBySlug.has("claude")).toBe(false)
    expect(displayNameBySlug.get("amy")).toBe("amy")
    expect(displayNameBySlug.get("zeli")).toBe("zeli")
  })

  it("reads an answer carrying no rows as no voices, which is not a refusal", () => {
    const { candidateSlugs } = voicedPersonasIn(answering([]))
    expect([...candidateSlugs]).toEqual([])
  })
})

describe("withKokoroFallback", () => {
  it("offers the live Kokoro streaming variant as default when no rendition exists at all", () => {
    const { variants, defaultVariant } = withKokoroFallback([], null, false)
    expect(variants).toEqual([{ id: KOKORO_STREAM_VARIANT, label: "Read aloud" }])
    expect(defaultVariant).toBe(KOKORO_STREAM_VARIANT)
  })

  it("offers the stored Read-aloud variant (seekable byte route) when its rendition exists", () => {
    const { variants, defaultVariant } = withKokoroFallback([], null, true)
    expect(variants).toEqual([{ id: STORED_READ_ALOUD_VARIANT, label: "Read aloud" }])
    expect(defaultVariant).toBe(STORED_READ_ALOUD_VARIANT)
    expect(variants.some((v) => v.id === KOKORO_STREAM_VARIANT)).toBe(false)
  })

  it("leaves stored MOSS renditions untouched and never adds a fallback when they exist", () => {
    const moss = [{ id: "amy", label: "Amy" }]
    const { variants, defaultVariant } = withKokoroFallback(moss, "amy", false)
    expect(variants).toEqual(moss)
    expect(defaultVariant).toBe("amy")
    expect(variants.some((v) => v.id === KOKORO_STREAM_VARIANT)).toBe(false)
    expect(variants.some((v) => v.id === STORED_READ_ALOUD_VARIANT)).toBe(false)
  })

  it("MOSS renditions win even if a stored Read-aloud rendition also happens to exist", () => {
    const moss = [{ id: "amy", label: "Amy" }]
    const { variants, defaultVariant } = withKokoroFallback(moss, "amy", true)
    expect(variants).toEqual(moss)
    expect(defaultVariant).toBe("amy")
    expect(variants.some((v) => v.id === STORED_READ_ALOUD_VARIANT)).toBe(false)
  })

  it("preserves a MOSS variant list even when its pinned default is null", () => {
    const moss = [{ id: "amy", label: "Amy" }]
    const { variants, defaultVariant } = withKokoroFallback(moss, null, false)
    expect(variants).toEqual(moss)
    expect(defaultVariant).toBeNull()
  })
})
