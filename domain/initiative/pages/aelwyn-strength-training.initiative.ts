import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "Alan calls for the cool down and is carried through it one step at a time.",
      workingMemory:
        "The selector reads where Alan is in a bout from the day's sets, but the cool down is his to call, so it is its own command rather than a step `fitness next` reaches. The held stretches are the ones `movingIn` in the warming module leaves out: pattern mobility with force static or unstated. The muscles to stretch are those the day's sets worked. A held stretch is timed, having no rep to count.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
