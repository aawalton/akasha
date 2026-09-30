import { metricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.ts"
import { z } from "zod"

const RARITIES = {
  common: { perLevel: 2, cap: 10 },
  uncommon: { perLevel: 4, cap: 20 },
  rare: { perLevel: 6, cap: 30 },
  epic: { perLevel: 8, cap: 40 },
} as const

const POINTS_PER_HOUR = { practice: 1, danger: 6, lifeOrDeath: 30, taught: 2 } as const

const POINTS_TO_LEARN = 10

const HARD_LEVELS_AT_THE_TOP = 2

const ESSENCE_PER_KILL = [1, 10, 40, 160, 640] as const

const ESSENCE_TO_ADVANCE = [100, 400, 1600, 6400, 25600] as const

const LIFE_OR_DEATH_ESSENCE = 1.5

const UNCYCLED_SHARE = 0.25

const STAGES = [
  { under: 0.25, stage: "early" },
  { under: 0.5, stage: "middle" },
  { under: 0.75, stage: "late" },
  { under: Number.POSITIVE_INFINITY, stage: "peak" },
] as const

type Rarity = keyof typeof RARITIES

const HOURS = z.number().min(0).default(0)

const USE = z.object({
  ability: z.string().trim().min(1),
  banked: z.number().int().min(0).default(0),
  held: z
    .object({
      level: z.number().int().min(1),
      rarity: z.enum(["common", "uncommon", "rare", "epic"]),
    })
    .optional(),
  practiceHours: HOURS,
  dangerHours: HOURS,
  lifeOrDeathHours: HOURS,
  taughtHours: HOURS,
})

const TURN = z.object({
  character: z.string().trim().min(1),
  tier: z
    .number()
    .int()
    .min(0)
    .max(ESSENCE_TO_ADVANCE.length - 1),
  essence: z.number().int().min(0),
  cycling: z.boolean(),
  calibrating: z.boolean().default(false),
  uses: z.array(USE).default([]),
  kills: z
    .array(
      z.object({
        tier: z
          .number()
          .int()
          .min(0)
          .max(ESSENCE_PER_KILL.length - 1),
        lifeOrDeath: z.boolean().default(false),
      })
    )
    .default([]),
  shards: z.number().int().min(0).default(0),
  stillwaterDays: z.number().int().min(0).default(0),
})

type Use = z.infer<typeof USE>

type Grown = {
  readonly ability: string
  readonly points: number
  readonly banked: number
  readonly level: number | null
  readonly rarity: Rarity | null
  readonly levelsGained: number
  readonly atPinnacle: boolean
  readonly offered: boolean
}

type Turned = {
  readonly uses: readonly Grown[]
  readonly essenceGained: number
  readonly essence: number
  readonly stage: (typeof STAGES)[number]["stage"]
  readonly readyToAdvance: boolean
}

type Settled = { readonly answered: Turned } | { readonly refused: string }

type Added = { readonly page: string; readonly key: string; readonly by: number }

export function levelCost(level: number, rarity: Rarity): number {
  const { perLevel, cap } = RARITIES[rarity]
  const hard = level >= cap - HARD_LEVELS_AT_THE_TOP
  return level * perLevel * (hard ? 2 : 1)
}

function pointsOf(use: Use): number {
  return Math.floor(
    use.practiceHours * POINTS_PER_HOUR.practice +
      use.dangerHours * POINTS_PER_HOUR.danger +
      use.lifeOrDeathHours * POINTS_PER_HOUR.lifeOrDeath +
      use.taughtHours * POINTS_PER_HOUR.taught
  )
}

function climbed(start: number, rarity: Rarity, pool: number) {
  const cap = RARITIES[rarity].cap
  let level = start
  let left = pool
  while (level < cap && left >= levelCost(level, rarity)) {
    left -= levelCost(level, rarity)
    level += 1
  }
  return { level, left, atPinnacle: level === cap }
}

function grown(use: Use, tier: number, calibrating: boolean): Grown {
  const points = pointsOf(use)
  const pool = use.banked + points
  const still = {
    ability: use.ability,
    points,
    banked: pool,
    level: use.held?.level ?? null,
    rarity: use.held?.rarity ?? null,
    levelsGained: 0,
    atPinnacle: false,
    offered: false,
  }
  if (tier === 0 && !calibrating) return still
  if (use.held !== undefined) {
    const { level, left, atPinnacle } = climbed(use.held.level, use.held.rarity, pool)
    return { ...still, banked: left, level, levelsGained: level - use.held.level, atPinnacle }
  }
  if (pool < POINTS_TO_LEARN) return still
  if (!calibrating) return { ...still, offered: true }
  const { level, left, atPinnacle } = climbed(1, "common", pool - POINTS_TO_LEARN)
  return {
    ...still,
    banked: left,
    level,
    rarity: "common",
    levelsGained: level,
    atPinnacle,
    offered: true,
  }
}

function essenceOf(turn: z.infer<typeof TURN>): number {
  const potency = 2 ** turn.tier
  const fromKills = turn.kills.reduce(
    (sum, kill) =>
      sum +
      ((ESSENCE_PER_KILL[kill.tier] ?? 0) * (kill.lifeOrDeath ? LIFE_OR_DEATH_ESSENCE : 1)) /
        potency,
    0
  )
  const gathered = fromKills + turn.shards
  const settledIn = turn.cycling ? gathered + turn.stillwaterDays : gathered * UNCYCLED_SHARE
  return Math.floor(settledIn)
}

export function settled(reading: unknown): Settled {
  const held = TURN.safeParse(reading)
  if (!held.success) return { refused: `a turn of growth reads so: ${z.prettifyError(held.error)}` }
  const turn = held.data
  const essenceGained = essenceOf(turn)
  const essence = turn.essence + essenceGained
  const need = ESSENCE_TO_ADVANCE[turn.tier] ?? Number.POSITIVE_INFINITY
  const share = essence / need
  return {
    answered: {
      uses: turn.uses.map((use) => grown(use, turn.tier, turn.calibrating)),
      essenceGained,
      essence,
      stage: STAGES.find((one) => share < one.under)?.stage ?? "peak",
      readyToAdvance: essence >= need,
    },
  }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = TURN.safeParse(reading)
  const turned = answered as Turned
  if (!held.success || turned.essenceGained === 0) return []
  return [
    {
      page: `${metricCharacterExperience.slug}/${held.data.character}`,
      key: "value",
      by: turned.essenceGained,
    },
  ]
}
