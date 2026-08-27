import { describe, expect, it } from "bun:test"
import { personaSlugCondition, relationshipLevelMatchCondition } from "./persona-page-conditions"
import { buildWallpaperImageRecord } from "./wallpaper-record"

const baseInput = {
  personaSlug: "aelwyn",
  personaTitle: "Aelwyn",
  level: 2,
  stage: "Experimenting",
  esoDay: "2026-06-21",
  imagePath: "/home/walton/Personas/Aelwyn/wallpapers/aelwyn-L02-20260621T143100Z.png",
} as const

describe("buildWallpaperImageRecord", () => {
  it("keys the match on (personaSlug, relationshipLevel) and NOT on esoDay", () => {
    const { where } = buildWallpaperImageRecord(baseInput)
    expect(where).toEqual([personaSlugCondition("aelwyn"), relationshipLevelMatchCondition(2)])
    expect(where.some((c) => "key" in c && c.key === "esoDay")).toBe(false)
  })

  it("narrows on the persona's slug rather than the page's own, which a file page leaves unset", () => {
    const { where } = buildWallpaperImageRecord(baseInput)
    expect(where.some((c) => "key" in c && c.key === "slug")).toBe(false)
    expect("slug" in buildWallpaperImageRecord(baseInput).set).toBe(false)
  })

  it("sets the persona slug and refreshes esoDay as a stored field", () => {
    const { set } = buildWallpaperImageRecord(baseInput)
    expect(set.personaSlug).toBe("aelwyn")
    expect(set.relationshipLevel).toBe(2)
    expect(set.stage).toBe("Experimenting")
    expect(set.esoDay).toBe("2026-06-21")
    expect(set.imagePath).toBe(baseInput.imagePath)
    expect("kind" in set).toBe(false)
  })

  it("composes a self-describing page title with a two-digit level", () => {
    const { set } = buildWallpaperImageRecord(baseInput)
    expect(set.title).toBe("Aelwyn — wallpaper L02 (Experimenting)")
  })

  it("pads levels >= 10 without truncation", () => {
    const { set, where } = buildWallpaperImageRecord({ ...baseInput, level: 12 })
    expect(set.title).toBe("Aelwyn — wallpaper L12 (Experimenting)")
    expect(set.relationshipLevel).toBe(12)
    expect(where).toContainEqual(relationshipLevelMatchCondition(12))
  })

  it("re-delivery at the same level produces an identical match key (idempotent upsert target)", () => {
    const first = buildWallpaperImageRecord(baseInput)
    const reDeliverLaterDay = buildWallpaperImageRecord({
      ...baseInput,
      esoDay: "2026-07-01",
      imagePath: "/home/walton/Personas/Aelwyn/wallpapers/aelwyn-L02-20260701T090000Z.png",
    })
    expect(reDeliverLaterDay.where).toEqual(first.where)
    expect(reDeliverLaterDay.set.esoDay).toBe("2026-07-01")
    expect(reDeliverLaterDay.set.imagePath).not.toBe(first.set.imagePath)
  })

  it("omits grade, colourSlug, valueSlug, closeness and description — a wallpaper carries none of them", () => {
    const { set } = buildWallpaperImageRecord(baseInput)
    expect("grade" in set).toBe(false)
    expect("colourSlug" in set).toBe(false)
    expect("valueSlug" in set).toBe(false)
    expect("closeness" in set).toBe(false)
    expect("description" in set).toBe(false)
  })
})
