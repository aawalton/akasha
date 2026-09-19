import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
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
