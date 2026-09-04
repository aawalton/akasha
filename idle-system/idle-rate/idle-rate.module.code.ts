import {
  ANCHOR_FLOOR,
  BLOOM_MULT,
  DEFAULT_SYNERGY,
  LEAD_MULT,
  OVERDRIVE_MULT,
  STAR_VALUE,
  SUPPORT_AMP,
  WEATHER_BONUS,
} from "../idle-constants/idle-constants.module.code.ts"
import {
  activeBloomPair,
  activeWeatherSlug,
  affinityBonus,
  apotheosisBonus,
  boonBonus,
  constellationBonus,
  echoBonus,
  extraHotMap,
  foundationBonus,
  harmonyBonus,
  legacyTiersBonus,
  medalBonus,
  perkBonus,
  resonanceBonus,
  rolesUnlocked,
  seatTiers,
} from "../idle-dormancy/idle-dormancy.module.code.ts"
import {
  collectionBonus,
  starMultMap,
  unlockedTeammates,
} from "../idle-gacha-state/idle-gacha-state.module.code.ts"
import type { GameState, SynergyMatrix, Teammate } from "../idle-state/idle-state.module.code.ts"

export function effectiveRate(t: Teammate): number {
  return t.rate * t.rank
}

function pairKey(a: string, b: string): string {
  return [a, b].sort().join("+")
}

export function pairSynergy(matrix: SynergyMatrix, a: string, b: string): number {
  const v = matrix[pairKey(a, b)]
  return typeof v === "number" ? v : DEFAULT_SYNERGY
}

export function balanceFactor(rankA: number, rankB: number): number {
  const lo = Math.min(rankA, rankB)
  const hi = Math.max(rankA, rankB)
  return hi === 0 ? 1 : lo / hi
}

export function computeTeamSynergy(
  members: readonly string[],
  teammates: readonly Teammate[],
  matrix: SynergyMatrix
): number {
  const rankOf = (slug: string): number => teammates.find((t) => t.slug === slug)?.rank ?? 0
  let sum = 0
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const a = members[i]
      const b = members[j]
      if (a === undefined || b === undefined) continue
      const base = pairSynergy(matrix, a, b)
      sum += base > 0 ? base * balanceFactor(rankOf(a), rankOf(b)) : base
    }
  }
  return sum
}

function hotRate(
  t: Teammate,
  weatherSlug: string | null,
  extraHot: Record<string, number>,
  starMult: Record<string, number>
): number {
  return (
    effectiveRate(t) *
    (weatherSlug !== null && t.slug === weatherSlug ? WEATHER_BONUS : 1) *
    (extraHot[t.slug] ?? 1) *
    (starMult[t.slug] ?? 1)
  )
}

function perGirlBoostedRate(
  t: Teammate,
  isLead: boolean,
  weatherSlug: string | null,
  extraHot: Record<string, number>,
  starMult: Record<string, number>
): number {
  const e = hotRate(t, weatherSlug, extraHot, starMult)
  return isLead ? e * LEAD_MULT : e
}

export function computeRoleAwareTotalRate(
  team: readonly string[],
  teammates: readonly Teammate[],
  matrix: SynergyMatrix,
  unlocked: boolean,
  weatherSlug: string | null = null,
  bloomPair: string | null = null,
  extraHot: Record<string, number> = {},
  neutralizeFriction = false,
  starMult: Record<string, number> = {}
): number {
  const rankOf = (slug: string): number => teammates.find((t) => t.slug === slug)?.rank ?? 0

  const lead = unlocked && team.length >= 1 ? team[0] : null
  const summedRate = teammates.reduce(
    (sum, t) => sum + perGirlBoostedRate(t, t.slug === lead, weatherSlug, extraHot, starMult),
    0
  )

  if (!unlocked) return summedRate * (1 + computeTeamSynergy(team, teammates, matrix))

  const support = team.length >= 2 ? team[1] : null
  const anchor = team.length >= 3 ? team[2] : null
  let teamSyn = 0
  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {
      const a = team[i]
      const b = team[j]
      if (a === undefined || b === undefined) continue
      const base = pairSynergy(matrix, a, b)
      if (base > 0) {
        const rawBalance = balanceFactor(rankOf(a), rankOf(b))
        const includesAnchor = anchor !== null && (a === anchor || b === anchor)
        const balance = includesAnchor ? Math.max(rawBalance, ANCHOR_FLOOR) : rawBalance
        let contribution = base * balance
        const includesSupport = support !== null && (a === support || b === support)
        if (includesSupport) contribution *= SUPPORT_AMP
        if (bloomPair !== null && [a, b].slice().sort().join("+") === bloomPair) {
          contribution *= BLOOM_MULT
        }
        teamSyn += contribution
      } else {
        teamSyn += neutralizeFriction ? 0 : base
      }
    }
  }
  return summedRate * (1 + teamSyn)
}

export function teamSynergy(s: GameState): number {
  return computeTeamSynergy(s.activeTeam ?? [], s.teammates, s.synergyMatrix ?? {})
}

export function totalRate(s: GameState): number {
  const base = computeRoleAwareTotalRate(
    s.activeTeam ?? [],
    unlockedTeammates(s),
    s.synergyMatrix ?? {},
    rolesUnlocked(s),
    activeWeatherSlug(s),
    activeBloomPair(s),
    extraHotMap(s),
    s.eclipseActive === true,
    starMultMap(s)
  )
  const legacyMult = (s.legacyStars ?? 0) * STAR_VALUE
  const affBonus = affinityBonus(
    s.activeTeam ?? [],
    s.teammates,
    s.affinityUnlocked === true,
    seatTiers(s)
  )
  return (
    base *
    (1 + legacyMult) *
    (1 + affBonus) *
    (1 + medalBonus(s)) *
    (1 + resonanceBonus(s)) *
    (1 + (s.cohesionMult ?? 0)) *
    (1 + perkBonus(s)) *
    (1 + boonBonus(s)) *
    (1 + constellationBonus(s)) *
    (1 + legacyTiersBonus(s)) *
    (s.overdriveActive === true ? OVERDRIVE_MULT : 1) *
    (1 + harmonyBonus(s)) *
    (1 + echoBonus(s)) *
    (1 + foundationBonus(s)) *
    (1 + apotheosisBonus(s)) *
    (1 + collectionBonus(s))
  )
}

export function boostedRateMap(s: GameState): Record<string, number> {
  const teammates = unlockedTeammates(s)
  const team = s.activeTeam ?? []
  const lead = rolesUnlocked(s) && team.length >= 1 ? team[0] : null
  const weatherSlug = activeWeatherSlug(s)
  const extraHot = extraHotMap(s)
  const starMult = starMultMap(s)
  const map: Record<string, number> = {}
  for (const t of teammates) {
    map[t.slug] = perGirlBoostedRate(t, t.slug === lead, weatherSlug, extraHot, starMult)
  }
  return map
}

export function displayedResource(s: GameState, now: number): number {
  return s.resource + (totalRate(s) * Math.max(0, now - s.lastTickAt)) / 1000
}
