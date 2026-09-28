import { z } from "zod"

const MARKS = ["kept", "heard", "helped", "tried"] as const

const EACH_CROSSING_COSTS = 3

const MARK = z.number().int().min(0).max(2)

const WORDS = z.string().trim().min(1)

const MEETING = z.object({
  character: z.string().trim().min(1),
  kept: MARK,
  heard: MARK,
  helped: MARK,
  tried: MARK,
  crossed: z.number().int().min(0),
  quotes: z.object({
    kept: WORDS.optional(),
    heard: WORDS.optional(),
    helped: WORDS.optional(),
    tried: WORDS.optional(),
    crossed: WORDS.optional(),
  }),
})

type Standing = { readonly earned: number; readonly lost: number; readonly change: number }

type Settled = { readonly answered: Standing } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = MEETING.safeParse(reading)
  if (!held.success) return { refused: `a meeting reads so: ${z.prettifyError(held.error)}` }
  const meeting = held.data
  const bare = [...MARKS, "crossed" as const].filter(
    (mark) => meeting[mark] > 0 && meeting.quotes[mark] === undefined
  )
  if (bare.length > 0)
    return { refused: `each mark above nought quotes its words: ${bare.join(", ")}` }
  const earned = meeting.kept + meeting.heard + meeting.helped + meeting.tried
  const lost = meeting.crossed * EACH_CROSSING_COSTS
  return { answered: { earned, lost, change: earned - lost } }
}
