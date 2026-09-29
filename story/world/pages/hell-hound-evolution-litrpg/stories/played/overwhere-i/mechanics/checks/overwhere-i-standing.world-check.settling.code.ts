import { z } from "zod"

const LOWEST = -3

const HIGHEST = 5

const DEED_WEIGHTS = {
  "saved-a-life": 2,
  "ended-a-threat": 2,
  "helped-openly": 1,
  "kept-her-word": 1,
  "gave-freely": 1,
  "gave-offence": -1,
  "frightened-them": -1,
  "broke-her-word": -2,
  "stole-or-cheated": -2,
  "harmed-one-of-theirs": -3,
} as const

type Deed = keyof typeof DEED_WEIGHTS

const DEEDS = Object.keys(DEED_WEIGHTS) as [Deed, ...Deed[]]

const REGARDING = z.object({
  community: z.string().trim().min(1),
  regard: z.number().int().min(LOWEST).max(HIGHEST),
  deeds: z.array(z.object({ deed: z.enum(DEEDS), quote: z.string().trim().min(1) })).min(1),
})

type Regarded = {
  readonly community: string
  readonly from: number
  readonly to: number
  readonly moved: number
}

type Settled = { readonly answered: Regarded } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = REGARDING.safeParse(reading)
  if (!held.success) return { refused: `standing reads so: ${z.prettifyError(held.error)}` }
  const { community, regard, deeds } = held.data
  const moved = deeds.reduce((sum, one) => sum + DEED_WEIGHTS[one.deed], 0)
  const to = Math.max(LOWEST, Math.min(HIGHEST, regard + moved))
  return { answered: { community, from: regard, to, moved: to - regard } }
}
