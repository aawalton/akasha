import { z } from "zod"

const TIER_BASE = [0, 10, 35, 85, 185] as const

const MOST_FROM_ONE_KILL = 12

const NAMED_TIMES = 3

const MEAL_SHARE = 4

const FIRST_LEVEL_COST = 4

const TIER = z
  .number()
  .int()
  .min(0)
  .max(TIER_BASE.length - 1)

const LEVEL = z.number().int().min(1)

const KILL = z.object({
  kind: z.literal("kill"),
  from: z.string().trim().min(1),
  tier: TIER,
  level: LEVEL,
  named: z.boolean().default(false),
  shared: z.number().int().min(1).default(1),
})

const MEAL = z.object({
  kind: z.literal("meal"),
  from: z.string().trim().min(1),
  tier: TIER,
  level: LEVEL,
})

const FEAT = z.object({
  kind: z.literal("feat"),
  from: z.string().trim().min(1),
  points: z.number().int().min(1).max(5),
})

const GROWING = z.object({
  tier: TIER,
  level: LEVEL,
  cap: LEVEL,
  progress: z.number().int().min(0),
  gains: z.array(z.discriminatedUnion("kind", [KILL, MEAL, FEAT])).min(1),
})

type Grown = {
  readonly gained: number
  readonly levels: number
  readonly level: number
  readonly progress: number
  readonly capped: boolean
}

type Settled = { readonly answered: Grown } | { readonly refused: string }

function power(tier: number, level: number): number {
  return (TIER_BASE[tier] ?? 0) + level
}

function killPoints(own: number, tier: number, level: number): number {
  const over = power(tier, level) - own + 5
  return Math.max(0, Math.min(MOST_FROM_ONE_KILL, over))
}

function costOf(tier: number, level: number): number {
  return (FIRST_LEVEL_COST + level) * (tier + 1)
}

export function settled(reading: unknown): Settled {
  const held = GROWING.safeParse(reading)
  if (!held.success) return { refused: `growth reads so: ${z.prettifyError(held.error)}` }
  const growing = held.data
  if (growing.level > growing.cap) return { refused: "a level is never past its cap" }
  const own = power(growing.tier, growing.level)
  const gained = growing.gains.reduce((sum, gain) => {
    if (gain.kind === "feat") return sum + gain.points
    const points = killPoints(own, gain.tier, gain.level)
    if (gain.kind === "meal") return sum + Math.floor(points / MEAL_SHARE)
    const whole = points * (gain.named ? NAMED_TIMES : 1)
    return sum + Math.floor(whole / gain.shared)
  }, 0)
  let level = growing.level
  let progress = growing.progress + gained
  while (level < growing.cap && progress >= costOf(growing.tier, level)) {
    progress -= costOf(growing.tier, level)
    level += 1
  }
  const capped = level >= growing.cap
  return {
    answered: {
      gained,
      levels: level - growing.level,
      level,
      progress: capped ? 0 : progress,
      capped,
    },
  }
}
