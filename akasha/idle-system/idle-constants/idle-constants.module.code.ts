import type { GameState } from "../idle-state/idle-state.module.code.ts"

export const DEFAULT_SYNERGY = 0.1

export const TRAIN_COST_BASE = 100
export const TRAIN_COST_GROWTH = 1.5
export const TRAIN_BULK_COUNT = 10

export const LEAD_MULT = 2
export const SUPPORT_AMP = 1.5
export const ANCHOR_FLOOR = 0.85

export const PRESTIGE_UNLOCK = 100
export const ASCEND_MIN = 100
export const ASCEND_DIVISOR = 50
export const STAR_VALUE = 0.1

export const WEATHER_PERIOD_MS = 600000
export const WEATHER_BONUS = 1.5
export const WEATHER_UNLOCK_STARS = 1

export const AFFINITY_SEATS = ["lead", "support", "anchor"] as const
export const AFFINITY_PER = 0.05
export const AFFINITY_UNLOCK_STARS = 6

export const MASTERY_UNLOCK_STARS = 10
export const MASTERY_RANK_REQ = 30
export const MASTERY_PER = 0.1

export const SPECIALIZE_UNLOCK_STARS = 14
export const SEATLOCK_PER = 0.15
export const GRANDMASTERY_UNLOCK_STARS = 16
export const GRAND_RANK_REQ = 60
export const GRAND_PER = 0.13
export const BLOOM_UNLOCK_STARS = 19
export const BLOOM_PERIOD_MS = 480000
export const BLOOM_MULT = 2
export const MEDALS_UNLOCK_STARS = 22
export const MEDAL_STEP = 25
export const MEDAL_PER = 0.01
export const RESONANCE_UNLOCK_STARS = 26
export const RESONANCE_PER = 0.2
export const AFTERGLOW_UNLOCK_STARS = 30
export const AFTERGLOW_MIN_GAP_MS = 1800000
export const AFTERGLOW_BONUS = 0.5
export const COHESION_UNLOCK_STARS = 35
export const COHESION_PER_HOUR = 0.1
export const COHESION_CAP = 0.3
export const FIFTH_SEAT_UNLOCK_STARS = 42
export const PERKS_UNLOCK_STARS = 50
export const PERK_DEFS: Record<string, { cost: number; mult: number; name: string }> = {
  surge: { cost: 2, mult: 0.05, name: "Surge" },
  devotion: { cost: 3, mult: 0.08, name: "Devotion" },
  legacy: { cost: 5, mult: 0.12, name: "Legacy" },
}
export const BOONS_UNLOCK_STARS = 60
export const BOON_DEFS: Record<string, { mult: number; name: string }> = {
  ember: { mult: 0.06, name: "Ember" },
  tide: { mult: 0.06, name: "Tide" },
  bloom: { mult: 0.06, name: "Bloom" },
}

export const FOURTH_SEAT_UNLOCK_STARS = 8

export const CONSTELLATION_UNLOCK_STARS = 70
export const CONSTELLATION_PER = 0.3
export const LEGACY_TIERS_UNLOCK_STARS = 80
export const TIER_STEP = 25
export const TIER_PER = 0.05
export const OVERDRIVE_UNLOCK_STARS = 90
export const OVERDRIVE_PERIOD_MS = 900000
export const OVERDRIVE_ON_MS = 120000
export const OVERDRIVE_MULT = 1.5
export const ECLIPSE_UNLOCK_STARS = 100
export const ECLIPSE_PERIOD_MS = 1200000
export const ECLIPSE_ON_MS = 180000
export const HARMONY_UNLOCK_STARS = 115
export const HARMONY_TIERS = [0, 0, 0.1, 0.25, 0.4, 0.55]
export const ECHOES_UNLOCK_STARS = 130
export const ECHO_PER = 0.03
export const DEVOTION_UNLOCK_STARS = 150
export const DEV_PER = 0.02
export const DEV_CAP = 0.2
export const BLESSING_UNLOCK_STARS = 175
export const BLESS_MULT = 1.4
export const FOUNDATION_UNLOCK_STARS = 200
export const FOUND_PER = 0.04
export const FOUND_CAP = 0.4
export const APOTHEOSIS_UNLOCK_STARS = 250
export const APO_DIVISOR = 50
export const APO_PER = 0.5

