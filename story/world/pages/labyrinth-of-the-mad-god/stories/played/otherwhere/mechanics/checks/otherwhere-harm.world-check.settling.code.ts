import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, savage: 7, crushing: 10 } as const

const LANDED = { strong: 3, success: 0, cost: 0 } as const

const HUMAN_TOUGHNESS = 6

const TOUGHNESS_STEP = 3

const MOST_WARD = 8

const LEAST = 1

const BLOW = z.object({
  force: z.enum(["light", "solid", "heavy", "savage", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(MOST_WARD).default(0),
  toughness: z.number().int().min(0).optional(),
})

type Settled = { readonly answered: { readonly harm: number } } | { readonly refused: string }

function shrugged(toughness: number | undefined): number {
  if (toughness === undefined || toughness <= HUMAN_TOUGHNESS) return 0
  return Math.floor((toughness - HUMAN_TOUGHNESS) / TOUGHNESS_STEP)
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, landed, ward, toughness } = held.data
  const struck = roll.total + FORCE[force] + LANDED[landed]
  const through = struck - ward - shrugged(toughness)
  const dealt = landed === "cost" ? Math.ceil(through / 2) : through
  return { answered: { harm: Math.max(LEAST, dealt) } }
}
