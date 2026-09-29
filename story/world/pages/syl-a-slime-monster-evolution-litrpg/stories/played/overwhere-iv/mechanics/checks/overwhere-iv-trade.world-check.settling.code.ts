import { bandedSettled } from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const BUYING = { strong: 0.8, success: 0.9, cost: 1 } as const

const SELLING = { strong: 1.2, success: 1.1, cost: 1 } as const

const DEAL = z.object({
  listPrice: z.number().int().min(0),
  selling: z.boolean(),
})

type Traded = {
  readonly outcome: "strong" | "success" | "cost" | "failure"
  readonly price: number | null
}

type Settled = { readonly answered: Traded } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const deal = DEAL.safeParse(reading)
  if (!deal.success) return { refused: `a deal reads so: ${z.prettifyError(deal.error)}` }
  const haggled = bandedSettled(reading, roll)
  if ("refused" in haggled) return haggled
  const { outcome } = haggled.answered
  if (outcome === "failure") return { answered: { outcome, price: null } }
  const rate = deal.data.selling ? SELLING[outcome] : BUYING[outcome]
  return { answered: { outcome, price: Math.round(deal.data.listPrice * rate) } }
}
