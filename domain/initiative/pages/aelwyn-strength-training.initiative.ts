import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
