import { z } from "zod"

const REGARD_IN_AIESTA = ["kept", "heard", "helped", "respected"] as const

const A_CROSSED_LINE_COSTS = 3

const NOUGHT_TO_TWO = z.number().int().min(0).max(2)

const WORDS_QUOTED = z.string().trim().min(1).optional()

const DEALINGS_IN_AIESTA = z.object({
  character: z.string().trim().min(1),
  kept: NOUGHT_TO_TWO,
  heard: NOUGHT_TO_TWO,
  helped: NOUGHT_TO_TWO,
  respected: NOUGHT_TO_TWO,
  crossed: z.number().int().min(0),
  quotes: z.object({
    kept: WORDS_QUOTED,
    heard: WORDS_QUOTED,
    helped: WORDS_QUOTED,
    respected: WORDS_QUOTED,
    crossed: WORDS_QUOTED,
  }),
})

type Standing = { readonly earned: number; readonly lost: number; readonly change: number }

type Settled = { readonly answered: Standing } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = DEALINGS_IN_AIESTA.safeParse(reading)
  if (!held.success)
    return { refused: `dealings in Aiesta read so: ${z.prettifyError(held.error)}` }
  const dealings = held.data
  const scored = [...REGARD_IN_AIESTA, "crossed" as const]
  const unquoted = scored.filter((mark) => dealings[mark] > 0 && !dealings.quotes[mark])
  if (unquoted.length > 0) {
    return { refused: `a mark above nought quotes the words it rests on: ${unquoted.join(", ")}` }
  }
  const earned = REGARD_IN_AIESTA.reduce((sum, mark) => sum + dealings[mark], 0)
  const lost = dealings.crossed * A_CROSSED_LINE_COSTS
  return { answered: { earned, lost, change: earned - lost } }
}
