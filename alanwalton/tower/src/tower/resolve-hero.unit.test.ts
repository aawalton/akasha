import { describe, expect, it } from "bun:test"
import type { ChapterEntry, Illustration } from "@alanwalton/tower-core/state-schema"
import { resolveHeroSrc } from "./resolve-hero"

function entry(over: Partial<ChapterEntry>): ChapterEntry {
  const base: ChapterEntry = {
    number: 1,
    title: "The Cistern",
    floor: 1,
    startBeat: "b0",
    status: "closed",
  }
  return { ...base, ...over }
}

const ills: Illustration[] = [
  { anchor: "b37", src: "illustrations/b37-the-fall.png", alt: "the fall" },
  { anchor: "b41", src: "illustrations/b41-the-gate.png" },
]

describe("resolveHeroSrc", () => {
  it("returns the src of the illustration anchored to heroBeat", () => {
    expect(resolveHeroSrc(entry({ heroBeat: "b37" }), ills)).toBe("illustrations/b37-the-fall.png")
  })

  it("returns null when the chapter has no heroBeat", () => {
    expect(resolveHeroSrc(entry({}), ills)).toBeNull()
  })

  it("returns null when heroBeat is the empty string", () => {
    expect(resolveHeroSrc(entry({ heroBeat: "" }), ills)).toBeNull()
  })

  it("returns null when no illustration anchors to the heroBeat", () => {
    expect(resolveHeroSrc(entry({ heroBeat: "b99" }), ills)).toBeNull()
  })

  it("returns null when the illustration roster is empty", () => {
    expect(resolveHeroSrc(entry({ heroBeat: "b37" }), [])).toBeNull()
  })
})
