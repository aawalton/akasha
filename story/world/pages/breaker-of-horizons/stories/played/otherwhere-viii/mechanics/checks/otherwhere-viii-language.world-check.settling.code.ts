import { z } from "zod"

const GAINED_PER_HOUR = { heard: 0.25, spoken: 0.5, taught: 1 } as const

const FULL_FLUENCY = 100

const HALVES_FROM = 50

const TONGUE_STAGES = [
  { below: 5, stage: "none" },
  { below: 20, stage: "a few words" },
  { below: 50, stage: "getting by" },
  { below: 80, stage: "conversant" },
  { below: Number.POSITIVE_INFINITY, stage: "fluent" },
] as const

const A_DAY_OF_HOURS = z.number().min(0).max(24)

const TONGUE_LEARNING = z.object({
  character: z.string().trim().min(1),
  tongue: z.string().trim().min(1),
  fluency: z.number().min(0).max(FULL_FLUENCY),
  heardHours: A_DAY_OF_HOURS.default(0),
  spokenHours: A_DAY_OF_HOURS.default(0),
  taughtHours: A_DAY_OF_HOURS.default(0),
})

type Spoken = {
  readonly gained: number
  readonly fluency: number
  readonly stage: (typeof TONGUE_STAGES)[number]["stage"]
}

type Settled = { readonly answered: Spoken } | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const held = TONGUE_LEARNING.safeParse(reading)
  if (!held.success) {
    return { refused: `learning a tongue reads so: ${z.prettifyError(held.error)}` }
  }
  const learning = held.data
  const hours =
    learning.heardHours * GAINED_PER_HOUR.heard +
    learning.spokenHours * GAINED_PER_HOUR.spoken +
    learning.taughtHours * GAINED_PER_HOUR.taught
  const gained = Math.round((learning.fluency >= HALVES_FROM ? hours / 2 : hours) * 10) / 10
  const fluency = Math.min(FULL_FLUENCY, Math.round((learning.fluency + gained) * 10) / 10)
  const stage = TONGUE_STAGES.find((one) => fluency < one.below)?.stage ?? "fluent"
  return { answered: { gained, fluency, stage } }
}
