import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const FORCE = { light: 0, solid: 2, heavy: 4, crushing: 8 } as const

const STARFALL_AT_RANK_ONE = 12

const STARFALL_PER_RANK = 4

const TOP_RANK = 5

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
    force: z.enum(["light", "solid", "heavy", "crushing", "starfall"]),
    rank: z.number().int().min(1).max(TOP_RANK).default(1),
    landed: z.enum(["strong", "success", "cost"]),
    ward: z.number().int().min(0).max(MOST_WARD).default(0),
    left: z.number().int().min(0),
    maxHealth: z.number().int().min(1),
    floor: z.number().int().min(0).optional(),
  })
  .refine((blow) => blow.left <= blow.maxHealth, "health left is at most the most health")
  .refine(
    (blow) => blow.floor === undefined || blow.floor <= blow.left,
    "a floor is at most the health left"
  )

type Harmed = {
  readonly harm: number
  readonly left: number
  readonly wound: (typeof WOUNDS)[number]["wound"]
}

type Settled = { readonly answered: Harmed } | { readonly refused: string }

function forceOf(force: z.infer<typeof BLOW>["force"], rank: number): number {
  if (force === "starfall") return STARFALL_AT_RANK_ONE + STARFALL_PER_RANK * (rank - 1)
  return FORCE[force]
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = BLOW.safeParse(reading)
  if (!held.success) return { refused: `a blow reads so: ${z.prettifyError(held.error)}` }
  const { force, rank, landed, ward, left, maxHealth, floor } = held.data
  const raw = Math.max(
    1,
    roll.total + forceOf(force, rank) + (landed === "strong" ? STRONG_EXTRA : 0) - ward
  )
  const dealt = landed === "cost" ? Math.ceil(raw / 2) : raw
  const harm = floor === undefined ? dealt : Math.min(dealt, left - floor)
  const after = Math.max(0, left - harm)
  const wound = WOUNDS.find((one) => after <= one.atMostShare * maxHealth)?.wound ?? "whole"
  return { answered: { harm, left: after, wound } }
}
