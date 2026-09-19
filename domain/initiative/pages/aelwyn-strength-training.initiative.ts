import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "A set states the instant Alan performed it rather than the day.",
      workingMemory:
        "Warmth is a fact about the last quarter hour, and a calendar date cannot hold it. The 122 sets already logged carry no clock time anywhere, so each takes noon on the day it states, and a stopgap decision says so rather than letting a made-up hour read as a measured one. The repository already spells that conversion: NOON in the day-string module.",
    },
    {
      statement:
        "Whether Alan is warm is read from the minutes since his last set rather than from the day.",
      workingMemory:
        "Muscle temperature decays with a half-life near five minutes and is spent by fifteen to twenty. The quarter hour goes on the selection policy rather than in code, as every other number the selector reads does.",
    },
    {
      statement: "A warmup raises, mobilises and ramps rather than ramping alone.",
      workingMemory:
        "RAMP: raise the temperature, activate and mobilise through the ranges the session uses, then potentiate with ramp sets of the movement itself. A cold Alan is owed all three; an Alan already warm who has not done this movement is owed the ramp alone. Static holds over a minute cut force, so mobility before the lift is dynamic and the held stretches go after it.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
