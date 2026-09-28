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
} as const

const HEAT_WEIGHT = 2

const WHOLE = 100

const NEEDS = z.object({
  character: z.string().trim().min(1),
  sinceDrink: z.number().min(0),
  hotHours: z.number().min(0).default(0),
  sinceMeal: z.number().min(0),
  awake: z.number().min(0),
  lessenedBy: z.number().int().min(0).max(WHOLE).default(0),
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

function felt(need: Need, hours: number, lessenedBy: number): Felt {
  const weight = Math.round(hours * (1 - lessenedBy / WHOLE) * 10) / 10
  const stages: readonly Stage[] = STAGES[need]
  const found = stages.find((one) => weight < one.under) ?? stages[0]
  return {
    weight,
    stage: found?.stage ?? "slaked",
    bonus: found?.by ?? 0,
    harmPerHour: found?.harmPerHour ?? 0,
  }
}

export function settled(reading: unknown): Settled {
  const held = NEEDS.safeParse(reading)
  if (!held.success) return { refused: `needs read so: ${z.prettifyError(held.error)}` }
  const { sinceDrink, hotHours, sinceMeal, awake, lessenedBy } = held.data
  if (hotHours > sinceDrink) return { refused: "the hot hours are among the hours since a drink" }
  return {
    answered: {
      thirst: felt("thirst", sinceDrink + hotHours * (HEAT_WEIGHT - 1), lessenedBy),
      hunger: felt("hunger", sinceMeal, lessenedBy),
      sleep: felt("sleep", awake, lessenedBy),
    },
  }
}
