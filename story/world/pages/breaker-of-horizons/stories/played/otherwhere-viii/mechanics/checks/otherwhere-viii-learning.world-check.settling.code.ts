import { z } from "zod"

const PER_HOUR = { studied: 0.5, studiedFast: 1, taught: 1.5, practised: 0.5 } as const

const SHARE_OF_SET = { basic: 1, signifier: 1 / 2, advanced: 1 / 3, special: 1 / 6 } as const

const MOST_FLUENCY = 100

const SLOWS_PAST = 50

const BASIC_NEEDED = 50

const HOURS = z.number().min(0)

const STUDY = z.object({
  character: z.string().trim().min(1),
  set: z.enum(["basic", "signifier", "advanced", "special"]),
  fluency: z.number().min(0).max(MOST_FLUENCY),
  basicFluency: z.number().min(0).max(MOST_FLUENCY).optional(),
  studyHours: HOURS,
  taughtHours: HOURS,
  practiceHours: HOURS,
  fastReader: z.boolean(),
})

type Studied = { readonly gained: number; readonly fluency: number }

type Settled = { readonly answered: Studied } | { readonly refused: string }

function tenths(value: number): number {
  return Math.round(value * 10) / 10
}

export function settled(reading: unknown): Settled {
  const held = STUDY.safeParse(reading)
  if (!held.success) return { refused: `study of glyphs reads so: ${z.prettifyError(held.error)}` }
  const study = held.data
  if (study.set !== "basic" && (study.basicFluency ?? 0) < BASIC_NEEDED) {
    return { refused: `the ${study.set} set waits on a basic fluency of ${BASIC_NEEDED}` }
  }
  const studiedRate = study.fastReader ? PER_HOUR.studiedFast : PER_HOUR.studied
  const raw =
    study.studyHours * studiedRate +
    study.taughtHours * PER_HOUR.taught +
    study.practiceHours * PER_HOUR.practised
  const ofSet = raw * SHARE_OF_SET[study.set]
  const gained = tenths(study.fluency >= SLOWS_PAST ? ofSet / 2 : ofSet)
  return { answered: { gained, fluency: Math.min(MOST_FLUENCY, tenths(study.fluency + gained)) } }
}
