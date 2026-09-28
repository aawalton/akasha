import { z } from "zod"

const LEAST_NOTICE = 0

const MOST_NOTICE = 100

const MOST_ONE_MARK = 10

const A_QUIET_WEEK_TAKES = 1

const MARK = z.object({
  from: z.string().trim().min(1),
  by: z.number().int().min(0).max(MOST_ONE_MARK),
})

const WATCHED = z.object({
  character: z.string().trim().min(1),
  notice: z.number().min(LEAST_NOTICE).max(MOST_NOTICE),
  marks: z.array(MARK),
  quietWeeks: z.number().int().min(0),
})

type Noticed = { readonly notice: number }

type Settled = { readonly answered: Noticed } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = WATCHED.safeParse(reading)
  if (!held.success) return { refused: `notice reads so: ${z.prettifyError(held.error)}` }
  const { notice, marks, quietWeeks } = held.data
  const drawn = marks.reduce((sum, mark) => sum + mark.by, 0)
  const reached = notice + drawn - quietWeeks * A_QUIET_WEEK_TAKES
  return { answered: { notice: Math.min(MOST_NOTICE, Math.max(LEAST_NOTICE, reached)) } }
}
