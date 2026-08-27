import { describe, expect, test } from "bun:test"
import {
  gs,
  rosterState,
  TEST_SLUGS,
  TEST_SYNERGY,
  TEST_TEAMMATES,
  tm,
} from "./__fixtures__/dormant-latch-fixtures"
import { bankAccrual, cohesionRamp, eclipseActiveAt, maxTeam, overdriveActiveAt } from "./accrual"
import { AFTERGLOW_BONUS, AFTERGLOW_MIN_GAP_MS } from "./constants"
import { affinityBonus, apotheosisBonus, blessedSlug, boonBonus, constellationBonus, devotionFactor, echoBonus, eternityAvailable, extraHotMap, foundationBonus, harmonyBonus, legacyTiersBonus, medalBonus, perkBonus, resonanceBonus } from "./dormant-bonus"
import { computeRoleAwareTotalRate } from "./rate"
import { type Teammate } from "./types"

describe("dormant-latch · UNLOCKED MATH (real work when the latch flips)", () => {
  const roster: Teammate[] = [
    tm({ slug: "aura", affinity: "lead", rank: 65 }),
    tm({ slug: "aine", affinity: "support", rank: 35 }),
    tm({ slug: "amy", affinity: "anchor", rank: 50 }),
  ]
  const team = ["aura", "aine", "amy"]
  const seats = (mastery: boolean, grand: boolean, lock: boolean, locked?: string) => {
    const r = locked
      ? roster.map((t) => (t.slug === locked ? tm({ ...t, locked: true }) : t))
      : roster
    return affinityBonus(team, r, true, { mastery, grand, lock })
  }

  test("1·2·seat ladder: affinity 0.15 → mastery 0.30 → grand 0.33 → lock 0.35", () => {
    expect(seats(false, false, false)).toBeCloseTo(0.15, 12)
    expect(seats(true, false, false)).toBeCloseTo(0.3, 12)
    expect(seats(true, true, false)).toBeCloseTo(0.33, 12)
    expect(seats(true, true, true, "aura")).toBeCloseTo(0.35, 12)
  })

  test("3·bloom: featured pair's positive edge runs hot (×2)", () => {
    const pair: Teammate[] = [tm({ slug: "abby", rank: 1 }), tm({ slug: "ali", rank: 1 })]
    const t = ["abby", "ali"]
    const cold = computeRoleAwareTotalRate(t, pair, TEST_SYNERGY, true, null, null, {}, false)
    const hot = computeRoleAwareTotalRate(t, pair, TEST_SYNERGY, true, null, "abby+ali", {}, false)
    expect(hot).toBeGreaterThan(cold)
  })

  test("4·medals: Σ floor(rank/25) × 0.01 (2+1+2 = 5 ⇒ +0.05)", () => {
    expect(medalBonus(gs({ teammates: roster, medalsUnlocked: true }))).toBeCloseTo(0.05, 12)
  })

  test("5·resonance: all-in-seat ⇒ +0.20; broken order ⇒ 0", () => {
    expect(
      resonanceBonus(gs({ activeTeam: team, teammates: roster, resonanceUnlocked: true }))
    ).toBeCloseTo(0.2, 12)
    expect(
      resonanceBonus(
        gs({ activeTeam: ["aine", "aura", "amy"], teammates: roster, resonanceUnlocked: true })
      )
    ).toBe(0)
  })

  test("6·afterglow: a ≥30-min gap multiplies banked accrual by 1.5", () => {
    const seed = gs({
      resource: 0,
      lastTickAt: 0,
      teammates: roster,
      legacyStars: 0,
      activeTeam: team,
    })
    const gap = AFTERGLOW_MIN_GAP_MS
    const withGlow = bankAccrual(gs({ ...seed, afterglowUnlocked: true }), gap)
    const without = bankAccrual(gs({ ...seed, afterglowUnlocked: false }), gap)
    expect(withGlow.resource).toBeCloseTo(without.resource * (1 + AFTERGLOW_BONUS), 6)
  })

  test("7·cohesion: +0.1 per hour the lineup holds, capped at 0.30", () => {
    const now = 100_000_000
    expect(cohesionRamp(now - 2 * 3_600_000, now)).toBeCloseTo(0.2, 12)
    expect(cohesionRamp(now - 10 * 3_600_000, now)).toBeCloseTo(0.3, 12)
  })

  test("8·fifthSeat: lineup cap 3 → 4 → 5", () => {
    expect(maxTeam(gs({ teammates: [] }))).toBe(3)
    expect(maxTeam(gs({ teammates: [], fourthSeatUnlocked: true }))).toBe(4)
    expect(maxTeam(gs({ teammates: [], fifthSeatUnlocked: true }))).toBe(5)
  })

  test("9·perks: Σ chosen perk mults (surge+legacy ⇒ +0.17)", () => {
    expect(perkBonus(gs({ perksUnlocked: true, perks: ["surge", "legacy"] }))).toBeCloseTo(0.17, 12)
  })

  test("10·boons: Σ chosen boon mults (ember+tide ⇒ +0.12)", () => {
    expect(boonBonus(gs({ boonsUnlocked: true, boons: ["ember", "tide"] }))).toBeCloseTo(0.12, 12)
  })

  test("11·constellation: all unlocked ⇒ +0.30; any gap ⇒ 0", () => {
    const full = TEST_TEAMMATES.map((t) => tm({ ...t }))
    expect(constellationBonus(gs({ teammates: full, constellationUnlocked: true }))).toBeCloseTo(
      0.3,
      12
    )
    const withGap = gs({
      teammates: full,
      gacha: rosterState(full.filter((t) => t.slug !== "amy").map((t) => t.slug)),
      constellationUnlocked: true,
    })
    expect(constellationBonus(withGap)).toBe(0)
  })

  test("12·legacyTiers: floor(stars/25) × 0.05 (137★ ⇒ +0.25)", () => {
    expect(legacyTiersBonus(gs({ legacyTiersUnlocked: true, legacyStars: 137 }))).toBeCloseTo(
      0.25,
      12
    )
  })

  test("13·overdrive: surge window is on early in each 900s period, off later", () => {
    expect(overdriveActiveAt(0)).toBe(true)
    expect(overdriveActiveAt(200_000)).toBe(false)
  })

  test("14·eclipse: window flag + friction neutralized when active", () => {
    expect(eclipseActiveAt(0)).toBe(true)
    expect(eclipseActiveAt(300_000)).toBe(false)
    const pair: Teammate[] = [tm({ slug: "aine", rank: 1 }), tm({ slug: "aura", rank: 1 })]
    const t = ["aine", "aura"]
    const frictionOn = computeRoleAwareTotalRate(t, pair, TEST_SYNERGY, true, null, null, {}, false)
    const eclipsed = computeRoleAwareTotalRate(t, pair, TEST_SYNERGY, true, null, null, {}, true)
    expect(eclipsed).toBeGreaterThan(frictionOn)
  })

  test("15·harmony: graded by in-seat count (3 in-seat ⇒ +0.25; 0 ⇒ 0)", () => {
    expect(
      harmonyBonus(gs({ activeTeam: team, teammates: roster, harmonyUnlocked: true }))
    ).toBeCloseTo(0.25, 12)
    expect(
      harmonyBonus(
        gs({ activeTeam: ["aine", "amy", "aura"], teammates: roster, harmonyUnlocked: true })
      )
    ).toBe(0)
  })

  test("16·echoes: echoMult passthrough (+0.09)", () => {
    expect(echoBonus(gs({ echoesUnlocked: true, echoMult: 0.09 }))).toBeCloseTo(0.09, 12)
  })

  test("17·devotion: ×(1 + min(streak×0.02, 0.2)) (streak 7 ⇒ 1.14, 20 ⇒ cap 1.2)", () => {
    expect(devotionFactor(gs({ devotionUnlocked: true, devotionStreak: 7 }))).toBeCloseTo(1.14, 12)
    expect(devotionFactor(gs({ devotionUnlocked: true, devotionStreak: 20 }))).toBeCloseTo(1.2, 12)
  })

  test("17·18·extraHotMap: devotion (aura ×1.10) + blessing (legacyStars%6 sister ×1.4)", () => {
    const m = extraHotMap(
      gs({
        devotionUnlocked: true,
        devotionSlug: "aura",
        devotionStreak: 5,
        blessingUnlocked: true,
        legacyStars: 175,
        mechanicsRoster: TEST_SLUGS,
      })
    )
    expect(m.aura ?? 0).toBeCloseTo(1.1, 12)
    expect(m.abby ?? 0).toBeCloseTo(1.4, 12)
  })

  test("18·blessing: deterministic blessed girl from legacyStars; locked ⇒ null", () => {
    expect(
      blessedSlug(gs({ blessingUnlocked: true, legacyStars: 175, mechanicsRoster: TEST_SLUGS }))
    ).toBe("abby")
    expect(
      blessedSlug(gs({ blessingUnlocked: false, legacyStars: 175, mechanicsRoster: TEST_SLUGS }))
    ).toBe(null)
    expect(blessedSlug(gs({ blessingUnlocked: true, legacyStars: 175 }))).toBe(null)
  })

  test("19·foundation: +0.04 per OOM of lifetimeBanked, capped at +0.40", () => {
    expect(
      foundationBonus(gs({ foundationUnlocked: true, lifetimeBanked: 1_000_000 }))
    ).toBeCloseTo(0.24, 12)
    expect(foundationBonus(gs({ foundationUnlocked: true, lifetimeBanked: 1e12 }))).toBeCloseTo(
      0.4,
      12
    )
  })

  test("20·apotheosis: +0.5 per Eternity point; pool guard via starsConverted", () => {
    expect(apotheosisBonus(gs({ apotheosisUnlocked: true, eternityPoints: 3 }))).toBeCloseTo(
      1.5,
      12
    )
    expect(
      eternityAvailable(gs({ apotheosisUnlocked: true, legacyStars: 260, starsConverted: 0 }))
    ).toBe(5)
    expect(
      eternityAvailable(gs({ apotheosisUnlocked: true, legacyStars: 260, starsConverted: 250 }))
    ).toBe(0)
  })
})
