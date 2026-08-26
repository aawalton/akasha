import type { DailyTierColor } from "./daily-tier.ts"
import {
  continuousCircle,
  type DescendingRung,
  descendingCircle,
  noDataCircle,
  type ReadingUnit,
  type StoplightCircle,
  type TierLadder,
} from "./stoplight-circle.ts"

export const READOUT_SCALE_PAGE_TYPE_SLUG = "readout-scale"

export function readoutScaleDoc(slug: string): string {
  return `the \`${READOUT_SCALE_PAGE_TYPE_SLUG}\` page \`${slug}\``
}

export type ReadoutTierColor = DailyTierColor | "orange"

type ThresholdKey = "blackAt" | "redAt" | "orangeAt" | "yellowAt" | "greenAt" | "blueAt"

const SCALE_RUNGS: readonly (readonly [ThresholdKey, ReadoutTierColor])[] = [
  ["blackAt", "black"],
  ["redAt", "red"],
  ["orangeAt", "orange"],
  ["yellowAt", "yellow"],
  ["greenAt", "green"],
  ["blueAt", "blue"],
]

const TIER_COLORS: readonly ReadoutTierColor[] = SCALE_RUNGS.map(([, color]) => color)

export interface ReadoutScale {
  readonly slug: string
  readonly blackAt?: number | undefined
  readonly redAt?: number | undefined
  readonly orangeAt?: number | undefined
  readonly yellowAt?: number | undefined
  readonly greenAt?: number | undefined
  readonly blueAt?: number | undefined
  readonly earnedColourSlug?: string | undefined
}

export type ReadoutDirection = "ascending" | "descending"

export interface ReadoutRung {
  readonly at: number
  readonly color: ReadoutTierColor
}

export interface ReadoutShape {
  readonly slug: string
  readonly direction: ReadoutDirection
  readonly rungs: readonly ReadoutRung[]
  readonly earnedTier: ReadoutTierColor | null
}

export type ReadoutLadder = TierLadder<ReadoutTierColor>

function earnedTierOf(scale: ReadoutScale): ReadoutTierColor | null {
  const stated = scale.earnedColourSlug ?? null
  if (stated === null) return null
  const found = TIER_COLORS.find((color) => color === stated)
  if (found === undefined) {
    throw new Error(
      `readoutShape: ${readoutScaleDoc(scale.slug)} states \`earned-colour-slug: ${stated}\`, and a ` +
        `readout tier is one of ${TIER_COLORS.join(", ")}`
    )
  }
  return found
}

export function readoutShape(scale: ReadoutScale): ReadoutShape {
  const rungs: ReadoutRung[] = []
  for (const [key, color] of SCALE_RUNGS) {
    const at = scale[key]
    if (typeof at === "number") rungs.push({ at, color })
  }
  if (rungs.length < 2) {
    const stated = rungs.length === 0 ? "none" : rungs.map((rung) => `${rung.color}-at`).join(", ")
    throw new Error(
      `readoutShape: ${readoutScaleDoc(scale.slug)} states ${rungs.length} threshold(s) (${stated}); ` +
        "two are the fewest that say which way the reading runs"
    )
  }
  let rising = true
  let falling = true
  for (let i = 1; i < rungs.length; i++) {
    const above = rungs[i]
    const below = rungs[i - 1]
    if (above === undefined || below === undefined) continue
    if (above.at <= below.at) rising = false
    if (above.at >= below.at) falling = false
  }
  if (!rising && !falling) {
    throw new Error(
      `readoutShape: ${readoutScaleDoc(scale.slug)} states ` +
        `${rungs.map((rung) => `${rung.color}-at: ${rung.at}`).join(", ")}, which neither climbs ` +
        "nor falls from black through blue, so nothing on it says whether a higher reading is " +
        "the better one"
    )
  }
  return {
    slug: scale.slug,
    direction: rising ? "ascending" : "descending",
    rungs,
    earnedTier: earnedTierOf(scale),
  }
}

function climbFrom(shape: ReadoutShape): ReadoutLadder {
  return shape.rungs
    .filter((rung) => rung.color !== "black")
    .map((rung) => ({ threshold: rung.at, color: rung.color }))
}

function fallFrom(shape: ReadoutShape): readonly DescendingRung<ReadoutTierColor>[] {
  return shape.rungs.map((rung) => ({ at: rung.at, color: rung.color }))
}

function blackAtOf(shape: ReadoutShape): number | undefined {
  const lowest = shape.rungs[0]
  return lowest !== undefined && lowest.color === "black" ? lowest.at : undefined
}

export function readoutLadder(scale: ReadoutScale): ReadoutLadder {
  const shape = readoutShape(scale)
  if (shape.direction === "descending") {
    throw new Error(
      `readoutLadder: ${readoutScaleDoc(scale.slug)} falls from black through blue, so a lower reading ` +
        "is the better one and there is no ladder to climb; draw it with `readoutTierCircle`"
    )
  }
  return climbFrom(shape)
}

export interface ReadoutTierCircle {
  readonly tier: ReadoutTierColor
  readonly reading: string
  readonly nextTier: ReadoutTierColor | null
  readonly progress: number | null
}

function drawAgainst(
  shape: ReadoutShape,
  reading: number | null,
  unit: ReadingUnit
): ReadoutTierCircle {
  if (reading === null) return noDataCircle(unit)
  if (shape.direction === "descending") return descendingCircle(reading, fallFrom(shape))
  const blackAt = blackAtOf(shape)
  return continuousCircle({
    reading,
    ladder: climbFrom(shape),
    unit,
    ...(blackAt === undefined ? {} : { blackAt }),
  })
}

function earnedOver(drawn: ReadoutTierCircle, shape: ReadoutShape): ReadoutTierCircle {
  const earned = shape.earnedTier
  if (earned === null) {
    throw new Error(
      `readoutTierCircle: a reading against ${readoutScaleDoc(shape.slug)} was drawn as earned, and ` +
        "that scale states no `earned-colour-slug`"
    )
  }
  const best = shape.rungs[shape.rungs.length - 1]
  if (best !== undefined && drawn.tier === best.color) return drawn
  return { ...drawn, tier: earned, nextTier: null, progress: null }
}

export function readoutTierCircle(args: {
  readonly reading: number | null
  readonly scale: ReadoutScale
  readonly unit: ReadingUnit
  readonly earned?: boolean
}): ReadoutTierCircle {
  const shape = readoutShape(args.scale)
  const drawn = drawAgainst(shape, args.reading, args.unit)
  return args.earned === true ? earnedOver(drawn, shape) : drawn
}

export function readoutCircle(args: {
  readonly reading: number | null
  readonly scale: ReadoutScale
  readonly unit: ReadingUnit
  readonly earned?: boolean
}): StoplightCircle {
  const drawn = readoutTierCircle(args)
  if (drawn.tier === "orange" || drawn.nextTier === "orange") {
    throw new Error(
      `readoutCircle: ${readoutScaleDoc(args.scale.slug)} draws an orange tier, and \`DailyTierColor\` ` +
        "carries no orange. Draw it with `readoutTierCircle`, which answers `ReadoutTierColor`"
    )
  }
  return {
    tier: drawn.tier,
    reading: drawn.reading,
    nextTier: drawn.nextTier,
    progress: drawn.progress,
  }
}
