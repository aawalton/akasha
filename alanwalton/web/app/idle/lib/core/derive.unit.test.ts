import { describe, expect, test } from "bun:test"
import {
  AFFINITY_SEATS,
  DERIVED_RATE_MAX,
  DERIVED_RATE_MIN,
  SYNERGY_NEG_MAX,
  SYNERGY_NEG_MIN,
  SYNERGY_POS_MAX,
  SYNERGY_POS_MIN,
} from "./constants"
import {
  applyDerivedMechanics,
  deriveAffinity,
  deriveBaseRate,
  deriveMechanics,
  hashContent,
  pairSynergyFromHashes,
} from "./derive"
import type { GameState, Teammate } from "./types"

const CONTENTS = Array.from({ length: 200 }, (_, i) => `content-${i}`)

describe("derive · determinism & independence", () => {
  test("hashContent is deterministic and content-sensitive", () => {
    expect(hashContent("abc")).toBe(hashContent("abc"))
    expect(hashContent("abc")).not.toBe(hashContent("abd"))
  })

  test("same content → same values; changed content → different values", () => {
    const p = CONTENTS[0] ?? ""
    const edited = `${p}\nShe changed.`
    expect(deriveBaseRate(p)).toBe(deriveBaseRate(p))
    expect(deriveAffinity(p)).toBe(deriveAffinity(p))
    expect(hashContent(edited)).not.toBe(hashContent(p))
  })

  test("per-mechanic sub-seeds are independent: rate and affinity do not co-vary trivially", () => {
    const byRate = new Map<number, Set<string>>()
    for (const p of CONTENTS) {
      const r = deriveBaseRate(p)
      const set = byRate.get(r) ?? new Set<string>()
      set.add(deriveAffinity(p))
      byRate.set(r, set)
    }
    expect([...byRate.values()].some((seats) => seats.size > 1)).toBe(true)
  })
})

describe("derive · distributions", () => {
  test("base rate lands in [DERIVED_RATE_MIN, DERIVED_RATE_MAX] in tenths", () => {
    for (const p of CONTENTS) {
      const r = deriveBaseRate(p)
      expect(r).toBeGreaterThanOrEqual(DERIVED_RATE_MIN)
      expect(r).toBeLessThanOrEqual(DERIVED_RATE_MAX)
      expect(Math.round(r * 10)).toBeCloseTo(r * 10, 9)
    }
    expect(new Set(CONTENTS.map(deriveBaseRate)).size).toBeGreaterThan(3)
  })

  test("affinity is one of the three seats and all three occur", () => {
    const seen = new Set(CONTENTS.map(deriveAffinity))
    for (const seat of seen) expect(AFFINITY_SEATS).toContain(seat)
    expect(seen.size).toBe(3)
  })

  test("pair synergy is symmetric and lands in the negative tail or positive band", () => {
    const hashes = CONTENTS.map(hashContent)
    let negatives = 0
    let pairs = 0
    for (let i = 0; i < 30; i++) {
      for (let j = i + 1; j < 30; j++) {
        const a = hashes[i] ?? 0
        const b = hashes[j] ?? 0
        const s = pairSynergyFromHashes(a, b)
        expect(pairSynergyFromHashes(b, a)).toBe(s)
        const inNeg = s >= SYNERGY_NEG_MIN && s <= SYNERGY_NEG_MAX
        const inPos = s >= SYNERGY_POS_MIN && s <= SYNERGY_POS_MAX
        expect(inNeg || inPos).toBe(true)
        if (inNeg) negatives++
        pairs++
      }
    }
    expect(negatives).toBeGreaterThan(0)
    expect(negatives / pairs).toBeLessThan(0.35)
  })
})

describe("derive · deriveMechanics (the roster bundle)", () => {
  const personas = [{ slug: "aura" }, { slug: "abby" }, { slug: "mari" }]
  const d = deriveMechanics(personas)

  test("rosterSlugs is a permutation of the input slugs (weather order)", () => {
    expect([...d.rosterSlugs].sort()).toEqual(["abby", "aura", "mari"])
  })

  test("synergyMatrix covers every unordered pair with sorted keys", () => {
    expect(Object.keys(d.synergyMatrix).sort()).toEqual(["abby+aura", "abby+mari", "aura+mari"])
  })

  test("every persona gets a rate and an affinity", () => {
    for (const p of personas) {
      expect(d.rateBySlug[p.slug]).toBeGreaterThanOrEqual(DERIVED_RATE_MIN)
      expect(AFFINITY_SEATS).toContain(d.affinityBySlug[p.slug] ?? "lead")
    }
  })

  test("renaming ONE persona moves her pairs and leaves the others' alone", () => {
    const edited = deriveMechanics([{ slug: "aura-two" }, { slug: "abby" }, { slug: "mari" }])
    expect(edited.synergyMatrix["abby+mari"]).toBe(d.synergyMatrix["abby+mari"] ?? Number.NaN)
    expect(edited.synergyMatrix["abby+aura"]).toBeUndefined()
  })
})

describe("derive · applyDerivedMechanics (pure save merge)", () => {
  const tm = (slug: string, rate: number): Teammate => ({
    slug,
    name: slug,
    color: "#fff",
    portrait: "p",
    flavor: "f",
    cost: 0,
    rate,
    rank: 3,
    level: null,
    stage: "s",
  })
  const s: GameState = {
    resource: 42,
    teammates: [tm("aura", 1), tm("ghost", 5)],
    lastTickAt: 7,
    synergyMatrix: { "aura+ghost": 0.9 },
    gacha: { girls: { aura: { stars: 1, dupeProgress: 2, images: ["i"] } }, cycleDraws: 3 },
  }
  const d = deriveMechanics([{ slug: "aura" }, { slug: "abby" }])
  const next = applyDerivedMechanics(s, d)

  test("teammates in the roster get refreshed rate + affinity; ranks untouched", () => {
    const aura = next.teammates.find((t) => t.slug === "aura")
    expect(aura?.rate).toBe(d.rateBySlug.aura ?? Number.NaN)
    expect(aura?.affinity).toBe(d.affinityBySlug.aura)
    expect(aura?.rank).toBe(3)
  })

  test("a teammate absent from the live roster keeps her last-known values", () => {
    const ghost = next.teammates.find((t) => t.slug === "ghost")
    expect(ghost?.rate).toBe(5)
  })

  test("synergyMatrix is replaced and mechanicsRoster stamped; everything else preserved", () => {
    expect(next.synergyMatrix).toEqual(d.synergyMatrix)
    expect(next.mechanicsRoster).toEqual(d.rosterSlugs)
    expect(next.resource).toBe(42)
    expect(next.gacha).toEqual(s.gacha)
  })
})
