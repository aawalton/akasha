import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement:
        "The raise is a run of short movements one after another rather than one movement held for minutes.",
      workingMemory:
        "Alan will not perform any one warmup movement for longer than 60 seconds. Five minutes of raising is therefore five movements of 60 seconds each, named in the order they are done.",
    },
    {
      statement:
        "The catalogue holds enough raises that a run of five is not the same five every session.",
      workingMemory:
        "Six raises reach Alan today: high-knees, jumping-jacks, butt-kicks, shadow-boxing, skater-hops and trail-running-walking. Every other cardio page wants a machine he does not own.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
