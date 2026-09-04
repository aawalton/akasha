import {
  AFFINITY_PER,
  AFFINITY_SEATS,
  APO_DIVISOR,
  APO_PER,
  BLESS_MULT,
  BOON_DEFS,
  CONSTELLATION_PER,
  DEV_CAP,
  DEV_PER,
  FOUND_CAP,
  FOUND_PER,
  GRAND_PER,
  GRAND_RANK_REQ,
  HARMONY_TIERS,
  MASTERY_PER,
  MASTERY_RANK_REQ,
  MEDAL_PER,
  MEDAL_STEP,
  PERK_DEFS,
  RESONANCE_PER,
  SEATLOCK_PER,
  TIER_PER,
  TIER_STEP,
} from "../idle-constants/idle-constants.module.code.ts"
import { isUnlocked } from "../idle-gacha-state/idle-gacha-state.module.code.ts"
import type { GameState, SeatTiers, Teammate } from "../idle-state/idle-state.module.code.ts"

export function rolesUnlocked(_s: GameState): boolean {
  return true
}

export function seatBonus(t: Teammate, tiers: SeatTiers): number {
  const rank = t.rank ?? 0
  if (tiers.lock && t.locked === true) return SEATLOCK_PER
  if (tiers.grand && rank >= GRAND_RANK_REQ) return GRAND_PER
  if (tiers.mastery && rank >= MASTERY_RANK_REQ) return MASTERY_PER
  return AFFINITY_PER
}

export function affinityBonus(
  team: readonly string[],
  teammates: readonly Teammate[],
  unlocked: boolean,
  tiers: SeatTiers
): number {
  if (!unlocked) return 0
  let bonus = 0
  for (let i = 0; i < team.length && i < AFFINITY_SEATS.length; i++) {
    const t = teammates.find((x) => x.slug === team[i])
    if (t !== undefined && t.affinity === AFFINITY_SEATS[i]) bonus += seatBonus(t, tiers)
  }
  return bonus
}

export function seatTiers(s: GameState): SeatTiers {
  return {
    mastery: s.masteryUnlocked === true,
    grand: s.grandmasteryUnlocked === true,
    lock: s.specializeUnlocked === true,
  }
}

export function activeBloomPair(s: GameState): string | null {
  return s.bloomUnlocked === true && s.bloom !== undefined ? s.bloom.pairKey : null
}

export function activeWeatherSlug(s: GameState): string | null {
  if (s.weatherUnlocked !== true) return null
  const cur = s.weather?.currentSlug
  return typeof cur === "string" ? cur : null
}

export function medalBonus(s: GameState): number {
  if (s.medalsUnlocked !== true) return 0
  let medals = 0
  for (const t of s.teammates)
    if (isUnlocked(s, t.slug)) medals += Math.floor((t.rank ?? 0) / MEDAL_STEP)
  return medals * MEDAL_PER
}

export function resonanceBonus(s: GameState): number {
  if (s.resonanceUnlocked !== true) return 0
  const team = s.activeTeam ?? []
  if (team.length < 2) return 0
  for (let i = 0; i < team.length && i < AFFINITY_SEATS.length; i++) {
    const t = s.teammates.find((x) => x.slug === team[i])
    if (t === undefined || t.affinity !== AFFINITY_SEATS[i]) return 0
  }
  return RESONANCE_PER
}

export function legacyPointsAvailable(s: GameState): number {
  if (s.perksUnlocked !== true) return 0
  return Math.max(0, (s.legacyStars ?? 0) - (s.perkPointsSpent ?? 0))
}
export function perkBonus(s: GameState): number {
  if (s.perksUnlocked !== true) return 0
  let mult = 0
  for (const id of s.perks ?? []) mult += PERK_DEFS[id]?.mult ?? 0
  return mult
}

export function boonBonus(s: GameState): number {
  if (s.boonsUnlocked !== true) return 0
  let mult = 0
  for (const id of s.boons ?? []) mult += BOON_DEFS[id]?.mult ?? 0
  return mult
}

export function constellationBonus(s: GameState): number {
  if (s.constellationUnlocked !== true) return 0
  return s.teammates.every((t) => isUnlocked(s, t.slug)) ? CONSTELLATION_PER : 0
}

export function legacyTiersBonus(s: GameState): number {
  if (s.legacyTiersUnlocked !== true) return 0
  return Math.floor((s.legacyStars ?? 0) / TIER_STEP) * TIER_PER
}

export function harmonyBonus(s: GameState): number {
  if (s.harmonyUnlocked !== true) return 0
  let inSeat = 0
  const team = s.activeTeam ?? []
  for (let i = 0; i < team.length && i < AFFINITY_SEATS.length; i++) {
    const t = s.teammates.find((x) => x.slug === team[i])
    if (t !== undefined && t.affinity === AFFINITY_SEATS[i]) inSeat++
  }
  return HARMONY_TIERS[Math.min(inSeat, HARMONY_TIERS.length - 1)] ?? 0
}

export function echoBonus(s: GameState): number {
  if (s.echoesUnlocked !== true) return 0
  return s.echoMult ?? 0
}

export function devotionFactor(s: GameState): number {
  if (s.devotionUnlocked !== true) return 1
  return 1 + Math.min((s.devotionStreak ?? 0) * DEV_PER, DEV_CAP)
}

export function blessedSlug(s: GameState): string | null {
  if (s.blessingUnlocked !== true) return null
  const roster = s.mechanicsRoster ?? []
  if (roster.length === 0) return null
  return roster[(s.legacyStars ?? 0) % roster.length] ?? null
}

export function extraHotMap(s: GameState): Record<string, number> {
  const map: Record<string, number> = {}
  if (s.devotionUnlocked === true && typeof s.devotionSlug === "string") {
    map[s.devotionSlug] = (map[s.devotionSlug] ?? 1) * devotionFactor(s)
  }
  const bless = blessedSlug(s)
  if (bless !== null) map[bless] = (map[bless] ?? 1) * BLESS_MULT
  return map
}

export function foundationBonus(s: GameState): number {
  if (s.foundationUnlocked !== true) return 0
  const mag = Math.floor(Math.log10(Math.max(1, s.lifetimeBanked ?? 0)))
  return Math.min(FOUND_CAP, mag * FOUND_PER)
}

export function apotheosisBonus(s: GameState): number {
  if (s.apotheosisUnlocked !== true) return 0
  return (s.eternityPoints ?? 0) * APO_PER
}

export function eternityAvailable(s: GameState): number {
  if (s.apotheosisUnlocked !== true) return 0
  return Math.floor(Math.max(0, (s.legacyStars ?? 0) - (s.starsConverted ?? 0)) / APO_DIVISOR)
}
