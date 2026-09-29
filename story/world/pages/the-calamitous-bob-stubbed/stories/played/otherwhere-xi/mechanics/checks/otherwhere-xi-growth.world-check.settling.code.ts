import { z } from "zod"

const STATS = ["power", "finesse", "endurance", "focus", "acuity", "willpower"] as const

const DAYS_PER_RISE = [
  { below: 10, days: 1 },
  { below: 20, days: 2 },
  { below: 30, days: 4 },
  { below: 40, days: 8 },
  { below: Number.POSITIVE_INFINITY, days: 16 },
] as const

const RANKS = ["Novice", "Beginner", "Apprentice", "Intermediate", "Expert", "Master"] as const

type Rank = (typeof RANKS)[number]

const USES_PER_LEVEL: Record<Rank, number> = {
  Novice: 2,
  Beginner: 3,
  Apprentice: 4,
  Intermediate: 6,
  Expert: 10,
  Master: 20,
}

const TOP_LEVEL = 9

const ATTUNEMENT_STEP = 0.1

const FEELS_MANA_AT = 1

const CASTS_AT = 3

const SLOWS_AT = 10

const MOST_PRACTICE_HOURS = 3

const STAT = z.object({
  kind: z.literal("stat"),
  stat: z.enum(STATS),
  value: z.number().int().min(0),
  earnestDays: z.number().int().min(0),
  outlander: z.boolean().default(false),
})

const ATTUNEMENT = z.object({
  kind: z.literal("attunement"),
  value: z.number().min(0).max(100),
  locusDays: z.number().int().min(0).default(0),
  practiceHours: z.number().int().min(0).max(MOST_PRACTICE_HOURS).default(0),
  magicTouches: z.number().int().min(0).default(0),
  firstSeason: z.boolean().default(false),
})

const SKILL = z.object({
  kind: z.literal("skill"),
  skill: z.string().trim().min(1),
  rank: z.enum(RANKS),
  level: z.number().int().min(1).max(TOP_LEVEL),
  uses: z.number().int().min(0),
})

const GROWING = z.object({
  character: z.string().trim().min(1),
  gains: z.array(z.discriminatedUnion("kind", [STAT, ATTUNEMENT, SKILL])).min(1),
})

type StatGrown = {
  readonly kind: "stat"
  readonly stat: (typeof STATS)[number]
  readonly from: number
  readonly to: number
  readonly daysCarried: number
  readonly milestones: readonly number[]
}

type AttunementGrown = {
  readonly kind: "attunement"
  readonly from: number
  readonly to: number
  readonly feelsMana: boolean
  readonly casts: boolean
}

type SkillGrown = {
  readonly kind: "skill"
  readonly skill: string
  readonly from: { readonly rank: Rank; readonly level: number }
  readonly to: { readonly rank: Rank; readonly level: number }
  readonly usesCarried: number
  readonly expertChoice: boolean
}

type Grown = StatGrown | AttunementGrown | SkillGrown

type Settled =
  | { readonly answered: { readonly grown: readonly Grown[] } }
  | { readonly refused: string }

function daysFor(value: number): number {
  return DAYS_PER_RISE.find((one) => value < one.below)?.days ?? 16
}

function grownStat(gain: z.infer<typeof STAT>): StatGrown {
  let days = gain.earnestDays * (gain.outlander ? 2 : 1)
  let value = gain.value
  const milestones: number[] = []
  while (days >= daysFor(value)) {
    days -= daysFor(value)
    value += 1
    if (value % 10 === 0) milestones.push(value)
  }
  return {
    kind: "stat",
    stat: gain.stat,
    from: gain.value,
    to: value,
    daysCarried: gain.outlander ? Math.floor(days / 2) : days,
    milestones,
  }
}

function grownAttunement(gain: z.infer<typeof ATTUNEMENT>): AttunementGrown {
  const practice = gain.value >= FEELS_MANA_AT ? gain.practiceHours : 0
  const steps = gain.locusDays + practice + gain.magicTouches
  const doubled = gain.firstSeason ? 2 : 1
  const slowed = gain.value >= SLOWS_AT ? 0.5 : 1
  const raised = gain.value + steps * ATTUNEMENT_STEP * doubled * slowed
  const to = Math.min(100, Number(raised.toFixed(1)))
  return {
    kind: "attunement",
    from: gain.value,
    to,
    feelsMana: gain.value < FEELS_MANA_AT && to >= FEELS_MANA_AT,
    casts: gain.value < CASTS_AT && to >= CASTS_AT,
  }
}

function grownSkill(gain: z.infer<typeof SKILL>): SkillGrown {
  let rank: Rank = gain.rank
  let level = gain.level
  let uses = gain.uses
  let expertChoice = false
  while (uses >= USES_PER_LEVEL[rank]) {
    if (level === TOP_LEVEL) {
      if (rank === "Intermediate") {
        expertChoice = true
        break
      }
      const next = RANKS[RANKS.indexOf(rank) + 1]
      if (next === undefined) break
      uses -= USES_PER_LEVEL[rank]
      rank = next
      level = 1
      continue
    }
    uses -= USES_PER_LEVEL[rank]
    level += 1
  }
  return {
    kind: "skill",
    skill: gain.skill,
    from: { rank: gain.rank, level: gain.level },
    to: { rank, level },
    usesCarried: uses,
    expertChoice,
  }
}

export function settled(reading: unknown): Settled {
  const held = GROWING.safeParse(reading)
  if (!held.success) return { refused: `growth reads so: ${z.prettifyError(held.error)}` }
  const grown = held.data.gains.map((gain): Grown => {
    if (gain.kind === "stat") return grownStat(gain)
    if (gain.kind === "attunement") return grownAttunement(gain)
    return grownSkill(gain)
  })
  return { answered: { grown } }
}
