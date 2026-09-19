import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "The selector answers the one step Alan is on rather than the whole session.",
      workingMemory:
        "Alan runs `akasha fitness next` mid-session and wants the single next thing to do, chosen from what he has already logged today. The offer today prints the whole plan at once: title, a run of five raises, the mobilise, the ramp and the work. The steps of a session in order are each raise movement, each mobilise movement, the ramp set, then the work sets. How far Alan has come in the session is read from the sets logged today, as the raise recency already is.",
    },
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
