import { cumulativeTrainCost, trainCost } from "@akasha/idle-system/accrual"
import { BASE_IMAGE_ID, TRAIN_BULK_COUNT } from "@akasha/idle-system/constants"
import { nextStarThreshold } from "@akasha/idle-system/gacha-state"
import { effectiveRate } from "@akasha/idle-system/rate"
import type { GameState } from "@akasha/idle-system/state"
import type { Catalog } from "../idle-catalog/idle-catalog.module.code.ts"

export type GirlCardVM = {
  readonly slug: string
  readonly name: string
  readonly color: string
  readonly locked: boolean
  readonly portrait: string
  readonly frontImageId: string | null
  readonly images: readonly string[]
  readonly pool: readonly string[]
  readonly stars: number
  readonly dupeProgress: number
  readonly nextThreshold: number | null
  readonly imageCount: number
  readonly level: number | null
  readonly stage: string
  readonly rank: number
  readonly baseRate: number
  readonly trainCost: number
  readonly train10Cost: number
}

const DEFAULT_COLOR = "var(--blue)"

function frontOf(images: readonly string[], frontImage: string | undefined): string | null {
  if (frontImage === BASE_IMAGE_ID) {
    return null
  }
  if (frontImage !== undefined && images.includes(frontImage)) {
    return frontImage
  }
  return images[images.length - 1] ?? null
}

const API_IMAGE_PREFIX = "/api/image/"

function baseCoverImageId(card: GirlCardVM): string | null {
  return card.portrait.startsWith(API_IMAGE_PREFIX)
    ? card.portrait.slice(API_IMAGE_PREFIX.length)
    : null
}

export function hasBaseCover(card: GirlCardVM): boolean {
  return !card.locked && card.portrait !== ""
}

export function deriveVariantIds(card: GirlCardVM): readonly string[] {
  const inPool = new Set(card.pool)
  const union = [...card.pool, ...card.images.filter((id) => !inPool.has(id))]
  if (!hasBaseCover(card)) {
    return union
  }
  const baseId = baseCoverImageId(card)
  return baseId === null ? union : union.filter((id) => id !== baseId)
}

export function deriveVariantCounts(card: GirlCardVM): { collected: number; total: number } {
  const ids = deriveVariantIds(card)
  const owned = new Set(card.images)
  return { collected: ids.filter((id) => owned.has(id)).length, total: ids.length }
}

export function deriveCollectionCounts(card: GirlCardVM): { collected: number; total: number } {
  const { collected, total } = deriveVariantCounts(card)
  const baseCount = hasBaseCover(card) ? 1 : 0
  return { collected: collected + baseCount, total: total + baseCount }
}

export function formatCollectedBadge(card: GirlCardVM): string {
  const { collected, total } = deriveCollectionCounts(card)
  return `${collected}/${total} collected`
}

export function formatStarsDetail(card: GirlCardVM): string {
  if (card.nextThreshold === null) {
    return `★${card.stars}`
  }
  return `★${card.stars} ${card.dupeProgress}/${card.nextThreshold}`
}

export function deriveRosterView(
  state: GameState,
  catalog: Catalog | null,
  _now: number
): readonly GirlCardVM[] {
  const roster = catalog?.roster ?? []
  const pools = catalog?.pools ?? {}
  const slugs: string[] = []
  const seen = new Set<string>()
  const add = (slug: string): undefined => {
    if (!seen.has(slug)) {
      seen.add(slug)
      slugs.push(slug)
    }
  }
  for (const g of roster) {
    add(g.slug)
  }
  for (const slug of Object.keys(state.gacha.girls)) {
    add(slug)
  }

  return slugs.map((slug) => {
    const teammate = state.teammates.find((t) => t.slug === slug)
    const girl = state.gacha.girls[slug]
    const cat = roster.find((g) => g.slug === slug)
    const images = girl?.images ?? []
    return {
      slug,
      name: teammate?.name ?? cat?.name ?? slug,
      color: teammate?.color ?? DEFAULT_COLOR,
      locked: girl === undefined,
      portrait: teammate?.portrait ?? cat?.cover ?? "",
      frontImageId: girl === undefined ? null : frontOf(images, girl.frontImage),
      images,
      pool: pools[slug] ?? images,
      stars: girl?.stars ?? 0,
      dupeProgress: girl?.dupeProgress ?? 0,
      nextThreshold: nextStarThreshold(girl?.stars ?? 0),
      imageCount: images.length,
      level: teammate?.level ?? cat?.level ?? null,
      stage: teammate?.stage ?? cat?.stage ?? "",
      rank: teammate?.rank ?? 0,
      baseRate: teammate === undefined ? 0 : effectiveRate(teammate),
      trainCost: teammate === undefined ? 0 : trainCost(teammate),
      train10Cost: teammate === undefined ? 0 : cumulativeTrainCost(teammate, TRAIN_BULK_COUNT),
    }
  })
}