export const MECHANICS = [
  { flag: "weatherUnlocked", stars: WEATHER_UNLOCK_STARS },
  { flag: "affinityUnlocked", stars: AFFINITY_UNLOCK_STARS },
  { flag: "fourthSeatUnlocked", stars: FOURTH_SEAT_UNLOCK_STARS },
  { flag: "masteryUnlocked", stars: MASTERY_UNLOCK_STARS },
  { flag: "specializeUnlocked", stars: SPECIALIZE_UNLOCK_STARS },
  { flag: "grandmasteryUnlocked", stars: GRANDMASTERY_UNLOCK_STARS },
  { flag: "bloomUnlocked", stars: BLOOM_UNLOCK_STARS },
  { flag: "medalsUnlocked", stars: MEDALS_UNLOCK_STARS },
  { flag: "resonanceUnlocked", stars: RESONANCE_UNLOCK_STARS },
  { flag: "afterglowUnlocked", stars: AFTERGLOW_UNLOCK_STARS },
  { flag: "cohesionUnlocked", stars: COHESION_UNLOCK_STARS },
  { flag: "fifthSeatUnlocked", stars: FIFTH_SEAT_UNLOCK_STARS },
  { flag: "perksUnlocked", stars: PERKS_UNLOCK_STARS },
  { flag: "boonsUnlocked", stars: BOONS_UNLOCK_STARS },
  { flag: "constellationUnlocked", stars: CONSTELLATION_UNLOCK_STARS },
  { flag: "legacyTiersUnlocked", stars: LEGACY_TIERS_UNLOCK_STARS },
  { flag: "overdriveUnlocked", stars: OVERDRIVE_UNLOCK_STARS },
  { flag: "eclipseUnlocked", stars: ECLIPSE_UNLOCK_STARS },
  { flag: "harmonyUnlocked", stars: HARMONY_UNLOCK_STARS },
  { flag: "echoesUnlocked", stars: ECHOES_UNLOCK_STARS },
  { flag: "devotionUnlocked", stars: DEVOTION_UNLOCK_STARS },
  { flag: "blessingUnlocked", stars: BLESSING_UNLOCK_STARS },
  { flag: "foundationUnlocked", stars: FOUNDATION_UNLOCK_STARS },
  { flag: "apotheosisUnlocked", stars: APOTHEOSIS_UNLOCK_STARS },
] as const satisfies readonly { flag: keyof GameState; stars: number }[]

export const STAR_GATE_LADDER: readonly number[] = MECHANICS.map((m) => m.stars).toSorted(
  (a, b) => a - b
)

export const DERIVED_RATE_MIN = 8
export const DERIVED_RATE_MAX = 14
export const SYNERGY_NEG_SHARE = 0.15
export const SYNERGY_NEG_MIN = -0.15
export const SYNERGY_NEG_MAX = -0.05
export const SYNERGY_POS_MIN = 0.05
export const SYNERGY_POS_MAX = 0.3

export const STAR_THRESHOLDS: readonly number[] = [5, 25, 125, 500, 1000]
export const STAR_PER = 0.1
export const COLLECTION_PER = 0.01
export const BASE_IMAGE_ID = "__base__"
export const DRAW_COST_BASE = 100
export const DRAW_COST_GROWTH = 10
export const CARD_PALETTE = [
  "var(--blue)",
  "var(--purple)",
  "var(--green)",
  "var(--yellow)",
  "var(--orange)",
  "var(--red)",
] as const
