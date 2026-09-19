import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "The push-up Alan is raised on is the one off his knees.",
      workingMemory:
        "Plain Pushups carries raisesCold today and is the full movement. A knee push-up is its own page under exercise/pages, body-only, strength, h-push, chest, aelwyn-custom, with raisesCold and a one-step instructions file. Pushups loses raisesCold once the knee page is there.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
