import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, crushing: 8, rending: 12 } as const

const STRONG_EXTRA = 3

const LEAST = 1

const MOST_WARD = 6

const SPARED_FLOOR = 1

const BLOW = z.object({
  force: z.enum(["light", "solid", "heavy", "crushing", "rending"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(MOST_WARD).default(0),
  health: z.number().int().min(0),
  spared: z.boolean().default(false),
  vital: z.boolean().default(false),
})

const VITAL_TIMES = 2

type Harmed = {
  readonly harm: number
  readonly left: number
  readonly down: boolean
  readonly beaten: boolean
}

type Settled = { readonly answered: Harmed } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, landed, ward, health, spared, vital } = held.data
  const warded = force === "rending" ? 0 : ward
  const raw = roll.total + FORCE[force] + (landed === "strong" ? STRONG_EXTRA : 0) - warded
  const struck = vital && force === "rending" ? raw * VITAL_TIMES : raw
  const dealt = landed === "cost" ? Math.floor(struck / 2) : struck
  const harm = Math.max(LEAST, dealt)
  const beaten = spared && health - harm < SPARED_FLOOR
  const left = beaten ? Math.min(health, SPARED_FLOOR) : Math.max(0, health - harm)
  return { answered: { harm, left, down: left === 0, beaten } }
}
