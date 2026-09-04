import { AFFINITY_SEATS, MASTERY_RANK_REQ } from "@akasha/idle-system/constants"
import type { GameState } from "@akasha/idle-system/state"
import {
  IDLE_LOCK_STATE_LOCKED,
  IDLE_LOCK_STATE_UNLOCKED,
} from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { portraitSrc } from "../idle-portrait/idle-portrait.module.code.ts"
import type { GirlCardVM } from "../idle-roster-view/idle-roster-view.module.code.ts"

export type LockInputs = {
  readonly specializeUnlocked: boolean
  readonly affinityUnlocked: boolean
  readonly bySlug: ReadonlyMap<string, { readonly affinity?: string; readonly locked: boolean }>
}

export function buildLockInputs(state: GameState): LockInputs {
  return {
    specializeUnlocked: state.specializeUnlocked === true,
    affinityUnlocked: state.affinityUnlocked === true,
    bySlug: new Map(
      state.teammates.map((t) => [t.slug, { affinity: t.affinity, locked: t.locked === true }])
    ),
  }
}

export type PersonaInfo = { readonly id: string; readonly cover: string }

export type IdleCardAttributes = {
  readonly playerId: string
  readonly cardSlug: string
  readonly personaSlug: string | null
  readonly cover: string
  readonly coverImageId: string | null
  readonly stars: number
  readonly ratePerSec: number
  readonly rank: number
  readonly trainCost: number
  readonly lockState: string
  readonly images: readonly string[]
  readonly seatIndex: number | null
  readonly lockEligible: boolean
  readonly specializeLocked: boolean
}

export type IdleCardProjection = {
  readonly cardSlug: string
  readonly titleWrite: string | undefined
  readonly attributes: IdleCardAttributes
}

export function projectedCoverUrl(card: GirlCardVM, personaCover: string | undefined): string {
  if (card.locked) return ""
  if (card.frontImageId !== null) return `/api/image/${card.frontImageId}`
  if (personaCover !== undefined && personaCover.length > 0) return personaCover
  return portraitSrc(card.portrait)
}

function titleWriteFor(
  card: GirlCardVM,
  priorTitle: string | null | undefined
): string | undefined {
  const desired = card.locked ? "???" : card.name
  return priorTitle === desired ? undefined : desired
}

export function lockFlagsFor(
  card: GirlCardVM,
  seatIdx: number | null,
  lockInputs: LockInputs | undefined
): { readonly lockEligible: boolean; readonly specializeLocked: boolean } {
  if (lockInputs === undefined) return { lockEligible: false, specializeLocked: false }
  const lockOn = lockInputs.specializeUnlocked
  const info = lockInputs.bySlug.get(card.slug)
  const specializeLocked = lockOn && info?.locked === true
  const fit =
    lockInputs.affinityUnlocked && seatIdx !== null && info?.affinity === AFFINITY_SEATS[seatIdx]
  const lockEligible = lockOn && (specializeLocked || (fit && card.rank >= MASTERY_RANK_REQ))
  return { lockEligible, specializeLocked }
}

export function deriveCardProjections(
  cards: readonly GirlCardVM[],
  personaBySlug: ReadonlyMap<string, PersonaInfo>,
  playerId: string,
  priorTitleBySlug: ReadonlyMap<string, string | null> = new Map(),
  activeTeam: readonly string[] = [],
  lockInputs: LockInputs | undefined = undefined
): readonly IdleCardProjection[] {
  return cards.map((card) => {
    const persona = card.locked ? undefined : personaBySlug.get(card.slug)
    const seat = activeTeam.indexOf(card.slug)
    const seatIdx = seat >= 0 ? seat : null
    const { lockEligible, specializeLocked } = lockFlagsFor(card, seatIdx, lockInputs)
    return {
      cardSlug: card.slug,
      titleWrite: titleWriteFor(card, priorTitleBySlug.get(card.slug)),
      attributes: {
        playerId,
        cardSlug: card.slug,
        personaSlug: persona === undefined ? null : card.slug,
        cover: projectedCoverUrl(card, persona?.cover),
        coverImageId: card.locked ? null : card.frontImageId,
        stars: card.stars,
        ratePerSec: card.baseRate,
        rank: card.rank,
        trainCost: card.trainCost,
        lockState: card.locked ? IDLE_LOCK_STATE_LOCKED : IDLE_LOCK_STATE_UNLOCKED,
        images: card.images,
        seatIndex: seatIdx,
        lockEligible,
        specializeLocked,
      },
    }
  })
}

export function cardPageName(playerId: string, cardSlug: string): string {
  return `${playerId}/${cardSlug}`
}

export function cardFileValues(
  projection: IdleCardProjection
): Record<string, string | number | boolean | readonly string[]> {
  const a = projection.attributes
  const values: Record<string, string | number | boolean | readonly string[]> = {
    "player-id": a.playerId,
    "card-slug": a.cardSlug,
    "persona-slug": a.personaSlug ?? [],
    cover: a.cover,
    "cover-image-id": a.coverImageId ?? [],
    stars: a.stars,
    "rate-per-sec": a.ratePerSec,
    rank: a.rank,
    "train-cost": a.trainCost,
    "lock-state": a.lockState,
    images: [...a.images],
    "seat-index": a.seatIndex ?? [],
    "lock-eligible": a.lockEligible,
    "specialize-locked": a.specializeLocked,
  }
  if (projection.titleWrite !== undefined) values.title = projection.titleWrite
  return values
}
