import { z } from "zod"

const MARK = z.number().int().min(0).max(2)

const WORDS = z.union([z.string().trim().min(1), z.array(z.string().trim().min(1)).min(1)])

const CROSSED_COSTS = 2

const MARKED = ["kept", "heard", "shared", "crossed"] as const

const TURN = z.object({
  character: z.string().trim().min(1),
  kept: MARK,
  heard: MARK,
  shared: MARK,
  crossed: z.number().int().min(0),
  quotes: z.object({
    kept: WORDS.optional(),
    heard: WORDS.optional(),
    shared: WORDS.optional(),
    crossed: WORDS.optional(),
  }),
})

type Scored = {
  readonly earned: number
  readonly lost: number
  readonly change: number
}

type Settled = { readonly answered: Scored } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = TURN.safeParse(reading)
  if (!held.success) return { refused: `a turn reads so: ${z.prettifyError(held.error)}` }
  const turn = held.data
  const bare = MARKED.find((mark) => turn[mark] > 0 && turn.quotes[mark] === undefined)
  if (bare !== undefined) {
    return { refused: `\`${bare}\` above nought quotes in \`quotes\` the words it rests on` }
  }
  const earned = turn.kept + turn.heard + turn.shared
  const lost = turn.crossed * CROSSED_COSTS
  return { answered: { earned, lost, change: earned - lost } }
}
