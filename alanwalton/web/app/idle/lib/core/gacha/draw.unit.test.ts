import { describe, expect, test } from "bun:test"
import { DRAW_COST_BASE, STAR_THRESHOLDS } from "../constants"
import type { GachaGirl, GachaState, GameState, Teammate } from "../types"
import { applyDraw, colorForSlug, type DrawContext, type DrawGirl } from "./draw"
import { drawCost, isUnlocked } from "./state"

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

function girl(slug: string): DrawGirl {
  return {
    slug,
    name: slug,
    level: 1,
    stage: "Initiating",
    cover: `cover/${slug}`,
    rate: 11,
    affinity: "support",
  }
}

function ctx(over: Partial<DrawContext>): DrawContext {
  return { roster: [girl("aura")], pools: {}, seed: 12345, now: 0, ...over }
}

describe("gacha · draw cost (motes, escalates within cycle, resets on ascend)", () => {
  test("cost follows pure powers of ten (100 × 10^cycleDraws)", () => {
    expect(drawCost(gs({}))).toBe(DRAW_COST_BASE)
    for (let n = 0; n <= 7; n++) {
      const s = gs({ gacha: { girls: {}, cycleDraws: n } })
      expect(drawCost(s)).toBe(DRAW_COST_BASE * 10 ** n)
    }
  })

  test("insufficient motes ⇒ no-op (no spend, no state change)", () => {
    const s = gs({ resource: 0, teammates: [] })
    const r = applyDraw(s, ctx({}))
    expect(r.outcome.applied).toBe(false)
    expect(r.outcome.reason).toBe("insufficient")
    expect(r.state).toBe(s)
    expect(r.reveal).toBe(null)
  })

  test("a draw spends exactly the current cost and increments cycleDraws", () => {
    const s = gs({ resource: 10_000, teammates: [] })
    const r = applyDraw(s, ctx({}))
    expect(r.outcome.applied).toBe(true)
    expect(r.state.resource).toBe(10_000 - DRAW_COST_BASE)
    expect(r.state.gacha?.cycleDraws).toBe(1)
  })
})

describe("gacha · image axis is curated (NO draw is ever wasted)", () => {
  test("a new variant is awarded when one is unowned", () => {
    const s = gs({ resource: 10_000 })
    const r = applyDraw(s, ctx({ roster: [girl("aura")], pools: { aura: ["a", "b"] } }))
    expect(r.reveal?.isNewImage).toBe(true)
    expect(r.state.gacha?.girls.aura?.images.length).toBe(1)
  })

  test("when every variant is already owned, the draw fuels tiering (a dupe)", () => {
    const s = gs({
      resource: 10_000,
      gacha: { girls: { aura: { stars: 0, dupeProgress: 0, images: ["a"] } }, cycleDraws: 0 },
    })
    const r = applyDraw(s, ctx({ roster: [girl("aura")], pools: { aura: ["a"] } }))
    expect(r.reveal?.isNewImage).toBe(false)
    expect(r.state.gacha?.girls.aura?.images.length).toBe(1)
    expect(r.state.gacha?.girls.aura?.dupeProgress).toBe(1)
  })

  test("an empty pool still advances tiering (never a nothing-pull)", () => {
    const s = gs({ resource: 10_000 })
    const r = applyDraw(s, ctx({ roster: [girl("aura")], pools: {} }))
    expect(r.outcome.applied).toBe(true)
    expect(r.reveal?.isNewImage).toBe(false)
    expect(r.state.gacha?.girls.aura?.dupeProgress).toBe(1)
  })

  test("empty-pool cover fallback yields a BARE image id (no /api/image/ double-prefix)", () => {
    const s = gs({ resource: 10_000 })
    const covered: DrawGirl = { ...girl("aura"), cover: "/api/image/persona-aura" }
    const r = applyDraw(s, ctx({ roster: [covered], pools: {} }))
    expect(r.reveal?.isNewImage).toBe(false)
    expect(r.reveal?.image).toBe("persona-aura")
    expect(r.reveal?.image.startsWith("/api/image/")).toBe(false)
  })

  test("crossing the first star threshold raises a star and consumes fuel", () => {
    const need = STAR_THRESHOLDS[0] ?? 5
    const s = gs({
      resource: 10_000,
      gacha: {
        girls: { aura: { stars: 0, dupeProgress: need - 1, images: ["a"] } },
        cycleDraws: 0,
      },
    })
    const r = applyDraw(s, ctx({ roster: [girl("aura")], pools: { aura: ["a"] } }))
    expect(r.reveal?.starUp).toBe(true)
    expect(r.state.gacha?.girls.aura?.stars).toBe(1)
    expect(r.state.gacha?.girls.aura?.dupeProgress).toBe(0)
  })
})

describe("gacha · first-draw materialization", () => {
  test("a seed persona (existing teammate) is unlocked by entering the roster, stats preserved", () => {
    const abby: Teammate = {
      slug: "abby",
      name: "Abby",
      color: "var(--purple)",
      portrait: "p",
      flavor: "f",
      cost: 50,
      rate: 3,
      rank: 1,
      level: 1,
      stage: "Initiating",
    }
    const s = gs({ resource: 10_000, teammates: [abby], gacha: rosterState([]) })
    expect(isUnlocked(s, "abby")).toBe(false)
    const r = applyDraw(s, ctx({ roster: [girl("abby")], pools: {} }))
    const got = r.state.teammates.find((t) => t.slug === "abby")
    expect(isUnlocked(r.state, "abby")).toBe(true)
    expect(r.state.gacha.girls.abby).toBeDefined()
    expect(got?.rate).toBe(3)
    expect(r.reveal?.isNewGirl).toBe(true)
  })

  test("a girl with no stats entry is materialized carrying her derived values and unlocked", () => {
    const s = gs({ resource: 10_000, teammates: [] })
    const r = applyDraw(s, ctx({ roster: [girl("eppie")], pools: {} }))
    const got = r.state.teammates.find((t) => t.slug === "eppie")
    expect(got).toBeDefined()
    expect(isUnlocked(r.state, "eppie")).toBe(true)
    expect(got?.rank).toBe(0)
    expect(got?.rate).toBe(11)
    expect(got?.affinity).toBe("support")
    expect(got?.color).toBe(colorForSlug("eppie"))
  })

  test("a second draw of the same girl does not duplicate her teammate entry", () => {
    const s = gs({ resource: 100_000, teammates: [] })
    const first = applyDraw(s, ctx({ roster: [girl("eppie")], pools: { eppie: ["a", "b"] } }))
    const second = applyDraw(
      first.state,
      ctx({ roster: [girl("eppie")], pools: { eppie: ["a", "b"] } })
    )
    expect(second.state.teammates.filter((t) => t.slug === "eppie").length).toBe(1)
    expect(second.reveal?.isNewGirl).toBe(false)
  })
})

describe("gacha · determinism & girl axis", () => {
  test("identical seed ⇒ identical result", () => {
    const s = gs({ resource: 10_000 })
    const c = ctx({
      roster: [girl("aura"), girl("abby")],
      pools: { aura: ["a"], abby: ["b"] },
      seed: 999,
    })
    const r1 = applyDraw(s, c)
    const r2 = applyDraw(s, c)
    expect(Object.keys(r1.state.gacha?.girls ?? {})).toEqual(
      Object.keys(r2.state.gacha?.girls ?? {})
    )
  })

  test("empty roster ⇒ no-op", () => {
    const r = applyDraw(gs({ resource: 10_000 }), ctx({ roster: [] }))
    expect(r.outcome.applied).toBe(false)
    expect(r.outcome.reason).toBe("no-roster")
  })
})
