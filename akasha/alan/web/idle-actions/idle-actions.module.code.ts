import {
  cumulativeTrainCost,
  gainedStars,
  maxAffordableTrainCount,
  maxTeam,
  sumOwnedRanks,
  trainCost,
} from "@akasha/idle-system/accrual"
import {
  AFFINITY_SEATS,
  APO_DIVISOR,
  ASCEND_MIN,
  BASE_IMAGE_ID,
  BOON_DEFS,
  ECHO_PER,
  MASTERY_RANK_REQ,
  PERK_DEFS,
  TRAIN_BULK_COUNT,
} from "@akasha/idle-system/constants"
import { eternityAvailable, legacyPointsAvailable } from "@akasha/idle-system/dormancy"
import { isUnlocked } from "@akasha/idle-system/gacha-state"
import type { GachaState, GameState } from "@akasha/idle-system/state"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { z } from "zod"

export const actionIntentSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("train"), slug: z.string() }),
  z.object({ type: z.literal("train10"), slug: z.string() }),
  z.object({ type: z.literal("trainMax"), slug: z.string() }),
  z.object({ type: z.literal("selectImage"), slug: z.string(), image: z.string() }),
  z.object({ type: z.literal("specialize"), slug: z.string() }),
  z.object({ type: z.literal("unspecialize"), slug: z.string() }),
  z.object({ type: z.literal("perk"), slug: z.string() }),
  z.object({ type: z.literal("team"), members: z.array(z.string()) }),
  z.object({ type: z.literal("ascend"), boon: z.string().optional() }),
  z.object({ type: z.literal("apotheosis") }),
])

export type ActionIntent = z.infer<typeof actionIntentSchema>

export function actionKey(intent: ActionIntent): string {
  switch (intent.type) {
    case "team":
      return `team:${intent.members.join(",")}`
    case "ascend":
      return intent.boon === undefined ? "ascend" : `ascend:${intent.boon}`
    case "apotheosis":
      return "apotheosis"
    default:
      return `${intent.type}:${intent.slug}`
  }
}

export const drawIntentSchema = z.object({ type: z.literal("draw") })

export type ActionOutcome = { readonly applied: boolean; readonly reason?: string }

export type ActionResult = { readonly state: GameState; readonly outcome: ActionOutcome }

const APPLIED: ActionOutcome = { applied: true }
function noop(s: GameState, reason: string): ActionResult {
  return { state: s, outcome: { applied: false, reason } }
}

function activePairMirror(members: readonly string[]): readonly [string, string] | null {
  if (members.length !== 2) return null
  const [a, b] = members
  if (a === undefined || b === undefined) return null
  return a <= b ? [a, b] : [b, a]
}

function applySelectImage(s: GameState, slug: string, image: string): ActionResult {
  const girl = s.gacha.girls[slug]
  if (girl === undefined) return noop(s, "not-owned")
  if (image !== BASE_IMAGE_ID && !girl.images.includes(image)) return noop(s, "ineligible")
  const gacha: GachaState = {
    ...s.gacha,
    girls: { ...s.gacha.girls, [slug]: { ...girl, frontImage: image } },
  }
  return { state: { ...s, gacha }, outcome: APPLIED }
}

function applyTrain(s: GameState, slug: string): ActionResult {
  const idx = s.teammates.findIndex((t) => t.slug === slug)
  const target = idx === -1 ? undefined : s.teammates[idx]
  if (target === undefined) return noop(s, "unknown")
  if (!isUnlocked(s, slug)) return noop(s, "not-owned")
  const cost = trainCost(target)
  if (s.resource < cost) return noop(s, "insufficient")
  const teammates = s.teammates.map((t, i) => (i === idx ? { ...t, rank: t.rank + 1 } : t))
  let next: GameState = { ...s, resource: s.resource - cost, teammates }
  if (s.devotionUnlocked === true) {
    const streak = s.devotionSlug === slug ? (s.devotionStreak ?? 0) + 1 : 1
    next = { ...next, devotionSlug: slug, devotionStreak: streak }
  }
  return { state: next, outcome: APPLIED }
}

