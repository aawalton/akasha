import { z } from "zod"

const HUNGER = [
  { under: 6, state: "fed", penalty: 0 },
  { under: 12, state: "peckish", penalty: 0 },
  { under: 24, state: "hungry", penalty: 1 },
  { under: Number.POSITIVE_INFINITY, state: "starving", penalty: 2 },
] as const

const THIRST = [
  { under: 4, state: "quenched", penalty: 0 },
  { under: 10, state: "thirsty", penalty: 0 },
  { under: 24, state: "parched", penalty: 1 },
  { under: Number.POSITIVE_INFINITY, state: "failing", penalty: 2 },
] as const

const FATIGUE = [
  { under: 16, state: "rested", penalty: 0 },
  { under: 20, state: "tired", penalty: 0 },
  { under: 30, state: "weary", penalty: 1 },
  { under: Number.POSITIVE_INFINITY, state: "spent", penalty: 2 },
] as const

const PAST_EVERY_BAND: Band = { under: Number.POSITIVE_INFINITY, state: "spent", penalty: 2 }

const COLD_PENALTY = 1

const MOST_PENALTY = 4

const BODY = z.object({
  hoursSinceMeal: z.number().min(0),
  hoursSinceDrink: z.number().min(0),
  hoursAwake: z.number().min(0),
  cold: z.boolean().default(false),
  sheltered: z.boolean().default(true),
})

type Band = { readonly under: number; readonly state: string; readonly penalty: number }

type Needs = {
  readonly hunger: string
  readonly thirst: string
  readonly fatigue: string
  readonly chilled: boolean
  readonly penalty: number
}

type Settled = { readonly answered: Needs } | { readonly refused: string }

function bandOf(bands: readonly Band[], hours: number): Band {
  return bands.find((band) => hours < band.under) ?? PAST_EVERY_BAND
}

export function settled(reading: unknown): Settled {
  const held = BODY.safeParse(reading)
  if (!held.success) return { refused: `a body reads so: ${z.prettifyError(held.error)}` }
  const body = held.data
  const hunger = bandOf(HUNGER, body.hoursSinceMeal)
  const thirst = bandOf(THIRST, body.hoursSinceDrink)
  const fatigue = bandOf(FATIGUE, body.hoursAwake)
  const chilled = body.cold && !body.sheltered
  const raw = hunger.penalty + thirst.penalty + fatigue.penalty + (chilled ? COLD_PENALTY : 0)
  return {
    answered: {
      hunger: hunger.state,
      thirst: thirst.state,
      fatigue: fatigue.state,
      chilled,
      penalty: Math.min(MOST_PENALTY, raw),
    },
  }
}
