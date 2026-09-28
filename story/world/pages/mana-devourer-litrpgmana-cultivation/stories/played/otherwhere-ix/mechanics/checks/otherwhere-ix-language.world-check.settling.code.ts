import { z } from "zod"

const PER_HOUR = { heard: 0.25, spoken: 0.5, taught: 1 } as const

const SLOWING_FROM = 50

const MOST_FLUENCY = 100

const STAGES = [
  { below: 5, stage: "none" },
  { below: 20, stage: "a few words" },
  { below: 50, stage: "getting by" },
  { below: 80, stage: "conversant" },
  { below: Number.POSITIVE_INFINITY, stage: "fluent" },
] as const

const STUDY = z.object({
  character: z.string().trim().min(1),
  tongue: z.string().trim().min(1),
  fluency: z.number().min(0).max(MOST_FLUENCY),
  heard: z.number().min(0).default(0),
  spoken: z.number().min(0).default(0),
  taught: z.number().min(0).default(0),
  quickening: z.number().min(0).max(2).default(0),
})

type Learned = {
  readonly gained: number
  readonly fluency: number
  readonly stage: (typeof STAGES)[number]["stage"]
}

type Settled = { readonly answered: Learned } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = STUDY.safeParse(reading)
  if (!held.success) return { refused: `a turn of study reads so: ${z.prettifyError(held.error)}` }
  const { fluency, heard, spoken, taught, quickening } = held.data
  const hours = heard * PER_HOUR.heard + spoken * PER_HOUR.spoken + taught * PER_HOUR.taught
  const pace = (fluency >= SLOWING_FROM ? 0.5 : 1) * (1 + quickening)
  const reached = Math.min(MOST_FLUENCY, Math.round((fluency + hours * pace) * 100) / 100)
  const stage = STAGES.find((one) => reached < one.below)?.stage ?? "fluent"
  return {
    answered: { gained: Math.round((reached - fluency) * 100) / 100, fluency: reached, stage },
  }
}
