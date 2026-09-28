import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, savage: 7, crushing: 10 } as const

const STRONG_EXTRA = 3

const MOST_WARD = 8

const WOUNDS = [
  { atMost: 0, wound: "down" },
  { atMost: 5, wound: "grievous" },
  { atMost: 10, wound: "hurt" },
  { atMost: 15, wound: "scraped" },
  { atMost: Number.POSITIVE_INFINITY, wound: "whole" },
] as const

const BLOW = z.object({
  force: z.enum(["light", "solid", "heavy", "savage", "crushing"]),
  landed: z.enum(["strong", "success", "cost"]),
  ward: z.number().int().min(0).max(MOST_WARD).default(0),
  health: z.number().int().min(0),
})

type Harmed = {
  readonly harm: number
  readonly health: number
  readonly wound: (typeof WOUNDS)[number]["wound"]
}

type Settled = { readonly answered: Harmed } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, landed, ward, health } = held.data
  const raw = roll.total + FORCE[force] + (landed === "strong" ? STRONG_EXTRA : 0) - ward
  const dealt = Math.max(1, landed === "cost" ? Math.ceil(raw / 2) : raw)
  const left = Math.max(0, health - dealt)
  const wound = WOUNDS.find((one) => left <= one.atMost)?.wound ?? "whole"
  return { answered: { harm: dealt, health: left, wound } }
}
