import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, savage: 7, crushing: 10 } as const

const TIER_SCALE = [1, 3, 8, 20, 50] as const

const STRONG_EXTRA = 3

const MOST_WARD = 8

const WOUNDS = [
  { atMostShare: 0, wound: "down" },
  { atMostShare: 0.25, wound: "grievous" },
  { atMostShare: 0.5, wound: "hurt" },
  { atMostShare: 0.75, wound: "scraped" },
  { atMostShare: Number.POSITIVE_INFINITY, wound: "whole" },
] as const

const BLOW = z
  .object({
    force: z.enum(["light", "solid", "heavy", "savage", "crushing"]),
    tier: z
      .number()
      .int()
      .min(0)
      .max(TIER_SCALE.length - 1),
    landed: z.enum(["strong", "success", "cost"]),
    ward: z.number().int().min(0).max(MOST_WARD).default(0),
    health: z.number().int().min(0),
    maxHealth: z.number().int().min(1),
  })
  .refine((blow) => blow.health <= blow.maxHealth, "health is at most the most health")

type Harmed = {
  readonly harm: number
  readonly health: number
  readonly wound: (typeof WOUNDS)[number]["wound"]
}

type Settled = { readonly answered: Harmed } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, tier, landed, ward, health, maxHealth } = held.data
  const raw = Math.max(
    1,
    roll.total + FORCE[force] + (landed === "strong" ? STRONG_EXTRA : 0) - ward
  )
  const scaled = raw * (TIER_SCALE[tier] ?? 1)
  const dealt = landed === "cost" ? Math.ceil(scaled / 2) : scaled
  const left = Math.max(0, health - dealt)
  const wound = WOUNDS.find((one) => left <= one.atMostShare * maxHealth)?.wound ?? "whole"
  return { answered: { harm: dealt, health: left, wound } }
}
