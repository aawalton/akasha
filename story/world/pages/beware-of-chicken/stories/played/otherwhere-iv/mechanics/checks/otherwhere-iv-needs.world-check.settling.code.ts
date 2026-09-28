import { z } from "zod"

type Ladder = {
  readonly stages: readonly string[]
  readonly from: readonly number[]
  readonly harm: Readonly<Record<string, number>>
}

const LADDERS = {
  thirst: {
    stages: ["slaked", "thirsty", "parched", "failing", "dying"],
    from: [8, 16, 28, 48],
    harm: { failing: 1, dying: 3 },
  },
  hunger: { stages: ["fed", "hungry", "weak", "starving"], from: [10, 30, 72], harm: {} },
  sleep: { stages: ["rested", "tired", "exhausted", "spent"], from: [18, 28, 44], harm: {} },
  cold: {
    stages: ["nothing", "chilled", "cold", "freezing"],
    from: [2, 6, 12],
    harm: { freezing: 1 },
  },
} as const satisfies Record<string, Ladder>

const HOURS = z.number().min(0)

const GOING_WITHOUT = z.object({
  character: z.string().trim().min(1),
  sinceDrink: HOURS,
  sinceMeal: HOURS,
  awake: HOURS,
  coldHours: HOURS.default(0),
})

type Need = keyof typeof LADDERS

type Reached = {
  readonly hours: number
  readonly stage: string
  readonly bonus: number
  readonly harmPerHour: number
}

type Settled =
  | { readonly answered: { readonly [need in Need]: Reached } }
  | { readonly refused: string }

function reached(ladder: Ladder, hours: number): Reached {
  const climbed = ladder.from.filter((mark) => hours >= mark).length
  const stage = ladder.stages[climbed] ?? ""
  return { hours, stage, bonus: 0 - climbed, harmPerHour: ladder.harm[stage] ?? 0 }
}

export function settled(reading: unknown): Settled {
  const held = GOING_WITHOUT.safeParse(reading)
  if (!held.success) return { refused: `needs read so: ${z.prettifyError(held.error)}` }
  const body = held.data
  return {
    answered: {
      thirst: reached(LADDERS.thirst, body.sinceDrink),
      hunger: reached(LADDERS.hunger, body.sinceMeal),
      sleep: reached(LADDERS.sleep, body.awake),
      cold: reached(LADDERS.cold, body.coldHours),
    },
  }
}
