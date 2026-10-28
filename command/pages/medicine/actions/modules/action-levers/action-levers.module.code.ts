import {
  COLONOSCOPY,
  type Held,
  SLEEP_FLOOR_HOURS,
  STEPS_TOP,
} from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"
import {
  type Evidence,
  leveledBy,
  ROUTINE_LEVERS,
  type RoutineLever,
  waitingOn,
} from "akasha/command/pages/medicine/modules/mortality-routines/mortality-routines.module.code.ts"

const BMI_TARGET = 25

export type Lever = {
  readonly named: string
  readonly evidence: Evidence
  readonly to: (held: Held) => Held
  readonly waitsOn?: (held: Held) => string | null
  readonly caveat?: string
}

function routineLever(one: RoutineLever): Lever {
  return {
    named: one.named,
    evidence: one.evidence,
    to: (held) => ({ ...held, routines: leveledBy(one, held.routines) }),
    waitsOn: (held) => waitingOn(one, held.routines),
    ...(one.caveat === undefined ? {} : { caveat: one.caveat }),
  }
}

export const LEVERS: readonly Lever[] = [
  {
    named: "steps up to 7,000 a day",
    evidence: "observational",
    to: (held) => ({
      ...held,
      steps: held.steps === null ? STEPS_TOP : Math.max(held.steps, STEPS_TOP),
    }),
  },
  {
    named: "no red or processed meat",
    evidence: "observational",
    to: (held) => ({ ...held, meatPerDay: 0 }),
  },
  {
    named: "sleep down to 7 hours",
    evidence: "confounded",
    to: (held) => ({
      ...held,
      sleepHours: held.sleepHours === null ? null : Math.min(held.sleepHours, SLEEP_FLOOR_HOURS),
    }),
  },
  {
    named: "stopping stimulants",
    evidence: "observational",
    to: (held) => ({ ...held, onStimulant: false }),
  },
  {
    named: "weight down to BMI 25",
    evidence: "observational",
    to: (held) => ({ ...held, bmi: held.bmi === null ? null : Math.min(held.bmi, BMI_TARGET) }),
  },
  {
    named: "colonoscopy every 10 years from 45",
    evidence: "trial",
    to: (held) => ({ ...held, colorectalScreening: COLONOSCOPY }),
  },
  {
    named: "safety level held at 3 or above",
    evidence: "observational",
    to: (held) => ({ ...held, shareBelowThree: 0, shareBelowZero: 0 }),
  },
  ...ROUTINE_LEVERS.map(routineLever),
]

export function waitsOf(lever: Lever, held: Held): string | null {
  return lever.waitsOn?.(held) ?? null
}

export function jointly(levers: readonly Lever[]): (held: Held) => Held {
  return (held) => levers.reduce((into, one) => one.to(into), held)
}
