import { z } from "zod"

const LEVELS_FOR = { none: 0, minor: 0, real: 1, dangerous: 2, dire: 3, deadly: 6 } as const

const DISADVANTAGE_TIMES = 2

const CLASS_AT = 9

const DEVELOPS_AT = [27, 81, 243, 729, 2187] as const

const RANKS_FOR = { strong: 2, success: 1, cost: 1 } as const

const RANKS_BETWEEN_DEVELOPMENTS = 10

const USE = z.object({
  name: z.string().trim().min(1),
  rank: z.number().int().min(1),
  used: z.enum(["strong", "success", "cost"]),
  insightHeld: z.boolean().default(false),
})

const TURN = z.object({
  character: z.string().trim().min(1),
  challenge: z.enum(["none", "minor", "real", "dangerous", "dire", "deadly"]),
  disadvantaged: z.boolean(),
  level: z.number().int().min(1),
  hasClass: z.boolean(),
  uses: z.array(USE).default([]),
})

type Ranked = {
  readonly name: string
  readonly from: number
  readonly to: number
  readonly awaitingInsight: boolean
  readonly developed: boolean
}

type Grown = {
  readonly levelsGained: number
  readonly level: number
  readonly shown: string
  readonly classDue: boolean
  readonly classDevelops: boolean
  readonly ranks: readonly Ranked[]
}

type Settled = { readonly answered: Grown } | { readonly refused: string }

function slowing(level: number): number {
  const passed = DEVELOPS_AT.filter((at) => level >= at).length
  return 2 ** passed
}

function ranked(use: z.infer<typeof USE>, disadvantaged: boolean): Ranked {
  const gained = RANKS_FOR[use.used] + (disadvantaged ? 1 : 0)
  const gate = Math.ceil(use.rank / RANKS_BETWEEN_DEVELOPMENTS) * RANKS_BETWEEN_DEVELOPMENTS
  const reached = use.rank + gained
  const base = { name: use.name, from: use.rank }
  if (reached < gate) return { ...base, to: reached, awaitingInsight: false, developed: false }
  if (use.insightHeld) return { ...base, to: 1, awaitingInsight: false, developed: true }
  return { ...base, to: gate, awaitingInsight: true, developed: false }
}

export function settled(reading: unknown): Settled {
  const held = TURN.safeParse(reading)
  if (!held.success) return { refused: `a turn's growth reads so: ${z.prettifyError(held.error)}` }
  const { challenge, disadvantaged, level, hasClass, uses } = held.data
  const base = LEVELS_FOR[challenge] * (disadvantaged ? DISADVANTAGE_TIMES : 1)
  const levelsGained = Math.floor(base / slowing(level))
  const reached = level + levelsGained
  const classDue = !hasClass && reached >= CLASS_AT
  const shown = classDue ? `${CLASS_AT}+` : String(reached)
  const classDevelops = hasClass && DEVELOPS_AT.some((at) => level < at && reached >= at)
  const rankReached = new Map<string, number>()
  const ranks = uses.map((use) => {
    const one = ranked({ ...use, rank: rankReached.get(use.name) ?? use.rank }, disadvantaged)
    rankReached.set(use.name, one.to)
    return one
  })
  return {
    answered: {
      levelsGained,
      level: reached,
      shown,
      classDue,
      classDevelops,
      ranks,
    },
  }
}
