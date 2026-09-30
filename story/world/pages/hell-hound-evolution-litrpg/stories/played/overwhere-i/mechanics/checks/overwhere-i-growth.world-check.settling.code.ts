import { z } from "zod"

const MARKS_BY_FOE = [
  { atLeastAbove: 5, marks: 3 },
  { atLeastAbove: 0, marks: 2 },
  { atLeastAbove: -5, marks: 1 },
] as const

const STATS_PER_LEVEL = { strength: 2, dexterity: 2, vigor: 2, attunement: 4, luck: 1 } as const

const TOP_SKILL_LEVEL = 10

const SKILL_STAT_PER_RISE = 3

const TOP_LEGACY_RANK = 5

const LEVELS_ABOVE_PER_RANK = 10

const RESERVE_PER_RANK = 10

const LEVEL = z.object({
  kind: z.literal("level"),
  level: z.number().int().min(1),
  marks: z.number().int().min(0),
  foeLevel: z.number().int().min(0),
})

const SKILL = z.object({
  kind: z.literal("skill"),
  skill: z.string().trim().min(1),
  level: z.number().int().min(1).max(TOP_SKILL_LEVEL),
  uses: z.number().int().min(0),
  novel: z.boolean().default(false),
})

const LEGACY = z.object({
  kind: z.literal("legacy"),
  rank: z.number().int().min(1).max(TOP_LEGACY_RANK),
  level: z.number().int().min(1),
  featLevel: z.number().int().min(0),
})

const GROWING = z.object({
  character: z.string().trim().min(1),
  gains: z.array(z.discriminatedUnion("kind", [LEVEL, SKILL, LEGACY])).min(1),
})

type Stats = { readonly [stat in keyof typeof STATS_PER_LEVEL]: number }

type LevelGrown = {
  readonly kind: "level"
  readonly from: number
  readonly to: number
  readonly earned: number
  readonly marksLeft: number
  readonly stats: Stats
}

type SkillGrown = {
  readonly kind: "skill"
  readonly skill: string
  readonly from: number
  readonly to: number
  readonly usesLeft: number
  readonly stat: number
}

type LegacyGrown = {
  readonly kind: "legacy"
  readonly from: number
  readonly to: number
  readonly reserve: number
  readonly newWays: number
}

type Grown = LevelGrown | SkillGrown | LegacyGrown

type Settled =
  | { readonly answered: { readonly grown: readonly Grown[] } }
  | { readonly refused: string }

function marksFor(level: number, foeLevel: number): number {
  return MARKS_BY_FOE.find((one) => foeLevel >= level + one.atLeastAbove)?.marks ?? 0
}

type Start = { readonly level: number; readonly marks: number }

function grownLevel(gain: z.infer<typeof LEVEL>, start: Start): LevelGrown {
  const earned = marksFor(start.level, gain.foeLevel)
  let marks = start.marks + earned
  let level = start.level
  while (marks >= level + 1) {
    marks -= level + 1
    level += 1
  }
  const risen = level - start.level
  return {
    kind: "level",
    from: start.level,
    to: level,
    earned,
    marksLeft: marks,
    stats: {
      strength: STATS_PER_LEVEL.strength * risen,
      dexterity: STATS_PER_LEVEL.dexterity * risen,
      vigor: STATS_PER_LEVEL.vigor * risen,
      attunement: STATS_PER_LEVEL.attunement * risen,
      luck: STATS_PER_LEVEL.luck * risen,
    },
  }
}

function grownSkill(gain: z.infer<typeof SKILL>): SkillGrown {
  const enough = gain.uses >= 2 * gain.level || (gain.novel && gain.uses >= gain.level)
  const rises = enough && gain.level < TOP_SKILL_LEVEL
  return {
    kind: "skill",
    skill: gain.skill,
    from: gain.level,
    to: rises ? gain.level + 1 : gain.level,
    usesLeft: rises ? 0 : gain.uses,
    stat: rises ? SKILL_STAT_PER_RISE : 0,
  }
}

function grownLegacy(gain: z.infer<typeof LEGACY>): LegacyGrown {
  const enough = gain.featLevel >= gain.level + LEVELS_ABOVE_PER_RANK * gain.rank
  const rises = enough && gain.rank < TOP_LEGACY_RANK
  return {
    kind: "legacy",
    from: gain.rank,
    to: rises ? gain.rank + 1 : gain.rank,
    reserve: rises ? RESERVE_PER_RANK : 0,
    newWays: rises ? 1 : 0,
  }
}

export function settled(reading: unknown): Settled {
  const held = GROWING.safeParse(reading)
  if (!held.success) return { refused: `growth reads so: ${z.prettifyError(held.error)}` }
  let start: Start | null = null
  const grown = held.data.gains.map((gain): Grown => {
    if (gain.kind === "skill") return grownSkill(gain)
    if (gain.kind === "legacy") return grownLegacy(gain)
    const level = grownLevel(gain, start ?? gain)
    start = { level: level.to, marks: level.marksLeft }
    return level
  })
  return { answered: { grown } }
}
