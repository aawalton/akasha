import { z } from "zod"

const HUNGRY_HOURS = 8

const STARVING_HOURS = 24

const TIRED_HOURS = 18

const EXHAUSTED_HOURS = 30

const SORE_MILES = 4

const MOST_PENALTY = 4

const WANTS = z.object({
  character: z.string().trim().min(1),
  hoursFed: z.number().min(0),
  hoursAwake: z.number().min(0),
  cold: z.enum(["warm", "chilled", "freezing"]).default("warm"),
  barefootMiles: z.number().min(0).default(0),
})

type Want = { readonly name: string; readonly weight: 1 | 2 }

type Weighed = { readonly wants: readonly string[]; readonly penalty: number }

type Settled = { readonly answered: Weighed } | { readonly refused: string }

type Reading = z.infer<typeof WANTS>

function hunger(hours: number): Want[] {
  if (hours >= STARVING_HOURS) return [{ name: "Starving", weight: 2 }]
  if (hours >= HUNGRY_HOURS) return [{ name: "Hungry", weight: 1 }]
  return []
}

function weariness(hours: number): Want[] {
  if (hours >= EXHAUSTED_HOURS) return [{ name: "Exhausted", weight: 2 }]
  if (hours >= TIRED_HOURS) return [{ name: "Tired", weight: 1 }]
  return []
}

function chill(cold: Reading["cold"]): Want[] {
  if (cold === "freezing") return [{ name: "Freezing", weight: 2 }]
  if (cold === "chilled") return [{ name: "Chilled", weight: 1 }]
  return []
}

export function settled(reading: unknown): Settled {
  const held = WANTS.safeParse(reading)
  if (!held.success) return { refused: `a turn's needs read so: ${z.prettifyError(held.error)}` }
  const turn = held.data
  const feet: Want[] = turn.barefootMiles >= SORE_MILES ? [{ name: "Sore Feet", weight: 1 }] : []
  const wants = [
    ...hunger(turn.hoursFed),
    ...weariness(turn.hoursAwake),
    ...chill(turn.cold),
    ...feet,
  ]
  const weight = wants.reduce((sum, want) => sum + want.weight, 0)
  return {
    answered: { wants: wants.map((want) => want.name), penalty: Math.min(MOST_PENALTY, weight) },
  }
}
