import type { Initiative } from "../initiative.page-type.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  pageTypeSlug: "initiative",
  slug: "aelwyn-strength-training",
  domainSlug: "domain/fitness",
  personaSlug: "aelwyn",
  intents: [
    {
      statement: "Every set Alan performs reaches a page.",
      workingMemory:
        "122 sets are logged across 16 sessions, dated 2026-06-19 to 2026-08-10. Ten of the sixteen fall inside the eleven days from 06-19 to 06-29, and 07-03, 07-25, 07-29 and 08-10 are each alone. Nothing is written for the 28 days since. Whether those days hold training nobody logged or no training at all is unread, and the two ask for different work.",
    },
    {
      statement: "One package holds the movement selection logic.",
      workingMemory:
        "`equipment-kit`, `movement-scoring` and `slot-templates` sit in both `exercise-access` and `session-planning`, and `set-progression` is in `exercise-access` alone. Under `commands/`, `movement-scoring` is reached twice at `@akasha/session-planning` and never at `@akasha/exercise-access`. A grep for the four `exercise-access` paths over the repository answers one line, inside the finding naming the split. The four are dead and the deletion is ready.",
    },
    {
      statement: "An equipment page states the load that piece reaches.",
      workingMemory:
        "`akasha exercise-equipment-list` answers five owned pieces, being adjustable bench, dumbbells, hand gripper, kettlebells and weighted vest, and each of the three load columns reads `-`. The 30 lb dumbbell ceiling is written as a coaching constraint instead, in the prose `30 lb DB ceiling — actively out-repping`, so the selector reads a sentence where it wants a number.",
    },
    {
      statement: "A joint's mobility reads as a direction.",
      workingMemory:
        "Seven mobility readings exist, all dated 2026-06-19 to 2026-06-24. `akasha exercise-mobility-show` answers a trend for each of `supine-slr::right`, `supine-slr::left` and `wall-slide-overhead::n-a`, and every one reads `insufficient`. Overhead mobility near half range is already one of the thirteen coaching constraints, so what a reading would bound is programmed against today.",
    },
    {
      statement: "A layoff has a way back in that ran once.",
      workingMemory:
        "The selection policy states layoffGraceDays 10, layoffSaturationDays 28 and layoffMaxLoadReduction 0.12, so the 28 days since 2026-08-10 sit at full saturation and the largest reduction the policy allows is 12 percent. No session has been planned across a layoff of any length, so the reduction has never been read against sets Alan performed.",
    },
  ],
  constraints: [
    "The 122 sets and 16 sessions already logged stay readable through any change to how training is tracked.",
    "The coaching constraints bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
