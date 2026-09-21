import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "page-type/initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "persona/aelwyn",
  intentStack: [
    {
      statement: "A working set is reached without a ramp set before it.",
      workingMemory:
        "The ramp sits between the mobilise and the work in warming and stepping. Dropping it leaves raise, mobilise, work, and makes warmupLoadShare and warmupReps dead policy.",
    },
    {
      statement:
        "A day's work is capped by a volume target that rises slowly and falls on a missed week.",
      workingMemory:
        "Alan crashes metabolically when he lifts too much; the last workout cost him two days. The target seeds at 3000 lb from 2026-09-21, rises 20 lb after a day that meets it, falls 100 lb after a week that never did. Reaching it turns the selector to cooldown. Warmups count.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
