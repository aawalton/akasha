import { z } from "zod"

const COPPER_PER_SILVER = 20

const SILVER_PER_GOLD = 20

const BY_REGARD = { cold: 1.5, wary: 1, friendly: 0.9, trusted: 0.8, hers: 0.7 } as const

const BY_HAGGLING = { strong: 0.8, success: 0.9, cost: 1, failure: 1.1, none: 1 } as const

const DEAL = z.object({
  character: z.string().trim().min(1),
  listCopper: z.number().int().min(0),
  regard: z.enum(["cold", "wary", "friendly", "trusted", "hers"]),
  haggling: z.enum(["strong", "success", "cost", "failure", "none"]),
  selling: z.boolean().default(false),
})

type Priced = {
  readonly copper: number
  readonly gold: number
  readonly silver: number
  readonly change: number
}

type Settled = { readonly answered: Priced } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = DEAL.safeParse(reading)
  if (!held.success) return { refused: `a deal reads so: ${z.prettifyError(held.error)}` }
  const { listCopper, regard, haggling, selling } = held.data
  const factor = BY_REGARD[regard] * BY_HAGGLING[haggling]
  const raw = selling ? listCopper / factor : listCopper * factor
  const copper = listCopper === 0 ? 0 : Math.max(1, Math.round(raw))
  const perGold = COPPER_PER_SILVER * SILVER_PER_GOLD
  return {
    answered: {
      copper,
      gold: Math.floor(copper / perGold),
      silver: Math.floor((copper % perGold) / COPPER_PER_SILVER),
      change: copper % COPPER_PER_SILVER,
    },
  }
}
