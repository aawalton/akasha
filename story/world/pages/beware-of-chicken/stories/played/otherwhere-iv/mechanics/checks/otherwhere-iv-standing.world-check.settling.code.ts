import { z } from "zod"

const REGARD_MARKS = ["kept", "heard", "shared", "gave"] as const

const COST_OF_A_CROSSED_LINE = 3

const QUOTE = z.string().trim().min(1)

const SCORE = z.number().int().min(0).max(2)

const TURN_WITH_SOMEONE = z.object({
  character: z.string().trim().min(1),
  kept: SCORE,
  heard: SCORE,
  shared: SCORE,
  gave: SCORE,
  crossed: z.number().int().min(0),
  quotes: z.object({
    kept: QUOTE.optional(),
    heard: QUOTE.optional(),
    shared: QUOTE.optional(),
    gave: QUOTE.optional(),
    crossed: QUOTE.optional(),
  }),
})

type Moved = {
  readonly earned: number
  readonly lost: number
  readonly change: number
}

type Settled = { readonly answered: Moved } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = TURN_WITH_SOMEONE.safeParse(reading)
  if (!held.success)
    return { refused: `a turn with someone reads so: ${z.prettifyError(held.error)}` }
  const turn = held.data
  const scored = [...REGARD_MARKS, "crossed"] as const
  const unquoted = scored.filter((mark) => turn[mark] > 0 && turn.quotes[mark] === undefined)
  if (unquoted.length > 0) {
    return { refused: `a score above nought quotes the words it rests on: ${unquoted.join(", ")}` }
  }
  const earned = REGARD_MARKS.reduce((sum, mark) => sum + turn[mark], 0)
  const lost = turn.crossed * COST_OF_A_CROSSED_LINE
  return { answered: { earned, lost, change: earned - lost } }
}
