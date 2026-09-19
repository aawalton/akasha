import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "The raise is drawn from the strength movements Alan can perform cold.",
      workingMemory:
        'Alan will not have a cardio catalogue of its own for the warmup. A raise is an ordinary strength movement taken unloaded and easy, such as a squat without weight. The raise pool today is `exerciseCategory === "cardio"` in raisingIn, and twelve cardio pages were written for it under exercise/pages, of which the ballistic ones earn no place. What makes a movement safe cold cannot be derived from the fields a page already states.',
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
