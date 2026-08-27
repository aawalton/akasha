import { describe, expect, test } from "bun:test"
import type { Catalog } from "./catalog"
import { BASE_IMAGE_ID } from "./core/constants"
import { type GameState, type Teammate } from "./core/types"
import { deriveRosterView } from "./roster-view"

function mkTeammate(over: Partial<Teammate> & { slug: string; name: string }): Teammate {
  return {
    color: "var(--pink)",
    portrait: "portraits/x.png",
    flavor: "",
    cost: 0,
    rate: 2,
    rank: 3,
    level: 4,
    stage: "Bonding",
    ...over,
  }
}

function base(over: Partial<GameState> = {}): GameState {
  return {
    resource: 0,
    teammates: [mkTeammate({ slug: "abby", name: "Abby" })],
    lastTickAt: 0,
    gacha: { girls: {}, cycleDraws: 0 },
    ...over,
  }
}

const CATALOG: Catalog = {
  roster: [
    {
      slug: "abby",
      name: "Abby",
      level: 4,
      stage: "Bonding",
      cover: "/api/image/cov-abby",
    },
    {
      slug: "nova",
      name: "Nova",
      level: 1,
      stage: "Initiating",
      cover: "/api/image/cov-nova",
    },
  ],
  pools: {
    abby: ["img-1", "img-2", "img-3"],
    nova: ["img-n1", "img-n2"],
  },
}

describe("deriveRosterView (#13389)", () => {
  test("spans the full catalog roster; undrawn girls are locked", () => {
    const cards = deriveRosterView(base(), CATALOG, 0)
    const novaCard = cards.find((c) => c.slug === "nova")
    expect(novaCard?.locked).toBe(true)
    expect(novaCard?.pool).toEqual(["img-n1", "img-n2"])
    expect(novaCard?.images).toEqual([])
    expect(novaCard?.frontImageId).toBeNull()
  })

  test("an unlocked girl fronts her SELECTED image (frontImage wins)", () => {
    const cards = deriveRosterView(
      base({
        gacha: {
          girls: {
            abby: { stars: 2, dupeProgress: 1, images: ["img-1", "img-2"], frontImage: "img-1" },
          },
          cycleDraws: 0,
        },
      }),
      CATALOG,
      0
    )
    const abby = cards.find((c) => c.slug === "abby")
    expect(abby?.locked).toBe(false)
    expect(abby?.frontImageId).toBe("img-1")
    expect(abby?.pool).toEqual(["img-1", "img-2", "img-3"])
    expect(abby?.images).toEqual(["img-1", "img-2"])
    expect(abby?.stars).toBe(2)
  })

  test("with no frontImage, fronts the latest drawn image", () => {
    const cards = deriveRosterView(
      base({
        gacha: {
          girls: { abby: { stars: 0, dupeProgress: 0, images: ["img-1", "img-2"] } },
          cycleDraws: 0,
        },
      }),
      CATALOG,
      0
    )
    expect(cards.find((c) => c.slug === "abby")?.frontImageId).toBe("img-2")
  })

  test("the BASE sentinel fronts null (the base cover), beating the latest-drawn fallback (#14459)", () => {
    const cards = deriveRosterView(
      base({
        gacha: {
          girls: {
            abby: {
              stars: 0,
              dupeProgress: 0,
              images: ["img-1", "img-2"],
              frontImage: BASE_IMAGE_ID,
            },
          },
          cycleDraws: 0,
        },
      }),
      CATALOG,
      0
    )
    const abby = cards.find((c) => c.slug === "abby")
    expect(abby?.frontImageId).toBeNull()
    expect(abby?.images).toEqual(["img-1", "img-2"])
  })

  test("a stale frontImage no longer owned falls back to the latest image", () => {
    const cards = deriveRosterView(
      base({
        gacha: {
          girls: { abby: { stars: 0, dupeProgress: 0, images: ["img-1"], frontImage: "img-gone" } },
          cycleDraws: 0,
        },
      }),
      CATALOG,
      0
    )
    expect(cards.find((c) => c.slug === "abby")?.frontImageId).toBe("img-1")
  })

  test("a null catalog still renders unlocked girls from the save", () => {
    const cards = deriveRosterView(
      base({
        gacha: { girls: { abby: { stars: 0, dupeProgress: 0, images: ["img-1"] } }, cycleDraws: 0 },
      }),
      null,
      0
    )
    const abby = cards.find((c) => c.slug === "abby")
    expect(abby?.locked).toBe(false)
    expect(abby?.pool).toEqual(["img-1"])
  })

  test("carries train economics + the read-only level/stage mirror for unlocked girls", () => {
    const cards = deriveRosterView(
      base({
        gacha: { girls: { abby: { stars: 0, dupeProgress: 0, images: [] } }, cycleDraws: 0 },
      }),
      CATALOG,
      0
    )
    const abby = cards.find((c) => c.slug === "abby")
    expect(abby?.rank).toBe(3)
    expect(abby?.level).toBe(4)
    expect(abby?.stage).toBe("Bonding")
    expect(abby?.trainCost).toBeGreaterThan(0)
  })
})
