import { z } from "zod"

const PLAIN_TALK = 6

const NATIVE = 10

const DAYS_PAST_PLAIN = 7

const SPEECH_BANDS = [
  { atLeast: PLAIN_TALK, band: "none" },
  { atLeast: 3, band: "hard" },
  { atLeast: 1, band: "extreme" },
  { atLeast: 0, band: "impossible" },
] as const

const LEARNING = z.object({
  character: z.string().trim().min(1),
  tongues: z
    .array(
      z.object({
        tongue: z.string().trim().min(1),
        fluency: z.number().int().min(0).max(NATIVE),
        days: z.number().int().min(0),
        teacher: z.boolean().default(false),
      })
    )
    .min(1),
})

type Learned = {
  readonly tongue: string
  readonly from: number
  readonly to: number
  readonly daysCarried: number
  readonly speechBand: (typeof SPEECH_BANDS)[number]["band"]
}

type Settled =
  | { readonly answered: { readonly learned: readonly Learned[] } }
  | { readonly refused: string }

function daysFor(fluency: number): number {
  return fluency < PLAIN_TALK ? 1 : DAYS_PAST_PLAIN
}

function bandOf(fluency: number): Learned["speechBand"] {
  return SPEECH_BANDS.find((one) => fluency >= one.atLeast)?.band ?? "impossible"
}

export function settled(reading: unknown): Settled {
  const held = LEARNING.safeParse(reading)
  if (!held.success) return { refused: `learning reads so: ${z.prettifyError(held.error)}` }
  const learned = held.data.tongues.map((one): Learned => {
    let days = one.days * (one.teacher ? 2 : 1)
    let fluency = one.fluency
    while (fluency < NATIVE && days >= daysFor(fluency)) {
      days -= daysFor(fluency)
      fluency += 1
    }
    const carried = fluency >= NATIVE ? 0 : days
    return {
      tongue: one.tongue,
      from: one.fluency,
      to: fluency,
      daysCarried: one.teacher ? Math.floor(carried / 2) : carried,
      speechBand: bandOf(fluency),
    }
  })
  return { answered: { learned } }
}
