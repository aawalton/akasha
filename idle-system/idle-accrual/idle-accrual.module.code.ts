import {
  AFTERGLOW_BONUS,
  AFTERGLOW_MIN_GAP_MS,
  AFTERGLOW_UNLOCK_STARS,
  ASCEND_DIVISOR,
  BLOOM_PERIOD_MS,
  BLOOM_UNLOCK_STARS,
  COHESION_CAP,
  COHESION_PER_HOUR,
  COHESION_UNLOCK_STARS,
  ECLIPSE_ON_MS,
  ECLIPSE_PERIOD_MS,
  ECLIPSE_UNLOCK_STARS,
  MECHANICS,
  OVERDRIVE_ON_MS,
  OVERDRIVE_PERIOD_MS,
  OVERDRIVE_UNLOCK_STARS,
  PRESTIGE_UNLOCK,
  TRAIN_COST_BASE,
  TRAIN_COST_GROWTH,
  WEATHER_PERIOD_MS,
  WEATHER_UNLOCK_STARS,
} from "../idle-constants/idle-constants.module.code.ts"
import { isUnlocked } from "../idle-gacha-state/idle-gacha-state.module.code.ts"
import { totalRate } from "../idle-rate/idle-rate.module.code.ts"
import type { IdleSave } from "../idle-save/idle-save.module.code.ts"
import type { GachaGirl, GameState, Teammate } from "../idle-state/idle-state.module.code.ts"

export function trainCost(t: { readonly rate: number; readonly rank: number }): number {
  return Math.ceil(t.rate * TRAIN_COST_BASE * TRAIN_COST_GROWTH ** t.rank)
}

export function cumulativeTrainCost(
  t: { readonly rate: number; readonly rank: number },
  count: number
): number {
  let total = 0
  for (let k = 0; k < count; k++) {
    total += trainCost({ rate: t.rate, rank: t.rank + k })
  }
  return total
}

export function maxAffordableTrainCount(
  t: { readonly rate: number; readonly rank: number },
  budget: number
): number {
  let count = 0
  let spent = 0
  for (;;) {
    const next = trainCost({ rate: t.rate, rank: t.rank + count })
    if (spent + next > budget) break
    spent += next
    count++
  }
  return count
}

export function sumOwnedRanks(s: GameState): number {
  return s.teammates.reduce((n, t) => (isUnlocked(s, t.slug) ? n + t.rank : n), 0)
}

export function gainedStars(s: GameState): number {
  return Math.floor(sumOwnedRanks(s) / ASCEND_DIVISOR)
}

export function maxTeam(s: GameState): number {
  if (s.fifthSeatUnlocked === true) return 5
  if (s.fourthSeatUnlocked === true) return 4
  return 3
}

function weatherSlugAt(now: number, roster: readonly string[]): string {
  const idx = Math.floor(now / WEATHER_PERIOD_MS) % roster.length
  return roster[idx] ?? ""
}
function weatherNextRotateAt(now: number): number {
  return (Math.floor(now / WEATHER_PERIOD_MS) + 1) * WEATHER_PERIOD_MS
}
export function weatherSnapshot(
  now: number,
  roster: readonly string[]
): { currentSlug: string; nextRotateAt: number } {
  return { currentSlug: weatherSlugAt(now, roster), nextRotateAt: weatherNextRotateAt(now) }
}

function bloomPairsOf(roster: readonly string[]): readonly string[] {
  const out: string[] = []
  for (let i = 0; i < roster.length; i++) {
    for (let j = i + 1; j < roster.length; j++) {
      out.push([roster[i], roster[j]].sort().join("+"))
    }
  }
  return out
}
function bloomPairAt(now: number, pairs: readonly string[]): string {
  return pairs[Math.floor(now / BLOOM_PERIOD_MS) % pairs.length] ?? ""
}
export function bloomSnapshot(
  now: number,
  roster: readonly string[]
): { pairKey: string; nextRotateAt: number } {
  return {
    pairKey: bloomPairAt(now, bloomPairsOf(roster)),
    nextRotateAt: (Math.floor(now / BLOOM_PERIOD_MS) + 1) * BLOOM_PERIOD_MS,
  }
}

export function overdriveActiveAt(now: number): boolean {
  return now % OVERDRIVE_PERIOD_MS < OVERDRIVE_ON_MS
}
export function overdriveSnapshot(now: number): { activeUntil: number; nextStartAt: number } {
  const base = Math.floor(now / OVERDRIVE_PERIOD_MS) * OVERDRIVE_PERIOD_MS
  return { activeUntil: base + OVERDRIVE_ON_MS, nextStartAt: base + OVERDRIVE_PERIOD_MS }
}
export function eclipseActiveAt(now: number): boolean {
  return now % ECLIPSE_PERIOD_MS < ECLIPSE_ON_MS
}
export function eclipseSnapshot(now: number): { activeUntil: number; nextStartAt: number } {
  const base = Math.floor(now / ECLIPSE_PERIOD_MS) * ECLIPSE_PERIOD_MS
  return { activeUntil: base + ECLIPSE_ON_MS, nextStartAt: base + ECLIPSE_PERIOD_MS }
}

