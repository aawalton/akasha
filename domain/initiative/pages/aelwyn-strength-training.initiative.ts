import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "A warming movement is counted in easy reps rather than timed.",
      workingMemory:
        "Alan does not want a clock on the warmup. A raise and a mobilise are each said as a number of easy repetitions. A movement whose page scores it in time keeps its seconds, since there are no reps to count. The seconds a raise runs are secondsPerRaise on the selection policy, and the run is still minutesRaising divided by those seconds.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
