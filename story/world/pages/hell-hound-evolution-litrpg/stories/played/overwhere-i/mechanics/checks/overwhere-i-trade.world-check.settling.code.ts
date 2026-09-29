import { z } from "zod"

const COPPER_PER_SILVER = 10

const SILVER_PER_GOLD = 10

const REGARD_TOWARD_HER = [
  { atLeast: 3, share: 0.2 },
  { atLeast: 1, share: 0.1 },
  { atLeast: 0, share: 0 },
  { atLeast: Number.NEGATIVE_INFINITY, share: -0.25 },
] as const

const WANT_TOWARD_HER = { eager: 0.1, steady: 0, indifferent: -0.1 } as const

const BARGAIN_TOWARD_HER = {
  none: 0,
  strong: 0.2,
  success: 0.1,
  cost: 0,
  failure: -0.1,
} as const

const DEALING = z.object({
  character: z.string().trim().min(1),
  deals: z
    .array(
      z.object({
        what: z.string().trim().min(1),
        side: z.enum(["buying", "selling"]),
        base: z.number().int().min(0),
        regard: z.number().int().min(-3).max(5).default(0),
        want: z.enum(["eager", "steady", "indifferent"]).default("steady"),
        bargain: z.enum(["none", "strong", "success", "cost", "failure"]).default("none"),
        offered: z.number().int().min(0),
      })
    )
    .min(1),
})

type Coins = { readonly gold: number; readonly silver: number; readonly copper: number }

type Dealt = {
  readonly what: string
  readonly price: number
  readonly coins: Coins
  readonly agreed: boolean
}

type Settled =
  | { readonly answered: { readonly dealt: readonly Dealt[] } }
  | { readonly refused: string }

function coinsOf(copper: number): Coins {
  const perGold = COPPER_PER_SILVER * SILVER_PER_GOLD
  return {
    gold: Math.floor(copper / perGold),
    silver: Math.floor((copper % perGold) / COPPER_PER_SILVER),
    copper: copper % COPPER_PER_SILVER,
  }
}

export function settled(reading: unknown): Settled {
  const held = DEALING.safeParse(reading)
  if (!held.success) return { refused: `a deal reads so: ${z.prettifyError(held.error)}` }
  const dealt = held.data.deals.map((deal): Dealt => {
    const regardShare = REGARD_TOWARD_HER.find((one) => deal.regard >= one.atLeast)?.share ?? 0
    const towardHer = regardShare + WANT_TOWARD_HER[deal.want] + BARGAIN_TOWARD_HER[deal.bargain]
    const factor = deal.side === "buying" ? 1 - towardHer : 1 + towardHer
    const price = Math.max(0, Math.round(deal.base * factor))
    const agreed = deal.side === "buying" ? deal.offered >= price : deal.offered <= price
    return { what: deal.what, price, coins: coinsOf(price), agreed }
  })
  return { answered: { dealt } }
}
