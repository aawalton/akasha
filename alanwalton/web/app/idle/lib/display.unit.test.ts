import { describe, expect, test } from "bun:test"
import { OVERDRIVE_MULT, STAR_VALUE } from "./core/constants"
import { type GachaGirl, type GachaState, type GameState, type Teammate } from "./core/types"
import {
  deriveApotheosisView,
  deriveAscensionView,
  deriveIndicatorChips,
  deriveLegacyPerksView,
} from "./display"

function mkTeammate(over: Partial<Teammate> & { slug: string; name: string }): Teammate {
  return {
    color: "var(--blue)",
    portrait: "",
    flavor: "",
    cost: 0,
    rate: 1,
    rank: 1,
    level: 1,
    stage: "Initiating",
    ...over,
  }
}

const ROSTER: readonly Teammate[] = [
  mkTeammate({ slug: "aura", name: "Aura" }),
  mkTeammate({ slug: "abby", name: "Abby" }),
  mkTeammate({ slug: "aine", name: "Aine" }),
]

function rosterState(slugs: readonly string[]): GachaState {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

function base(over: Partial<GameState> = {}): GameState {
  const teammates = over.teammates ?? ROSTER
  return {
    resource: 0,
    teammates,
    lastTickAt: 0,
    gacha: rosterState(teammates.map((t) => t.slug)),
    ...over,
  }
}

const CHAIN_KEYS = [
  "synergy",
  "legacy",
  "affinity",
  "medals",
  "resonance",
  "cohesion",
  "perks",
  "boons",
  "constellation",
  "tiers",
  "overdrive",
  "harmony",
  "echoes",
  "foundation",
  "apotheosis",
  "collection",
] as const

describe("deriveIndicatorChips (E) — whole-team multiplier chain", () => {
  test("always returns the full 16-factor chain in fixed engine order", () => {
    expect(deriveIndicatorChips(base()).map((c) => c.key)).toEqual([...CHAIN_KEYS])
  })

  test("every factor is dormant (×1.00, not live) at the bare state", () => {
    for (const c of deriveIndicatorChips(base())) {
      expect(c.mult).toBe(1)
      expect(c.live).toBe(false)
    }
  })

  test("legacy factor scales by STAR_VALUE per star (1 + stars×STAR_VALUE)", () => {
    const legacy = deriveIndicatorChips(base({ legacyStars: 20 })).find((c) => c.key === "legacy")
    expect(legacy).toEqual({
      key: "legacy",
      name: "Legacy",
      mult: 1 + 20 * STAR_VALUE,
      live: true,
      detail: "20★",
    })
  })

  test("overdrive factor is a direct ×OVERDRIVE_MULT when active, ×1 when not", () => {
    const on = deriveIndicatorChips(base({ overdriveUnlocked: true, overdriveActive: true })).find(
      (c) => c.key === "overdrive"
    )
    expect(on).toEqual({ key: "overdrive", name: "Overdrive", mult: OVERDRIVE_MULT, live: true })

    const off = deriveIndicatorChips(
      base({ overdriveUnlocked: true, overdriveActive: false })
    ).find((c) => c.key === "overdrive")
    expect(off?.mult).toBe(1)
    expect(off?.live).toBe(false)
  })

  test("medals factor folds the engine medal bonus into a ×mult", () => {
    const state = base({
      medalsUnlocked: true,
      teammates: [mkTeammate({ slug: "aura", name: "Aura", rank: 50 })],
    })
    const medals = deriveIndicatorChips(state).find((c) => c.key === "medals")
    expect(medals?.name).toBe("Medals")
    expect(medals?.mult).toBeCloseTo(1.02, 10)
    expect(medals?.live).toBe(true)
  })

  test("apotheosis factor folds the eternity bonus into a ×mult", () => {
    const a = deriveIndicatorChips(base({ apotheosisUnlocked: true, eternityPoints: 3 })).find(
      (c) => c.key === "apotheosis"
    )
    expect(a).toEqual({ key: "apotheosis", name: "Apotheosis", mult: 2.5, live: true })
  })

  test("excludes per-girl and non-chain factors (devotion, blessing, afterglow, eclipse)", () => {
    const keys = deriveIndicatorChips(
      base({
        devotionUnlocked: true,
        blessingUnlocked: true,
        afterglowUnlocked: true,
        eclipseUnlocked: true,
      })
    ).map((c) => c.key)
    expect(keys).not.toContain("devotion")
    expect(keys).not.toContain("blessing")
    expect(keys).not.toContain("afterglow")
    expect(keys).not.toContain("eclipse")
  })
})

function rosterWithRanks(rankEach: number): readonly Teammate[] {
  return [
    mkTeammate({ slug: "aura", name: "Aura", rank: rankEach }),
    mkTeammate({ slug: "abby", name: "Abby", rank: rankEach }),
    mkTeammate({ slug: "aine", name: "Aine", rank: rankEach }),
  ]
}

describe("deriveAscensionView (B)", () => {
  test("locked teaser while prestige is dormant, with rank progress", () => {
    const view = deriveAscensionView(base({ teammates: rosterWithRanks(10) }))
    expect(view).toEqual({
      locked: true,
      teaser: "Ascension unlocks at 100 total ranks",
      progress: "30 / 100 ranks",
    })
  })

  test("unlocked-but-too-soon shows stars, mult, and the slim threshold copy", () => {
    const view = deriveAscensionView(
      base({ teammates: rosterWithRanks(1), prestigeUnlocked: true, legacyStars: 20 })
    )
    expect(view).toEqual({
      locked: false,
      stars: "20 ★",
      mult: "+200% permanent output",
      ranksLabel: "3 total ranks",
      canAscend: false,
      trade: {
        kind: "too-soon",
        text: "Ascend at 100 ranks.",
      },
      boons: null,
    })
  })

  test("ready trade computes gain + gain%; boons surface when boonsUnlocked", () => {
    const view = deriveAscensionView(
      base({
        teammates: rosterWithRanks(50),
        prestigeUnlocked: true,
        legacyStars: 20,
        boonsUnlocked: true,
      })
    )
    if (view.locked) {
      throw new Error("expected unlocked view")
    }
    expect(view.canAscend).toBe(true)
    expect(view.trade).toEqual({ kind: "ready", gain: 3, gainPct: "+30%" })
    expect(view.boons).toEqual([
      { id: "ember", name: "Ember", pct: 6 },
      { id: "tide", name: "Tide", pct: 6 },
      { id: "bloom", name: "Bloom", pct: 6 },
    ])
  })
})

describe("deriveLegacyPerksView (G)", () => {
  test("returns null while perks are dormant", () => {
    expect(deriveLegacyPerksView(base())).toBeNull()
    expect(deriveLegacyPerksView(base({ legacyStars: 50 }))).toBeNull()
  })

  test("surfaces spendable points and per-perk cost/affordability", () => {
    const view = deriveLegacyPerksView(base({ perksUnlocked: true, legacyStars: 5 }))
    expect(view?.points).toBe(5)
    expect(view?.perks).toEqual([
      { id: "surge", name: "Surge", pct: 5, cost: 2, owned: false, affordable: true },
      { id: "devotion", name: "Devotion", pct: 8, cost: 3, owned: false, affordable: true },
      { id: "legacy", name: "Legacy", pct: 12, cost: 5, owned: false, affordable: true },
    ])
  })

  test("owned perks highlight and stop being affordable; points net of spend", () => {
    const view = deriveLegacyPerksView(
      base({ perksUnlocked: true, legacyStars: 5, perkPointsSpent: 2, perks: ["surge"] })
    )
    expect(view?.points).toBe(3)
    const byId = Object.fromEntries((view?.perks ?? []).map((p) => [p.id, p]))
    expect(byId.surge).toMatchObject({ owned: true, affordable: false })
    expect(byId.devotion).toMatchObject({ owned: false, affordable: true })
    expect(byId.legacy).toMatchObject({ owned: false, affordable: false })
  })
})

describe("deriveApotheosisView (H)", () => {
  test("returns null while apotheosis is dormant", () => {
    expect(deriveApotheosisView(base())).toBeNull()
    expect(deriveApotheosisView(base({ legacyStars: 250 }))).toBeNull()
  })

  test("zero-available shows the earn line and the bare button", () => {
    const view = deriveApotheosisView(
      base({ apotheosisUnlocked: true, legacyStars: 250, starsConverted: 250 })
    )
    expect(view).toEqual({
      eternity: "0 ⟡ · +0%",
      available: 0,
      line: "Earn 50★ beyond converted to gain the next Eternity point.",
      buttonLabel: "Ascend to Eternity",
    })
  })

  test("convertible pool drives the convert line, eternity bonus, and +N button", () => {
    const view = deriveApotheosisView(
      base({
        apotheosisUnlocked: true,
        legacyStars: 350,
        starsConverted: 250,
        eternityPoints: 3,
      })
    )
    expect(view).toEqual({
      eternity: "3 ⟡ · +150%",
      available: 2,
      line: "Convert 100★ → 2 Eternity.",
      buttonLabel: "Ascend to Eternity (+2 ⟡)",
    })
  })
})
