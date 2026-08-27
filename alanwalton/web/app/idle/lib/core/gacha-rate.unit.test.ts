import { describe, expect, test } from "bun:test"
import { COLLECTION_PER, STAR_PER } from "./constants"
import { collectionBonus, starMultMap } from "./gacha/state"
import { totalRate } from "./rate"
import { type GachaGirl, type GachaState, type GameState, type Teammate } from "./types"

function tm(over: Partial<Teammate> & { slug: string }): Teammate {
  return {
    name: over.slug,
    color: "#fff",
    portrait: "p",
    flavor: "f",
    cost: 0,
    rate: 1,
    rank: 1,
    level: null,
    stage: "s",
    ...over,
  }
}

const TEST_AFFINITY: Record<string, "lead" | "support" | "anchor"> = {
  aura: "lead",
  abby: "support",
  aelwyn: "anchor",
  ali: "support",
  aine: "lead",
  amy: "anchor",
}
const TEST_TEAMMATES: readonly Teammate[] = Object.keys(TEST_AFFINITY).map((slug) =>
  tm({ slug, rate: 10 })
)

function rosterState(slugs: readonly string[]): GachaState {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

function gs(over: Partial<GameState>): GameState {
  const base: GameState = {
    resource: 0,
    teammates: [],
    lastTickAt: 0,
    gacha: rosterState((over.teammates ?? []).map((t) => t.slug)),
  }
  return { ...base, ...over }
}

describe("gacha-rate · empty ⇒ identity, populated ⇒ real work", () => {
  test("empty gacha sub-state is identity (no leak vs. absent)", () => {
    const empty = gs({ teammates: TEST_TEAMMATES, gacha: { girls: {}, cycleDraws: 0 } })
    expect(collectionBonus(empty)).toBe(0)
    expect(Object.keys(starMultMap(empty)).length).toBe(0)
    const zeroed = gs({
      teammates: TEST_TEAMMATES,
      gacha: { girls: { aura: { stars: 0, dupeProgress: 3, images: [] } }, cycleDraws: 7 },
    })
    expect(collectionBonus(zeroed)).toBe(0)
    expect(Object.keys(starMultMap(zeroed)).length).toBe(0)
  })

  test("collectionBonus: Σ unique images × COLLECTION_PER (global lever)", () => {
    const s = gs({
      teammates: TEST_TEAMMATES,
      gacha: {
        girls: {
          aura: { stars: 0, dupeProgress: 0, images: ["i1", "i2"] },
          abby: { stars: 0, dupeProgress: 0, images: ["i3"] },
        },
        cycleDraws: 0,
      },
    })
    expect(collectionBonus(s)).toBeCloseTo(3 * COLLECTION_PER, 12)
  })

  test("starMultMap: only stars>0 girls appear, ×(1 + stars×STAR_PER) (per-girl lever)", () => {
    const s = gs({
      teammates: TEST_TEAMMATES,
      gacha: {
        girls: {
          aura: { stars: 3, dupeProgress: 0, images: [] },
          abby: { stars: 0, dupeProgress: 0, images: [] },
        },
        cycleDraws: 0,
      },
    })
    const map = starMultMap(s)
    expect(map.aura ?? 0).toBeCloseTo(1 + 3 * STAR_PER, 12)
    expect("abby" in map).toBe(false)
  })

  test("stars boost ONLY the owning girl's output, via totalRate", () => {
    const teammates = TEST_TEAMMATES.map((t) => tm({ ...t, affinity: TEST_AFFINITY[t.slug] }))
    const baseState = gs({ teammates, activeTeam: ["aura", "aelwyn", "abby"] })
    const starred = gs({
      ...baseState,
      gacha: {
        girls: { ...baseState.gacha.girls, aura: { stars: 5, dupeProgress: 0, images: [] } },
        cycleDraws: baseState.gacha.cycleDraws,
      },
    })
    expect(totalRate(starred)).toBeGreaterThan(totalRate(baseState))
  })
})
