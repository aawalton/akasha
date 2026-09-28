import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, crushing: 8 } as const

const STRONG_EXTRA = 3

const LEAST = 1

const MOST_WARD = 6

const BLOW = z.object({
  force: z.enum(["light", "solid", "heavy", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(MOST_WARD).default(0),
})

type Harmed = { readonly harm: number }

type Settled = { readonly answered: Harmed } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, landed, ward } = held.data
  const raw = roll.total + FORCE[force] + (landed === "strong" ? STRONG_EXTRA : 0) - ward
  const dealt = landed === "cost" ? Math.floor(raw / 2) : raw
  return { answered: { harm: Math.max(LEAST, dealt) } }
}
