import { describe, expect, it } from "bun:test"
import { buildAnchorImageRecord, buildCoverImageRecord } from "./anchor-cover-record"
import { personaSlugCondition, relationshipLevelMatchCondition } from "./persona-page-conditions"

const anchorInput = {
  personaSlug: "aelwyn",
  personaTitle: "Aelwyn",
  imagePath: "Aelwyn/aelwyn-anchor.png",
  imageRoot: "personas",
} as const

const coverInput = {
  personaSlug: "aelwyn",
  personaTitle: "Aelwyn",
  level: 1,
} as const

describe("buildAnchorImageRecord", () => {
  it("keys on personaSlug alone, with NO relationshipLevel — one level-agnostic page per persona", () => {
    const { where } = buildAnchorImageRecord(anchorInput)
    expect(where).toEqual([personaSlugCondition("aelwyn")])
    expect(where.some((c) => "key" in c && c.key === "relationshipLevel")).toBe(false)
  })

  it("narrows on no kind — persona-anchor-image is the kind", () => {
    const { where } = buildAnchorImageRecord(anchorInput)
    expect(where.some((c) => "key" in c && c.key === "kind")).toBe(false)
    expect("kind" in buildAnchorImageRecord(anchorInput).set).toBe(false)
  })

  it("sets the persona slug, disk locator and root — but no relationshipLevel", () => {
    const { set } = buildAnchorImageRecord(anchorInput)
    expect(set.personaSlug).toBe("aelwyn")
    expect(set.imagePath).toBe("Aelwyn/aelwyn-anchor.png")
    expect(set.imageRoot).toBe("personas")
    expect("relationshipLevel" in set).toBe(false)
    expect(set.title).toBe("Aelwyn — anchor")
  })

  it("omits imageRoot when not provided", () => {
    const { set } = buildAnchorImageRecord({
      personaSlug: anchorInput.personaSlug,
      personaTitle: anchorInput.personaTitle,
      imagePath: anchorInput.imagePath,
    })
    expect("imageRoot" in set).toBe(false)
  })
})

describe("buildCoverImageRecord", () => {
  it("keys on (personaSlug, relationshipLevel) — one page per persona per level", () => {
    const { where } = buildCoverImageRecord(coverInput)
    expect(where).toEqual([personaSlugCondition("aelwyn"), relationshipLevelMatchCondition(1)])
    expect(where.some((c) => "key" in c && c.key === "kind")).toBe(false)
  })

  it("holds the level as a number and states it in a two-digit self-describing title", () => {
    const { set } = buildCoverImageRecord(coverInput)
    expect(set.personaSlug).toBe("aelwyn")
    expect(set.relationshipLevel).toBe(1)
    expect(set.title).toBe("Aelwyn — cover L01")
    expect("kind" in set).toBe(false)
  })

  it("pads levels >= 10 without truncation", () => {
    const { set, where } = buildCoverImageRecord({ ...coverInput, level: 12 })
    expect(set.title).toBe("Aelwyn — cover L12")
    expect(set.relationshipLevel).toBe(12)
    expect(where).toContainEqual(relationshipLevelMatchCondition(12))
  })

  it("omits imagePath/imageRoot when not provided (a cover names no disk source of its own)", () => {
    const { set } = buildCoverImageRecord(coverInput)
    expect("imagePath" in set).toBe(false)
    expect("imageRoot" in set).toBe(false)
  })

  it("carries imagePath/imageRoot through when provided", () => {
    const { set } = buildCoverImageRecord({
      ...coverInput,
      imagePath: "Aelwyn/aelwyn-anchor.png",
      imageRoot: "personas",
    })
    expect(set.imagePath).toBe("Aelwyn/aelwyn-anchor.png")
    expect(set.imageRoot).toBe("personas")
  })

  it("a second write at the same level produces an identical match key (idempotent upsert target)", () => {
    const first = buildCoverImageRecord(coverInput)
    const second = buildCoverImageRecord({ ...coverInput, personaTitle: "Aelwyn (renamed)" })
    expect(second.where).toEqual(first.where)
  })
})