export function cohesionRamp(lineupSince: number | undefined, now: number): number {
  if (lineupSince === undefined) return 0
  const hours = Math.max(0, now - lineupSince) / 3600000
  return Math.min(COHESION_CAP, hours * COHESION_PER_HOUR)
}

export function withLatches(s: GameState): GameState {
  const stars = s.legacyStars ?? 0
  const latched: Partial<GameState> = {}
  for (const { flag, stars: gate } of MECHANICS) {
    latched[flag] = (s[flag] ?? false) || stars >= gate
  }
  return {
    ...s,
    prestigeUnlocked: (s.prestigeUnlocked ?? false) || sumOwnedRanks(s) >= PRESTIGE_UNLOCK,
    ...latched,
  }
}

export function bankAccrual(s: GameState, now: number): GameState {
  const elapsedMs = Math.max(0, now - s.lastTickAt)
  const elapsedSec = elapsedMs / 1000
  const stars = s.legacyStars ?? 0
  const weatherUnlocked = (s.weatherUnlocked ?? false) || stars >= WEATHER_UNLOCK_STARS
  const bloomUnlocked = (s.bloomUnlocked ?? false) || stars >= BLOOM_UNLOCK_STARS
  const cohesionUnlocked = (s.cohesionUnlocked ?? false) || stars >= COHESION_UNLOCK_STARS
  const cohesionMult = cohesionUnlocked ? cohesionRamp(s.lineupSince, now) : 0
  const overdriveUnlocked = (s.overdriveUnlocked ?? false) || stars >= OVERDRIVE_UNLOCK_STARS
  const eclipseUnlocked = (s.eclipseUnlocked ?? false) || stars >= ECLIPSE_UNLOCK_STARS
  const roster = s.mechanicsRoster ?? []
  const withSnaps: GameState = {
    ...s,
    weatherUnlocked,
    weather: roster.length > 0 ? weatherSnapshot(now, roster) : s.weather,
    bloomUnlocked,
    bloom: roster.length > 0 ? bloomSnapshot(now, roster) : s.bloom,
    cohesionUnlocked,
    cohesionMult,
    overdriveUnlocked,
    overdrive: overdriveSnapshot(now),
    overdriveActive: overdriveUnlocked && overdriveActiveAt(now),
    eclipseUnlocked,
    eclipse: eclipseSnapshot(now),
    eclipseActive: eclipseUnlocked && eclipseActiveAt(now),
  }
  const rate = totalRate(withSnaps)
  let accrued = rate * elapsedSec
  const afterglowUnlocked = (s.afterglowUnlocked ?? false) || stars >= AFTERGLOW_UNLOCK_STARS
  if (afterglowUnlocked && elapsedMs >= AFTERGLOW_MIN_GAP_MS) accrued *= 1 + AFTERGLOW_BONUS
  const prevPeak = typeof s.peakTeamRate === "number" ? s.peakTeamRate : 0
  const prestigeUnlocked = (s.prestigeUnlocked ?? false) || sumOwnedRanks(s) >= PRESTIGE_UNLOCK
  const lifetimeBanked = (s.lifetimeBanked ?? 0) + accrued
  return {
    ...withSnaps,
    resource: withSnaps.resource + accrued,
    lastTickAt: now,
    peakTeamRate: Math.max(prevPeak, rate),
    prestigeUnlocked,
    afterglowUnlocked,
    lifetimeBanked,
  }
}

function asTeammate(raw: unknown): Teammate {
  return raw as Teammate
}

function asGameState(raw: unknown): GameState {
  return raw as GameState
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function stripOwned(raw: unknown): unknown {
  if (!isRecord(raw)) return raw
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(raw)) if (k !== "owned") out[k] = v
  return out
}

function decrementRank(raw: unknown, rank: number): unknown {
  if (!isRecord(raw)) return raw
  return { ...raw, rank: Math.max(0, rank - 1) }
}

export function normalizeGameState(raw: IdleSave): GameState {
  const girls: Record<string, GachaGirl> = { ...(raw.gacha?.girls ?? {}) }
  const reindexRank = raw.ranksZeroIndexed !== true
  const teammates = raw.teammates.map((t) => {
    if (t.owned === true && girls[t.slug] === undefined) {
      girls[t.slug] = { stars: 0, dupeProgress: 0, images: [] }
    }
    const stripped = stripOwned(t)
    return asTeammate(reindexRank ? decrementRank(stripped, t.rank) : stripped)
  })
  const cycleDraws = raw.gacha?.cycleDraws ?? 0
  return asGameState({ ...raw, teammates, gacha: { girls, cycleDraws }, ranksZeroIndexed: true })
}
