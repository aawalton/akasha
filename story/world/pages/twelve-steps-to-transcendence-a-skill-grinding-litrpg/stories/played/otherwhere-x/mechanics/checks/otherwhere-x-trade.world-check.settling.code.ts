import { z } from "zod"

const COPPER_TO_SILVER = 10

const SILVER_TO_GOLD = 20

const STANCE_FACTOR = { cold: 1.4, wary: 1, friendly: 0.9, trusting: 0.8, hers: 0.7 } as const

const HAGGLE_FACTOR = { strong: 0.8, success: 0.9, cost: 1, failure: 1.1, none: 1 } as const

const NEED_SHOWN = 0.2

const BARGAIN = z.object({
  character: z.string().trim().min(1),
  askedCopper: z.number().int().min(0),
  stance: z.enum(["cold", "wary", "friendly", "trusting", "hers"]),
  haggle: z.enum(["strong", "success", "cost", "failure", "none"]),
  selling: z.boolean().default(false),
  needShown: z.boolean().default(false),
})

type Struck = {
  readonly copper: number
  readonly gold: number
  readonly silver: number
  readonly looseCopper: number
}

type Settled = { readonly answered: Struck } | { readonly refused: string }

function coinsOf(copper: number): Struck {
  const perGold = COPPER_TO_SILVER * SILVER_TO_GOLD
  return {
    copper,
    gold: Math.floor(copper / perGold),
    silver: Math.floor((copper % perGold) / COPPER_TO_SILVER),
    looseCopper: copper % COPPER_TO_SILVER,
  }
}

export function settled(reading: unknown): Settled {
  const held = BARGAIN.safeParse(reading)
  if (!held.success) return { refused: `a bargain reads so: ${z.prettifyError(held.error)}` }
  const { askedCopper, stance, haggle, selling, needShown } = held.data
  if (askedCopper === 0) return { answered: coinsOf(0) }
  const leaning = STANCE_FACTOR[stance] * HAGGLE_FACTOR[haggle] + (needShown ? NEED_SHOWN : 0)
  const struck = selling ? askedCopper / leaning : askedCopper * leaning
  return { answered: coinsOf(Math.max(1, Math.round(struck))) }
}
