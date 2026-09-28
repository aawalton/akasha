import { z } from "zod"

const PER_HOUR = { heard: 0.25, spoken: 0.5, taught: 1 } as const

const MOST_FLUENCY = 100

const SLOWS_PAST = 50

const STAGES = [
  { under: 5, stage: "none" },
  { under: 20, stage: "a few words" },
  { under: 50, stage: "getting by" },
  { under: 80, stage: "conversant" },
  { under: Number.POSITIVE_INFINITY, stage: "fluent" },
] as const

const HOURS = z.number().min(0).max(24)

const LEARNING = z.object({
  character: z.string().trim().min(1),
  tongue: z.string().trim().min(1),
  fluency: z.number().min(0).max(MOST_FLUENCY),
  heardHours: HOURS.default(0),
  spokenHours: HOURS.default(0),
  taughtHours: HOURS.default(0),
  quickenedBy: z.number().int().min(0).max(100).default(0),
})

type Learned = {
  readonly gained: number
  readonly fluency: number
  readonly stage: (typeof STAGES)[number]["stage"]
}

type Settled = { readonly answered: Learned } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = LEARNING.safeParse(reading)
  if (!held.success) return { refused: `learning reads so: ${z.prettifyError(held.error)}` }
  const { fluency, heardHours, spokenHours, taughtHours, quickenedBy } = held.data
  const raw =
    heardHours * PER_HOUR.heard + spokenHours * PER_HOUR.spoken + taughtHours * PER_HOUR.taught
  const quickened = raw * (1 + quickenedBy / 100)
  const gained = Math.round((fluency >= SLOWS_PAST ? quickened / 2 : quickened) * 10) / 10
  const reached = Math.min(MOST_FLUENCY, Math.round((fluency + gained) * 10) / 10)
  const stage = STAGES.find((one) => reached < one.under)?.stage ?? "fluent"
  return { answered: { gained, fluency: reached, stage } }
}
