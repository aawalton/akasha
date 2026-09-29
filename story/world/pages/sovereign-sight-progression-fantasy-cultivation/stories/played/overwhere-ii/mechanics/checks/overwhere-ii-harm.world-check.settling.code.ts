import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, savage: 7, crushing: 10 } as const

const LANDED = { strong: 3, success: 0, cost: 0 } as const

const ORDINARY_MIGHT = 6

const MIGHT_STEP = 3

const MOST_WARD = 8

const LEAST = 1

const BLOW = z.object({
  force: z.enum(["light", "solid", "heavy", "savage", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(MOST_WARD).default(0),
  might: z.number().int().min(0).optional(),
  vigour: z.number().int().min(0),
  deadly: z.boolean().default(false),
})

type Struck = { readonly harm: number; readonly vigour: number; readonly downed: boolean }

type Settled = { readonly answered: Struck } | { readonly refused: string }

function shrugged(might: number | undefined): number {
  if (might === undefined || might <= ORDINARY_MIGHT) return 0
  return Math.floor((might - ORDINARY_MIGHT) / MIGHT_STEP)
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, landed, ward, might, vigour, deadly } = held.data
  const struck = roll.total + FORCE[force] + LANDED[landed]
  const through = struck - ward - shrugged(might)
  const dealt = landed === "cost" ? Math.ceil(through / 2) : through
  const harm = Math.max(LEAST, dealt)
  const left = vigour - harm
  if (deadly) return { answered: { harm, vigour: Math.max(0, left), downed: left <= 0 } }
  return { answered: { harm, vigour: Math.max(LEAST, left), downed: left < LEAST } }
}
