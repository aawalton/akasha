import { z } from "zod"

const DEEPEST_DRAW = -20

const HOUR_OF_REST_ADDS = 1

const STAGES_BELOW_NOUGHT = [
  { atLeast: 0, stage: "clear" },
  { atLeast: -2, stage: "strained" },
  { atLeast: -5, stage: "overdrawn" },
  { atLeast: -8, stage: "collapsed" },
  { atLeast: Number.NEGATIVE_INFINITY, stage: "dying" },
] as const

const DRAWING = z.object({
  have: z.number().int(),
  max: z.number().int().min(0),
  spend: z.number().int().min(0),
  rest: z.enum(["none", "hour", "night"]).default("none"),
})

type Drawn = {
  readonly left: number
  readonly stage: (typeof STAGES_BELOW_NOUGHT)[number]["stage"]
}

type Settled = { readonly answered: Drawn } | { readonly refused: string }

function rested(have: number, max: number, rest: z.infer<typeof DRAWING>["rest"]): number {
  if (rest === "night") return max
  if (rest === "hour") return Math.min(max, have + HOUR_OF_REST_ADDS)
  return have
}

export function settled(reading: unknown): Settled {
  const held = DRAWING.safeParse(reading)
  if (!held.success)
    return { refused: `a drawing of arcana reads so: ${z.prettifyError(held.error)}` }
  const { have, max, spend, rest } = held.data
  if (have < DEEPEST_DRAW || have > max) {
    return { refused: `arcana held runs from ${DEEPEST_DRAW} to ${max}, not ${have}` }
  }
  const left = rested(have, max, rest) - spend
  const stage = STAGES_BELOW_NOUGHT.find((one) => left >= one.atLeast)?.stage ?? "dying"
  return { answered: { left, stage } }
}
