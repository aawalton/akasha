import { CARD_PALETTE } from "../idle-constants/idle-constants.module.code.ts"
import { hotFactor } from "../idle-gacha-heat/idle-gacha-heat.module.code.ts"
import { applyDupeFuel, drawCost } from "../idle-gacha-state/idle-gacha-state.module.code.ts"
import type {
  GachaGirl,
  GachaState,
  GameState,
  Teammate,
} from "../idle-state/idle-state.module.code.ts"

export type DrawGirl = {
  readonly slug: string
  readonly name: string
  readonly level: number | null
  readonly stage: string
  readonly cover: string
  readonly rate: number
  readonly affinity: "lead" | "support" | "anchor"
}

const API_IMAGE_PREFIX = "/api/image/"
function coverImageId(cover: string): string {
  return cover.startsWith(API_IMAGE_PREFIX) ? cover.slice(API_IMAGE_PREFIX.length) : cover
}

export function colorForSlug(slug: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return CARD_PALETTE[h % CARD_PALETTE.length] ?? CARD_PALETTE[0]
}

export type DrawContext = {
  readonly roster: readonly DrawGirl[]
  readonly pools: Record<string, readonly string[]>
  readonly seed: number
  readonly now: number
}

export type DrawReveal = {
  readonly slug: string
  readonly name: string
  readonly image: string
  readonly isNewImage: boolean
  readonly isNewGirl: boolean
  readonly stars: number
  readonly starUp: boolean
}

export type DrawResult = {
  readonly state: GameState
  readonly outcome: { readonly applied: boolean; readonly reason?: string }
  readonly reveal: DrawReveal | null
}

function makeRng(seed: number): () => number {
  let state = seed >>> 0
  if (state === 0) state = 1
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

function weightedPick(weights: readonly number[], u: number): number {
  const total = weights.reduce((a, b) => a + b, 0)
  if (total <= 0) return 0
  let r = u * total
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i] ?? 0
    if (r < 0) return i
  }
  return weights.length - 1
}

function materializeTeammate(g: DrawGirl): Teammate {
  return {
    slug: g.slug,
    name: g.name,
    color: colorForSlug(g.slug),
    portrait: g.cover,
    flavor: "",
    cost: 0,
    rate: g.rate,
    rank: 0,
    level: g.level,
    stage: g.stage,
    affinity: g.affinity,
  }
}

function withTeammateEntry(teammates: readonly Teammate[], g: DrawGirl): readonly Teammate[] {
  return teammates.some((t) => t.slug === g.slug)
    ? teammates
    : [...teammates, materializeTeammate(g)]
}

export function applyDraw(s: GameState, ctx: DrawContext): DrawResult {
  if (ctx.roster.length === 0) {
    return { state: s, outcome: { applied: false, reason: "no-roster" }, reveal: null }
  }
  const cost = drawCost(s)
  if (s.resource < cost) {
    return { state: s, outcome: { applied: false, reason: "insufficient" }, reveal: null }
  }

  const rng = makeRng(ctx.seed)
  const gacha: GachaState = s.gacha

  const weights = ctx.roster.map((g) => hotFactor(g.slug, s))
  const girl = ctx.roster[weightedPick(weights, rng())] ?? ctx.roster[0]
  if (girl === undefined) {
    return { state: s, outcome: { applied: false, reason: "no-roster" }, reveal: null }
  }

  const isNewGirl = gacha.girls[girl.slug] === undefined
  const cur: GachaGirl = gacha.girls[girl.slug] ?? { stars: 0, dupeProgress: 0, images: [] }
  const pool = ctx.pools[girl.slug] ?? []
  const unowned = pool.filter((id) => !cur.images.includes(id))

  let nextGirl: GachaGirl
  let reveal: DrawReveal
  if (unowned.length > 0) {
    const image = unowned[Math.floor(rng() * unowned.length)] ?? coverImageId(girl.cover)
    nextGirl = { ...cur, images: [...cur.images, image] }
    reveal = {
      slug: girl.slug,
      name: girl.name,
      image,
      isNewImage: true,
      isNewGirl,
      stars: nextGirl.stars,
      starUp: false,
    }
  } else {
    const fueled = applyDupeFuel(cur)
    nextGirl = fueled.girl
    const image = cur.images[cur.images.length - 1] ?? coverImageId(girl.cover)
    reveal = {
      slug: girl.slug,
      name: girl.name,
      image,
      isNewImage: false,
      isNewGirl,
      stars: nextGirl.stars,
      starUp: fueled.starUp,
    }
  }

  const nextGacha: GachaState = {
    girls: { ...gacha.girls, [girl.slug]: nextGirl },
    cycleDraws: gacha.cycleDraws + 1,
  }
  const teammates = isNewGirl ? withTeammateEntry(s.teammates, girl) : s.teammates

  return {
    state: { ...s, resource: s.resource - cost, teammates, gacha: nextGacha },
    outcome: { applied: true },
    reveal,
  }
}
