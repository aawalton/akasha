import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE_IN_THE_WEALD = { light: 0, solid: 3, heavy: 7, crushing: 14 } as const

const LANDED_STRONGLY_ADDS = 4

const LEAST_HARM = 1

const THICKEST_WARD = 10

const MOST_MIGHT = 10

const BLOW_IN_THE_WEALD = z.object({
  force: z.enum(["light", "solid", "heavy", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(THICKEST_WARD).default(0),
  might: z.number().int().min(0).max(MOST_MIGHT).default(0),
})

type Hurt = { readonly harm: number }

type Settled = { readonly answered: Hurt } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW_IN_THE_WEALD.safeParse(reading)
  if (!held.success)
    return { refused: `a blow in the Weald reads so: ${z.prettifyError(held.error)}` }
  const blow = held.data
  const bonus = blow.landed === "strong" ? LANDED_STRONGLY_ADDS : 0
  const full = roll.total + FORCE_IN_THE_WEALD[blow.force] + blow.might + bonus - blow.ward
  const dealt = blow.landed === "cost" ? Math.floor(full / 2) : full
  return { answered: { harm: Math.max(LEAST_HARM, dealt) } }
}
