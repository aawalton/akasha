import { describe, expect, test } from "bun:test"
import scratchState from "../__fixtures__/scratch-state.json"
import { parseIdleSave } from "../idle-save"
import { DORMANT, gs, ladderState } from "./__fixtures__/dormant-latch-fixtures"
import { maxTeam, normalizeGameState, withLatches } from "./accrual"
import { STAR_VALUE } from "./constants"
import { activeBloomPair, activeWeatherSlug, affinityBonus, apotheosisBonus, blessedSlug, boonBonus, constellationBonus, devotionFactor, echoBonus, extraHotMap, foundationBonus, harmonyBonus, legacyTiersBonus, medalBonus, perkBonus, resonanceBonus, rolesUnlocked, seatTiers } from "./dormant-bonus"
import { collectionBonus, starMultMap } from "./gacha/state"
import { computeRoleAwareTotalRate, totalRate } from "./rate"

describe("dormant-latch · DORMANCY (latches are one-way on legacyStars)", () => {
  test("the dormant-at-★13 set is exactly the 20 batch mechanics", () => {
    expect(DORMANT.length).toBe(20)
  })

  const LADDER = [
    0, 13, 15, 18, 21, 25, 29, 34, 41, 49, 59, 69, 79, 89, 99, 114, 129, 149, 174, 199, 249, 250,
  ]
  for (const stars of LADDER) {
    test(`legacyStars=${stars}: each latch === (stars >= gate)`, () => {
      const s = ladderState(stars)
      for (const { flag, stars: gate } of DORMANT) {
        expect(s[flag] === true).toBe(stars >= gate)
      }
    })
  }

  test("monotonic: a latched flag never un-latches when stars later read lower", () => {
    const persisted = gs({ teammates: [], legacyStars: 5, apotheosisUnlocked: true })
    expect(withLatches(persisted).apotheosisUnlocked).toBe(true)
  })
})

describe("dormant-latch · RATE UNCHANGED (byte-identical when dormant)", () => {
  const dormant = ladderState(13)

  test("each of the 20 dormant factors contributes its identity element", () => {
    expect(medalBonus(dormant)).toBe(0)
    expect(resonanceBonus(dormant)).toBe(0)
    expect(perkBonus(dormant)).toBe(0)
    expect(boonBonus(dormant)).toBe(0)
    expect(constellationBonus(dormant)).toBe(0)
    expect(legacyTiersBonus(dormant)).toBe(0)
    expect(harmonyBonus(dormant)).toBe(0)
    expect(echoBonus(dormant)).toBe(0)
    expect(foundationBonus(dormant)).toBe(0)
    expect(apotheosisBonus(dormant)).toBe(0)
    expect(devotionFactor(dormant)).toBe(1)
    expect(blessedSlug(dormant)).toBe(null)
    expect(Object.keys(extraHotMap(dormant)).length).toBe(0)
    expect(activeBloomPair(dormant)).toBe(null)
    expect(seatTiers(dormant)).toEqual({ mastery: true, grand: false, lock: false })
    expect(dormant.overdriveActive === true).toBe(false)
    expect(dormant.eclipseActive === true).toBe(false)
    expect(dormant.cohesionMult ?? 0).toBe(0)
    expect(maxTeam(dormant)).toBe(4)
    expect(collectionBonus(dormant)).toBe(0)
    expect(Object.keys(starMultMap(dormant)).length).toBe(0)
  })

  test("totalRate === base × (1+legacyMult) × (1+affinity) when all 20 are dormant", () => {
    const base = computeRoleAwareTotalRate(
      dormant.activeTeam ?? [],
      dormant.teammates,
      dormant.synergyMatrix ?? {},
      rolesUnlocked(dormant),
      activeWeatherSlug(dormant),
      activeBloomPair(dormant),
      extraHotMap(dormant),
      dormant.eclipseActive === true
    )
    const legacyMult = (dormant.legacyStars ?? 0) * STAR_VALUE
    const aff = affinityBonus(
      dormant.activeTeam ?? [],
      dormant.teammates,
      dormant.affinityUnlocked === true,
      seatTiers(dormant)
    )
    expect(totalRate(dormant)).toBe(base * (1 + legacyMult) * (1 + aff))
  })

  test("live fixture (legacyStars=20): every gate above 20 is dormant ⇒ identity", () => {
    const live = normalizeGameState(parseIdleSave(scratchState))
    for (const { flag, stars: gate } of DORMANT) {
      if (gate > 20) expect(live[flag] === true).toBe(false)
    }
    expect(medalBonus(live)).toBe(0)
    expect(constellationBonus(live)).toBe(0)
    expect(legacyTiersBonus(live)).toBe(0)
    expect(harmonyBonus(live)).toBe(0)
    expect(echoBonus(live)).toBe(0)
    expect(foundationBonus(live)).toBe(0)
    expect(apotheosisBonus(live)).toBe(0)
    expect(collectionBonus(live)).toBe(0)
    expect(Object.keys(starMultMap(live)).length).toBe(0)
  })

  test("live fixture: totalRate === independently-composed rate (no dormant leak)", () => {
    const live = normalizeGameState(parseIdleSave(scratchState))
    const base = computeRoleAwareTotalRate(
      live.activeTeam ?? [],
      live.teammates,
      live.synergyMatrix ?? {},
      rolesUnlocked(live),
      activeWeatherSlug(live),
      activeBloomPair(live),
      extraHotMap(live),
      live.eclipseActive === true
    )
    const legacyMult = (live.legacyStars ?? 0) * STAR_VALUE
    const aff = affinityBonus(
      live.activeTeam ?? [],
      live.teammates,
      live.affinityUnlocked === true,
      seatTiers(live)
    )
    expect(totalRate(live)).toBe(base * (1 + legacyMult) * (1 + aff))
  })
})
