import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE_IN_AIESTA = { light: 0, solid: 2, heavy: 4, savage: 7, crushing: 10 } as const

const LANDED_STRONGLY_ADDS = 3

const LEAST_HARM = 1

const STRONGEST_SHIELD = 7

const WOUND_BANDS = [
  { atMost: 0, wound: "down" },
  { atMost: 5, wound: "grievous" },
  { atMost: 10, wound: "hurt" },
  { atMost: 15, wound: "scraped" },
  { atMost: Number.POSITIVE_INFINITY, wound: "whole" },
] as const

const BLOW_IN_AIESTA = z.object({
  force: z.enum(["light", "solid", "heavy", "savage", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(STRONGEST_SHIELD).default(0),
  health: z.number().int().min(0),
})

type Wounded = {
  readonly harm: number
  readonly health: number
  readonly wound: (typeof WOUND_BANDS)[number]["wound"]
}

type Settled = { readonly answered: Wounded } | { readonly refused: string }

function woundAt(left: number): Wounded["wound"] {
  for (const band of WOUND_BANDS) if (left <= band.atMost) return band.wound
  return "whole"
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW_IN_AIESTA.safeParse(reading)
  if (!held.success) return { refused: `a blow in Aiesta reads so: ${z.prettifyError(held.error)}` }
  const blow = held.data
  const extra = blow.landed === "strong" ? LANDED_STRONGLY_ADDS : 0
  const full = roll.total + FORCE_IN_AIESTA[blow.force] + extra - blow.ward
  const harm = Math.max(LEAST_HARM, blow.landed === "cost" ? Math.ceil(full / 2) : full)
  const health = Math.max(0, blow.health - harm)
  return { answered: { harm, health, wound: woundAt(health) } }
}
