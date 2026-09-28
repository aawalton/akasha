import { z } from "zod"

const REGARD_ON_THE_ROAD = ["kept", "heard", "shared", "gave"] as const

const A_CROSSED_LINE_COSTS = 3

const ZERO_TO_TWO = z.number().int().min(0).max(2)

const QUOTED = z.string().trim().min(1).optional()

const A_TURN_OF_DEALINGS = z.object({
  character: z.string().trim().min(1),
  kept: ZERO_TO_TWO,
  heard: ZERO_TO_TWO,
  shared: ZERO_TO_TWO,
  gave: ZERO_TO_TWO,
  crossed: z.number().int().min(0),
  quotes: z.object({
    kept: QUOTED,
    heard: QUOTED,
    shared: QUOTED,
    gave: QUOTED,
    crossed: QUOTED,
  }),
})

type Regard = { readonly earned: number; readonly lost: number; readonly change: number }

type Settled = { readonly answered: Regard } | { readonly refused: string }

type Added = { readonly page: string; readonly key: string; readonly by: number }

export function settled(reading: unknown): Settled {
  const held = A_TURN_OF_DEALINGS.safeParse(reading)
  if (!held.success)
    return { refused: `a turn of dealings reads so: ${z.prettifyError(held.error)}` }
  const dealings = held.data
  const unquoted: string[] = []
  let earned = 0
  for (const mark of REGARD_ON_THE_ROAD) {
    earned += dealings[mark]
    if (dealings[mark] > 0 && dealings.quotes[mark] === undefined) unquoted.push(mark)
  }
  if (dealings.crossed > 0 && dealings.quotes.crossed === undefined) unquoted.push("crossed")
  if (unquoted.length > 0) {
    return { refused: `a mark above nought needs the words it rests on: ${unquoted.join(", ")}` }
  }
  const lost = dealings.crossed * A_CROSSED_LINE_COSTS
  return { answered: { earned, lost, change: earned - lost } }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = A_TURN_OF_DEALINGS.safeParse(reading)
  const regard = answered as Regard
  if (!held.success || regard.change === 0) return []
  return [
    {
      page: `world-relationship/${held.data.character}`,
      key: "relationshipPoints",
      by: regard.change,
    },
  ]
}
