import { z } from "zod"

const MARKS = ["word", "respect", "aid", "fairness", "honesty"] as const

type MarkName = (typeof MARKS)[number]

const EACH_WRONG_COSTS = 3

const STANCES = [
  { under: 0, stance: "cold" },
  { under: 10, stance: "wary" },
  { under: 25, stance: "friendly" },
  { under: 50, stance: "trusting" },
  { under: Number.POSITIVE_INFINITY, stance: "hers" },
] as const

const SCORE = z.number().int().min(0).max(2)

const WHY = z.string().trim().min(1).optional()

const TURN_WITH = z.object({
  character: z.string().trim().min(1),
  points: z.number().int(),
  word: SCORE,
  respect: SCORE,
  aid: SCORE,
  fairness: SCORE,
  honesty: SCORE,
  wrongs: z.number().int().min(0),
  why: z.object({
    word: WHY,
    respect: WHY,
    aid: WHY,
    fairness: WHY,
    honesty: WHY,
    wrongs: WHY,
  }),
})

type Stance = (typeof STANCES)[number]["stance"]

type Moved = {
  readonly change: number
  readonly points: number
  readonly stance: Stance
}

type Settled = { readonly answered: Moved } | { readonly refused: string }

type Added = { readonly page: string; readonly key: string; readonly by: number }

type TurnWith = z.infer<typeof TURN_WITH>

function unexplained(turn: TurnWith): readonly string[] {
  const scored: readonly (MarkName | "wrongs")[] = [...MARKS, "wrongs"]
  return scored.filter((mark) => turn[mark] > 0 && turn.why[mark] === undefined)
}

function stanceAt(points: number): Stance {
  return STANCES.find((one) => points < one.under)?.stance ?? "hers"
}

export function settled(reading: unknown): Settled {
  const held = TURN_WITH.safeParse(reading)
  if (!held.success)
    return { refused: `a turn with someone reads so: ${z.prettifyError(held.error)}` }
  const missing = unexplained(held.data)
  if (missing.length > 0)
    return { refused: `say why for every score above nought: ${missing.join(", ")}` }
  const gained = MARKS.reduce((sum, mark) => sum + held.data[mark], 0)
  const change = gained - held.data.wrongs * EACH_WRONG_COSTS
  const points = held.data.points + change
  return { answered: { change, points, stance: stanceAt(points) } }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = TURN_WITH.safeParse(reading)
  const moved = answered as Moved
  if (!held.success || moved.change === 0) return []
  return [
    {
      page: `world-relationship/${held.data.character}`,
      key: "relationshipPoints",
      by: moved.change,
    },
  ]
}
