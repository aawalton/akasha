import { z } from "zod"

const REGARD_SHIFTS = [
  { atLeast: 25, share: -0.2 },
  { atLeast: 10, share: -0.1 },
  { atLeast: 0, share: 0 },
  { atLeast: Number.NEGATIVE_INFINITY, share: 0.25 },
] as const

const WANT_SHIFTS = { eager: -0.1, steady: 0, indifferent: 0.1 } as const

const DEAL = z.object({
  character: z.string().trim().min(1),
  deals: z
    .array(
      z.object({
        what: z.string().trim().min(1),
        side: z.enum(["buying", "selling"]),
        price: z.number().int().min(0),
        regard: z.number().int(),
        want: z.enum(["eager", "steady", "indifferent"]).default("steady"),
        offered: z.number().int().min(0),
      })
    )
    .min(1),
})

type Dealt = {
  readonly what: string
  readonly fair: number
  readonly agreed: boolean
}

type Settled =
  | { readonly answered: { readonly dealt: readonly Dealt[] } }
  | { readonly refused: string }

function regardShift(regard: number): number {
  return REGARD_SHIFTS.find((one) => regard >= one.atLeast)?.share ?? 0
}

export function settled(reading: unknown): Settled {
  const held = DEAL.safeParse(reading)
  if (!held.success) return { refused: `a deal reads so: ${z.prettifyError(held.error)}` }
  const dealt = held.data.deals.map((deal): Dealt => {
    const towardHer = regardShift(deal.regard) + WANT_SHIFTS[deal.want]
    const share = deal.side === "buying" ? 1 + towardHer : 1 - towardHer
    const fair = Math.max(0, Math.round(deal.price * share))
    const agreed = deal.side === "buying" ? deal.offered >= fair : deal.offered <= fair
    return { what: deal.what, fair, agreed }
  })
  return { answered: { dealt } }
}
