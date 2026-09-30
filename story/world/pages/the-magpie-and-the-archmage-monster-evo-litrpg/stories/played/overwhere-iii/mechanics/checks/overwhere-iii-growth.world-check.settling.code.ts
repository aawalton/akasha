import { overwhereIiiManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/pages/overwhere-iii-mana-weaver.overwhere-iii-trait.ts"
import { z } from "zod"

const PER_FOE_LEVEL = 10

const PER_WEAK_FOE_LEVEL = 2

const WEAK_BY = 5

const PER_DEED = 20

const PER_LEVEL = 100

const FOE = z.object({
  level: z.number().int().min(1),
  assisted: z.boolean().default(false),
})

const TURN = z.object({
  character: z.string().trim().min(1),
  level: z.number().int().min(1),
  experience: z.number().int().min(0),
  foes: z.array(FOE).default([]),
  deeds: z.number().int().min(0).default(0),
  rank: z.number().int().min(1),
  uses: z.number().int().min(0),
  telling: z.number().int().min(0).default(0),
})

type Grown = {
  readonly gained: number
  readonly experience: number
  readonly level: number
  readonly levelsGained: number
  readonly rank: number
  readonly uses: number
  readonly ranked: boolean
  readonly fullPotential: boolean
}

type Settled = { readonly answered: Grown } | { readonly refused: string }

type Foe = z.infer<typeof FOE>

function foeExperience(foe: Foe, level: number): number {
  const per = foe.level <= level - WEAK_BY ? PER_WEAK_FOE_LEVEL : PER_FOE_LEVEL
  const whole = foe.level * per
  return foe.assisted ? Math.floor(whole / 2) : whole
}

export function settled(reading: unknown): Settled {
  const held = TURN.safeParse(reading)
  if (!held.success) return { refused: `a turn's growth reads so: ${z.prettifyError(held.error)}` }
  const turn = held.data
  const topRank = overwhereIiiManaWeaver.ranks.length
  if (turn.rank > topRank) return { refused: `a rank past ${topRank} is no rank of the trait` }
  const earnings = [
    ...turn.foes.map((foe) => (at: number) => foeExperience(foe, at)),
    ...Array.from({ length: turn.deeds }, () => (at: number) => PER_DEED * at),
  ]
  let gained = 0
  let experience = turn.experience
  let level = turn.level
  for (const earning of earnings) {
    const earned = earning(level)
    gained += earned
    experience += earned
    while (experience >= PER_LEVEL * level) {
      experience -= PER_LEVEL * level
      level += 1
    }
  }
  const perRank = overwhereIiiManaWeaver.rankUses ?? 1
  let uses = turn.uses + turn.telling
  let rank = turn.rank
  while (rank < topRank && uses >= perRank * rank) {
    uses -= perRank * rank
    rank += 1
  }
  return {
    answered: {
      gained,
      experience,
      level,
      levelsGained: level - turn.level,
      rank,
      uses,
      ranked: rank > turn.rank,
      fullPotential: rank === topRank && uses >= perRank * rank,
    },
  }
}
