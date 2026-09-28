import { z } from "zod"

const WHAT_EARNS_REGARD = ["word", "respect", "aid", "fairness"] as const

const EACH_WRONG_COSTS = 3

const MARK = z.number().int().min(0).max(2)

const GROUNDS = z.string().trim().min(1).optional()

const DEALINGS = z.object({
  character: z.string().trim().min(1),
  word: MARK,
  respect: MARK,
  aid: MARK,
  fairness: MARK,
  wronged: z.number().int().min(0),
  grounds: z.object({
    word: GROUNDS,
    respect: GROUNDS,
    aid: GROUNDS,
    fairness: GROUNDS,
    wronged: GROUNDS,
  }),
})

type Regard = { readonly earned: number; readonly lost: number; readonly change: number }

type Settled = { readonly answered: Regard } | { readonly refused: string }

type Added = { readonly page: string; readonly key: string; readonly by: number }

function ungrounded(dealings: z.infer<typeof DEALINGS>): readonly string[] {
  const marks = [...WHAT_EARNS_REGARD, "wronged" as const]
  return marks.filter((mark) => dealings[mark] > 0 && dealings.grounds[mark] === undefined)
}

export function settled(reading: unknown): Settled {
  const held = DEALINGS.safeParse(reading)
  if (!held.success) return { refused: `dealings read so: ${z.prettifyError(held.error)}` }
  const missing = ungrounded(held.data)
  if (missing.length > 0)
    return { refused: `each mark above nought gives its grounds: ${missing.join(", ")}` }
  const earned = WHAT_EARNS_REGARD.reduce((sum, mark) => sum + held.data[mark], 0)
  const lost = held.data.wronged * EACH_WRONG_COSTS
  return { answered: { earned, lost, change: earned - lost } }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = DEALINGS.safeParse(reading)
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
