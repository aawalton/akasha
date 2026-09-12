export type Teammate = {
  slug: string
  name: string
  color: string
  portrait: string
  flavor: string
  cost: number
  rate: number
  rank: number
  level: number | null
  stage: string
  affinity?: "lead" | "support" | "anchor"
  locked?: boolean
}

export type SynergyMatrix = Record<string, number>

export type SeatTiers = { mastery: boolean; grand: boolean; lock: boolean }

export type GachaGirl = {
  stars: number
  dupeProgress: number
  images: readonly string[]
  frontImage?: string
}

export type GachaState = {
  girls: Record<string, GachaGirl>
  cycleDraws: number
}

export type GameState = {
  resource: number
  teammates: readonly Teammate[]
  lastTickAt: number
  ranksZeroIndexed?: boolean
  synergyMatrix?: SynergyMatrix
  activeTeam?: readonly string[]
  mechanicsRoster?: readonly string[]
  activePair?: readonly [string, string] | null
  peakTeamRate?: number
  legacyStars?: number
  prestigeUnlocked?: boolean
  weatherUnlocked?: boolean
  weather?: { currentSlug: string; nextRotateAt: number }
  affinityUnlocked?: boolean
  fourthSeatUnlocked?: boolean
  masteryUnlocked?: boolean
  specializeUnlocked?: boolean
  grandmasteryUnlocked?: boolean
  bloomUnlocked?: boolean
  bloom?: { pairKey: string; nextRotateAt: number }
  medalsUnlocked?: boolean
  resonanceUnlocked?: boolean
  afterglowUnlocked?: boolean
  cohesionUnlocked?: boolean
  lineupSince?: number
  cohesionMult?: number
  fifthSeatUnlocked?: boolean
  perksUnlocked?: boolean
  perks?: readonly string[]
  perkPointsSpent?: number
  boonsUnlocked?: boolean
  boons?: readonly string[]
  constellationUnlocked?: boolean
  legacyTiersUnlocked?: boolean
  overdriveUnlocked?: boolean
  overdrive?: { activeUntil: number; nextStartAt: number }
  overdriveActive?: boolean
  eclipseUnlocked?: boolean
  eclipse?: { activeUntil: number; nextStartAt: number }
  eclipseActive?: boolean
  harmonyUnlocked?: boolean
  echoesUnlocked?: boolean
  echoMult?: number
  echoPeakBest?: number
  devotionUnlocked?: boolean
  devotionSlug?: string
  devotionStreak?: number
  blessingUnlocked?: boolean
  foundationUnlocked?: boolean
  lifetimeBanked?: number
  apotheosisUnlocked?: boolean
  eternityPoints?: number
  starsConverted?: number
  gacha: GachaState
}
