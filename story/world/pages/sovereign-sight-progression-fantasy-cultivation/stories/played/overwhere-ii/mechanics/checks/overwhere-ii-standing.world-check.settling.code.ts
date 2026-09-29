import { z } from "zod"

const REGARD_IN_THE_VALLEY = ["kept", "heard", "shared", "gave"] as const

const A_CROSSED_LINE_COSTS = 3

const MARK = z.number().int().min(0).max(2)

const WORDS = z.string().trim().min(1).optional()

const DEALINGS_WITH_A_PLACE = z.object({
  character: z.string().trim().min(1),
  kept: MARK,
  heard: MARK,
  shared: MARK,
  gave: MARK,
  crossed: z.number().int().min(0),
  quotes: z.object({
    kept: WORDS,
    heard: WORDS,
    shared: WORDS,
    gave: WORDS,
    crossed: WORDS,
  }),
})

type Regard = { readonly earned: number; readonly lost: number; readonly change: number }

type Settled = { readonly answered: Regard } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const parsed = DEALINGS_WITH_A_PLACE.safeParse(reading)
  if (!parsed.success) {
    return { refused: `dealings with a place read so: ${z.prettifyError(parsed.error)}` }
  }
  const { quotes, crossed, ...marks } = parsed.data
  const scores = [
    ...REGARD_IN_THE_VALLEY.map((mark) => [mark, marks[mark]] as const),
    ["crossed", crossed] as const,
  ]
  const bare = scores.filter(([mark, score]) => score > 0 && !quotes[mark]).map(([mark]) => mark)
  if (bare.length > 0) {
    return { refused: `a mark above nought needs the words it rests on: ${bare.join(", ")}` }
  }
  const earned = REGARD_IN_THE_VALLEY.reduce((sum, mark) => sum + marks[mark], 0)
  const lost = crossed * A_CROSSED_LINE_COSTS
  return { answered: { earned, lost, change: earned - lost } }
}
