import { z } from "zod"

const EXPERIENCE_PER_LEVEL = 10

const POINTS_PER_LEVEL = 1

const EXTRA_POINT_EVERY = 10

const USES_TO_NEXT = [3, 2, 3, 3, 4, 4, 5, 6, 8, 10] as const

const MAX_LEVEL = 10

const EXPERIENCE = z.object({
  kind: z.literal("experience"),
  track: z.enum(["race", "class"]),
  level: z.number().int().min(1),
  experience: z.number().int().min(0),
  foes: z.array(z.number().int().min(1)).default([]),
  pests: z.number().int().min(0).default(0),
  deeds: z.number().int().min(0).default(0),
})

const SKILL = z.object({
  kind: z.literal("skill"),
  skill: z.string().trim().min(1),
  level: z.number().int().min(0).max(MAX_LEVEL),
  uses: z.number().int().min(0),
})

const GROWING = z.object({
  character: z.string().trim().min(1),
  gains: z.array(z.discriminatedUnion("kind", [EXPERIENCE, SKILL])).min(1),
})

type ExperienceGrown = {
  readonly kind: "experience"
  readonly track: "race" | "class"
  readonly from: number
  readonly to: number
  readonly experience: number
  readonly next: number
  readonly points: number
}

type SkillGrown = {
  readonly kind: "skill"
  readonly skill: string
  readonly from: number
  readonly to: number
  readonly usesCarried: number
  readonly maxed: boolean
}

type Grown = ExperienceGrown | SkillGrown

type Settled =
  | { readonly answered: { readonly grown: readonly Grown[] } }
  | { readonly refused: string }

function needFor(level: number): number {
  return level * EXPERIENCE_PER_LEVEL
}

function worth(foe: number, level: number): number {
  if (foe >= level) return foe * 2
  if (foe * 2 < level) return 1
  return foe
}

function grownExperience(gain: z.infer<typeof EXPERIENCE>): ExperienceGrown {
  let experience = gain.experience
  let level = gain.level
  let points = 0
  const rise = (earned: number): undefined => {
    experience += earned
    while (experience >= needFor(level)) {
      experience -= needFor(level)
      level += 1
      points += POINTS_PER_LEVEL + (level % EXTRA_POINT_EVERY === 0 ? 1 : 0)
    }
  }
  for (const foe of gain.foes) rise(worth(foe, level))
  rise(gain.pests + gain.deeds)
  return {
    kind: "experience",
    track: gain.track,
    from: gain.level,
    to: level,
    experience,
    next: needFor(level),
    points,
  }
}

function grownSkill(gain: z.infer<typeof SKILL>): SkillGrown {
  let level = gain.level
  let uses = gain.uses
  while (level < MAX_LEVEL) {
    const need = USES_TO_NEXT[level] ?? Number.POSITIVE_INFINITY
    if (uses < need) break
    uses -= need
    level += 1
  }
  return {
    kind: "skill",
    skill: gain.skill,
    from: gain.level,
    to: level,
    usesCarried: level === MAX_LEVEL ? 0 : uses,
    maxed: level === MAX_LEVEL,
  }
}

export function settled(reading: unknown): Settled {
  const held = GROWING.safeParse(reading)
  if (!held.success) return { refused: `growth reads so: ${z.prettifyError(held.error)}` }
  const grown = held.data.gains.map(
    (gain): Grown => (gain.kind === "experience" ? grownExperience(gain) : grownSkill(gain))
  )
  return { answered: { grown } }
}