function applyTrain10(s: GameState, slug: string): ActionResult {
  const idx = s.teammates.findIndex((t) => t.slug === slug)
  const target = idx === -1 ? undefined : s.teammates[idx]
  if (target === undefined) return noop(s, "unknown")
  if (!isUnlocked(s, slug)) return noop(s, "not-owned")
  const cost = cumulativeTrainCost(target, TRAIN_BULK_COUNT)
  if (s.resource < cost) return noop(s, "insufficient")
  const teammates = s.teammates.map((t, i) =>
    i === idx ? { ...t, rank: t.rank + TRAIN_BULK_COUNT } : t
  )
  let next: GameState = { ...s, resource: s.resource - cost, teammates }
  if (s.devotionUnlocked === true) {
    const streak =
      s.devotionSlug === slug ? (s.devotionStreak ?? 0) + TRAIN_BULK_COUNT : TRAIN_BULK_COUNT
    next = { ...next, devotionSlug: slug, devotionStreak: streak }
  }
  return { state: next, outcome: APPLIED }
}

function applyTrainMax(s: GameState, slug: string): ActionResult {
  const idx = s.teammates.findIndex((t) => t.slug === slug)
  const target = idx === -1 ? undefined : s.teammates[idx]
  if (target === undefined) return noop(s, "unknown")
  if (!isUnlocked(s, slug)) return noop(s, "not-owned")
  const count = maxAffordableTrainCount(target, s.resource)
  if (count <= 0) return noop(s, "insufficient")
  const cost = cumulativeTrainCost(target, count)
  const teammates = s.teammates.map((t, i) => (i === idx ? { ...t, rank: t.rank + count } : t))
  let next: GameState = { ...s, resource: s.resource - cost, teammates }
  if (s.devotionUnlocked === true) {
    const streak = s.devotionSlug === slug ? (s.devotionStreak ?? 0) + count : count
    next = { ...next, devotionSlug: slug, devotionStreak: streak }
  }
  return { state: next, outcome: APPLIED }
}

function applyTeam(s: GameState, requested: readonly string[], now: number): ActionResult {
  const seen = new Set<string>()
  const members: string[] = []
  for (const m of requested) {
    if (!seen.has(m)) {
      seen.add(m)
      members.push(m)
    }
  }
  if (members.length > maxTeam(s)) return noop(s, "over-cap")
  if (members.length === 0) {
    return {
      state: { ...s, activeTeam: [], activePair: null, lineupSince: now },
      outcome: { applied: true, reason: "cleared" },
    }
  }
  for (const m of members) {
    const t = s.teammates.find((x) => x.slug === m)
    if (t === undefined) return noop(s, "unknown")
    if (!isUnlocked(s, m)) return noop(s, "not-owned")
  }
  const current = s.activeTeam ?? []
  const sameLineup = current.length === members.length && current.every((m, i) => m === members[i])
  return {
    state: {
      ...s,
      activeTeam: members,
      activePair: activePairMirror(members),
      lineupSince: sameLineup ? (s.lineupSince ?? now) : now,
    },
    outcome: APPLIED,
  }
}

