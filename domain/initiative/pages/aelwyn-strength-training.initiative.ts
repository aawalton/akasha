import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "A planner chooses Alan's next movement from principles he settled.",
      workingMemory:
        "The principles are settled and are the intents below this one, so this intent is met once every one of them is built. The old planner is deleted and nothing chooses a movement yet. What is built: `akasha fitness week`, at 579b001, reading the trailing seven days into a set count for each muscle against the weekly floor and ceiling and for each pattern. Kept for the rebuild: the 884-movement catalogue, the 23 coaching notes, the selection policy numbers, and the 122 logged sets.",
    },
    {
      statement: "A joint's mobility reads as a direction.",
      workingMemory:
        "Seven readings exist, between 2026-06-20 and 2026-06-24, none since. Only forward-fold has more than one: three, on 06-20, 06-23 and 06-24. supine-slr has one a side and wall-slide-overhead has one, so no direction reads from either. `akasha exercise-mobility-show` is deleted with the planner. The overhead-mobility and ankle-dorsiflexion notes already program against what a reading would bound, so this waits on Alan reading again rather than on code.",
    },
    {
      statement: "A layoff has a way back in that ran once.",
      workingMemory:
        "Alan confirmed on 2026-09-18 that he has not trained since 2026-08-10, so the way back in is wanted now. `akasha exercise-select` is deleted. The intent below saying how long Alan was away is no reason to expect more or less of him killed the three layoff numbers, taken off the selection policy at 00fe0f1. So the way back in is a first movement Alan has history enough to read a drop against, and today read from the sets he has just done.",
    },
    {
      statement: "A movement Alan may not perform is gone before any movement is ranked.",
    },
    {
      statement:
        "Every constraint keeping a movement out names when that constraint is tested again.",
    },
    {
      statement: "The most valuable movement available is always the one offered next.",
    },
    {
      statement:
        "A movement's value is weighed against the goals Alan states rather than training in general.",
    },
    {
      statement:
        "A movement is dropped when that movement stops progressing rather than after a fixed time.",
    },
    {
      statement: "A dropped movement is offered again once its pattern has progressed elsewhere.",
    },
    {
      statement: "A movement Alan's kit cannot load further is made harder some other way.",
    },
    {
      statement: "A movement Alan turns down tells the selector as much as a set Alan finishes.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
