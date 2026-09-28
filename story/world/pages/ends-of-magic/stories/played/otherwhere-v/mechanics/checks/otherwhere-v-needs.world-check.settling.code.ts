import { z } from "zod"

const STAGES = {
  thirst: [
    { under: 6, stage: "slaked", by: 0, harmPerHour: 0 },
    { under: 12, stage: "thirsty", by: -1, harmPerHour: 0 },
    { under: 20, stage: "parched", by: -2, harmPerHour: 0 },
    { under: 30, stage: "failing", by: -3, harmPerHour: 1 },
    { under: Number.POSITIVE_INFINITY, stage: "dying", by: -4, harmPerHour: 3 },
  ],
  hunger: [
    { under: 12, stage: "fed", by: 0, harmPerHour: 0 },
    { under: 36, stage: "hungry", by: -1, harmPerHour: 0 },
    { under: 96, stage: "weak", by: -2, harmPerHour: 0 },
    { under: Number.POSITIVE_INFINITY, stage: "starving", by: -3, harmPerHour: 0 },
  ],
  sleep: [
    { under: 18, stage: "rested", by: 0, harmPerHour: 0 },
    { under: 26, stage: "tired", by: -1, harmPerHour: 0 },
    { under: 40, stage: "exhausted", by: -2, harmPerHour: 0 },
    { under: Number.POSITIVE_INFINITY, stage: "spent", by: -3, harmPerHour: 0 },
  ],
  cold: [
    { under: 1, stage: "warm", by: 0, harmPerHour: 0 },
    { under: 3, stage: "chilled", by: -1, harmPerHour: 0 },
    { under: 6, stage: "shivering", by: -2, harmPerHour: 0 },
    { under: Number.POSITIVE_INFINITY, stage: "freezing", by: -4, harmPerHour: 2 },
  ],
} as const

const WET_WEIGHT = 2

const NEEDS = z.object({
  character: z.string().trim().min(1),
  sinceDrink: z.number().min(0),
  sinceMeal: z.number().min(0),
  awake: z.number().min(0),
  coldHours: z.number().min(0).default(0),
  wet: z.boolean().default(false),
})

type Need = keyof typeof STAGES

type Stage = (typeof STAGES)[Need][number]

type Felt = {
  readonly weight: number
  readonly stage: Stage["stage"]
  readonly bonus: number
  readonly harmPerHour: number
}

type Settled =
  | { readonly answered: { readonly [need in Need]: Felt } }
  | { readonly refused: string }

function felt(need: Need, weight: number): Felt {
  const stages: readonly Stage[] = STAGES[need]
  const found = stages.find((one) => weight < one.under)
  return {
    weight,
    stage: found?.stage ?? "warm",
    bonus: found?.by ?? 0,
    harmPerHour: found?.harmPerHour ?? 0,
  }
}

export function settled(reading: unknown): Settled {
  const held = NEEDS.safeParse(reading)
  if (!held.success) return { refused: `needs read so: ${z.prettifyError(held.error)}` }
  const { sinceDrink, sinceMeal, awake, coldHours, wet } = held.data
  return {
    answered: {
      thirst: felt("thirst", sinceDrink),
      hunger: felt("hunger", sinceMeal),
      sleep: felt("sleep", awake),
      cold: felt("cold", wet ? coldHours * WET_WEIGHT : coldHours),
    },
  }
}