function applyAscend(s: GameState, boon: string | undefined): ActionResult {
  const ranksTotal = sumOwnedRanks(s)
  const gained = gainedStars(s)
  if (ranksTotal < ASCEND_MIN || gained < 1) return noop(s, "too-soon")
  const teammates = s.teammates.map((t) => ({ ...t, rank: 0 }))
  const legacyStars = (s.legacyStars ?? 0) + gained
  const boons =
    s.boonsUnlocked === true && boon !== undefined && BOON_DEFS[boon] !== undefined
      ? [...(s.boons ?? []), boon]
      : (s.boons ?? [])
  const peak = s.peakTeamRate ?? 0
  const beat = s.echoesUnlocked === true && peak > (s.echoPeakBest ?? 0)
  const echoMult = beat ? (s.echoMult ?? 0) + ECHO_PER : (s.echoMult ?? 0)
  const echoPeakBest = beat ? peak : (s.echoPeakBest ?? 0)
  const gacha: GachaState = { ...s.gacha, cycleDraws: 0 }
  return {
    state: { ...s, resource: 0, teammates, legacyStars, boons, echoMult, echoPeakBest, gacha },
    outcome: APPLIED,
  }
}

function applySpecialize(s: GameState, slug: string): ActionResult {
  if (s.specializeUnlocked !== true) return noop(s, "locked")
  const idx = s.teammates.findIndex((t) => t.slug === slug)
  const target = idx === -1 ? undefined : s.teammates[idx]
  if (target === undefined) return noop(s, "unknown")
  const team = s.activeTeam ?? []
  const seatIdx = team.indexOf(slug)
  const inSeat =
    seatIdx >= 0 && seatIdx < AFFINITY_SEATS.length && target.affinity === AFFINITY_SEATS[seatIdx]
  if (!isUnlocked(s, slug) || !inSeat || (target.rank ?? 0) < MASTERY_RANK_REQ) {
    return noop(s, "ineligible")
  }
  const teammates = s.teammates.map((t, i) => (i === idx ? { ...t, locked: true } : t))
  return { state: { ...s, teammates }, outcome: APPLIED }
}

function applyUnspecialize(s: GameState, slug: string): ActionResult {
  if (s.specializeUnlocked !== true) return noop(s, "locked")
  const idx = s.teammates.findIndex((t) => t.slug === slug)
  if (idx === -1) return noop(s, "unknown")
  const teammates = s.teammates.map((t, i) => (i === idx ? { ...t, locked: false } : t))
  return { state: { ...s, teammates }, outcome: APPLIED }
}

function applyPerk(s: GameState, slug: string): ActionResult {
  if (s.perksUnlocked !== true) return noop(s, "locked")
  const def = PERK_DEFS[slug]
  if (def === undefined) return noop(s, "unknown")
  if ((s.perks ?? []).includes(slug)) return noop(s, "already-owned")
  if (legacyPointsAvailable(s) < def.cost) return noop(s, "insufficient")
  return {
    state: {
      ...s,
      perks: [...(s.perks ?? []), slug],
      perkPointsSpent: (s.perkPointsSpent ?? 0) + def.cost,
    },
    outcome: APPLIED,
  }
}

function applyApotheosis(s: GameState): ActionResult {
  if (s.apotheosisUnlocked !== true) return noop(s, "locked")
  const avail = eternityAvailable(s)
  if (avail < 1) return noop(s, "insufficient")
  return {
    state: {
      ...s,
      eternityPoints: (s.eternityPoints ?? 0) + avail,
      starsConverted: (s.starsConverted ?? 0) + avail * APO_DIVISOR,
    },
    outcome: APPLIED,
  }
}

export function applyIntent(state: GameState, intent: ActionIntent, now: number): ActionResult {
  switch (intent.type) {
    case "train":
      return applyTrain(state, intent.slug)
    case "train10":
      return applyTrain10(state, intent.slug)
    case "trainMax":
      return applyTrainMax(state, intent.slug)
    case "selectImage":
      return applySelectImage(state, intent.slug, intent.image)
    case "team":
      return applyTeam(state, intent.members, now)
    case "ascend":
      return applyAscend(state, intent.boon)
    case "specialize":
      return applySpecialize(state, intent.slug)
    case "unspecialize":
      return applyUnspecialize(state, intent.slug)
    case "perk":
      return applyPerk(state, intent.slug)
    case "apotheosis":
      return applyApotheosis(state)
    default:
      return assertNever(intent)
  }
}
