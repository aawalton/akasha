import { z } from "zod"

const GRADES = ["G", "F", "E", "D", "C", "B", "A"] as const

type Grade = (typeof GRADES)[number]

const GRADE_FROM_LEVEL: readonly { readonly below: number; readonly grade: Grade }[] = [
  { below: 5, grade: "G" },
  { below: 100, grade: "F" },
  { below: 300, grade: "E" },
  { below: 1000, grade: "D" },
  { below: Number.POSITIVE_INFINITY, grade: "C" },
]

const LEVELS_BY_GRADES_ABOVE: Record<number, number> = { 0: 1, 1: 3, 2: 6, 3: 10 }

const MOST_GRADES_COUNTED = 3

const PACE: readonly { readonly below: number; readonly share: number }[] = [
  { below: 25, share: 1 },
  { below: 50, share: 1 / 2 },
  { below: 100, share: 1 / 4 },
  { below: Number.POSITIVE_INFINITY, share: 1 / 8 },
]

const TRAINING_HOURS_PER_LEVEL = 4

const POINTS_PER_LEVEL = 8

const CHALLENGE = z.object({
  grade: z.enum(GRADES),
  outcome: z.enum(["overcome", "survived", "failed"]),
})

const TURN = z.object({
  character: z.string().trim().min(1),
  level: z.number().int().min(1),
  challenges: z.array(CHALLENGE).default([]),
  trainingHours: z.number().min(0).default(0),
  constitution: z.number().int().min(0),
  spirit: z.number().int().min(0),
})

type Grown = {
  readonly levelsGained: number
  readonly level: number
  readonly grade: Grade
  readonly pointsGained: number
  readonly maxHealth: number
  readonly maxMana: number
}

type Settled = { readonly answered: Grown } | { readonly refused: string }

export function gradeOfLevel(level: number): Grade {
  return GRADE_FROM_LEVEL.find((one) => level < one.below)?.grade ?? "C"
}

function rawLevels(own: Grade, challenge: z.infer<typeof CHALLENGE>): number {
  if (challenge.outcome === "failed") return 0
  const above = Math.min(MOST_GRADES_COUNTED, GRADES.indexOf(challenge.grade) - GRADES.indexOf(own))
  const full = above < 0 ? 0 : (LEVELS_BY_GRADES_ABOVE[above] ?? 0)
  return challenge.outcome === "survived" ? Math.floor(full / 2) : full
}

export function maxHealthOf(constitution: number): number {
  const base = 50 + 10 * constitution
  return constitution >= 100 ? Math.round((base * 4) / 3) : base
}

export function maxManaOf(spirit: number, constitution: number): number {
  const base = 20 * spirit + 2 * constitution
  return spirit >= 100 ? Math.round(base * 1.5) : base
}

export function settled(reading: unknown): Settled {
  const held = TURN.safeParse(reading)
  if (!held.success) return { refused: `a turn of growth reads so: ${z.prettifyError(held.error)}` }
  const { level, challenges, trainingHours, constitution, spirit } = held.data
  const own = gradeOfLevel(level)
  const raw =
    challenges.reduce((sum, one) => sum + rawLevels(own, one), 0) +
    Math.floor(trainingHours / TRAINING_HOURS_PER_LEVEL)
  const share = PACE.find((one) => level < one.below)?.share ?? 1 / 8
  const levelsGained = raw === 0 ? 0 : Math.max(1, Math.floor(raw * share))
  const reached = level + levelsGained
  return {
    answered: {
      levelsGained,
      level: reached,
      grade: gradeOfLevel(reached),
      pointsGained: levelsGained * POINTS_PER_LEVEL,
      maxHealth: maxHealthOf(constitution),
      maxMana: maxManaOf(spirit, constitution),
    },
  }
}
