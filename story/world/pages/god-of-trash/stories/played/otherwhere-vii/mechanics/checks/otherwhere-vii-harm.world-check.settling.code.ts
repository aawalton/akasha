import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE_ON_THE_ROAD = { light: 0, solid: 2, heavy: 4, crushing: 8 } as const

const LANDED_STRONGLY_ADDS = 3

const LEAST_HARM = 1

const THICKEST_WARD = 6

const BLOW_ON_THE_ROAD = z.object({
  force: z.enum(["light", "solid", "heavy", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(THICKEST_WARD).default(0),
})

type Hurt = { readonly harm: number }

type Settled = { readonly answered: Hurt } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW_ON_THE_ROAD.safeParse(reading)
  if (!held.success)
    return { refused: `a blow on the road reads so: ${z.prettifyError(held.error)}` }
  const blow = held.data
  const bonus = blow.landed === "strong" ? LANDED_STRONGLY_ADDS : 0
  const full = roll.total + FORCE_ON_THE_ROAD[blow.force] + bonus - blow.ward
  const dealt = blow.landed === "cost" ? Math.floor(full / 2) : full
  return { answered: { harm: Math.max(LEAST_HARM, dealt) } }
}
