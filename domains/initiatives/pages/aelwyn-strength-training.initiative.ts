import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  type: "initiative",
  slug: "aelwyn-strength-training",
  domain: "domain/fitness",
  persona: "aelwyn",
  intents: [
    {
      statement: "The fitness domain carries no debris from earlier attempts.",
      workingMemory:
        "Gone: the four pageless `exercise-access` sidecars, the whole planner, `exercise-collection` (no page ever), `free-exercise-mapping`, `exercise-digest`, `training-digest`, the inactive schedule `push-pull-legs-7351f33b` with its seven days, two false gaps on `coaching-context`, the workout sessions and schedules, and the migrated-twice finding. All 884 exercise folders agree with their slugs. Left: five imports lacking instructions.",
    },
    {
      statement: "Every set Alan performs reaches a page.",
      workingMemory:
        "Alan settled on 2026-09-07 that the 28 days since 2026-08-10 have no training, beyond at most one bout nobody logged. He was rebuilding other systems. The hole is therefore in the training rather than in the tracking. 122 sets are logged across 16 bouts, dated 2026-06-19 to 2026-08-10, ten of the sixteen inside the eleven days from 06-19 to 06-29. Each set now has its own date and names its day. Nothing recovers a bout after the day that bout happened.",
    },
    {
      statement: "A planner chooses Alan's next movement from principles he settled.",
      workingMemory:
        "The old planner is deleted: the `session-planning` package whole, and the commands `exercise-select`, `exercise-next-set` and `exercise-ranks`. Alan called for a rebuild from first principles on 2026-09-08. Nothing chooses a movement today. Kept for the rebuild: the goal weights L40 E30 F20 A10, the layoff and novelty knobs the selection policy has, the 23 fitness coaching notes, and the 884-movement catalogue. The principles themselves are unsettled.",
    },
    {
      statement: "A joint's mobility reads as a direction.",
      workingMemory:
        "Seven mobility readings exist, all dated 2026-06-19 to 2026-06-24. `akasha exercise-mobility-show` answers a trend for each of `supine-slr::right`, `supine-slr::left` and `wall-slide-overhead::n-a`, and every one reads `insufficient`. Overhead mobility near half range is already one of the 23 fitness coaching notes, so what a reading would bound is programmed against today.",
    },
    {
      statement: "A layoff has a way back in that ran once.",
      workingMemory:
        "`akasha exercise-select` run on 2026-09-07, at 28 days since 2026-08-10 and so at full saturation, plans Dumbbell Bench Press at 4 sets of 15 to 17 at 30 lb and says `have load, extend reps to 17 / add a set`. No reduction appears in the plan or among the rules fired, where the policy allows up to 12 percent. The rules named are in-kit, anchor:held, recency and coarse-jump-guard. Nothing names a layoff. So the path is unwritten rather than untested.",
    },
    {
      statement: "A movement Alan may not perform is gone before any movement is ranked.",
    },
    {
      statement:
        "Every constraint keeping a movement out names when that constraint is tested again.",
    },
    {
      statement:
        "A movement pattern's coverage is counted over the week rather than over one session.",
    },
    {
      statement:
        "The next movement is chosen from what Alan has already done rather than planned as a session.",
    },
    {
      statement:
        "Whether the next movement is new or familiar is decided by what Alan has already done today.",
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
      statement:
        "A muscle under its weekly set floor is owed work before any muscle above that floor.",
    },
    {
      statement: "A set counts toward the weekly total only where that set was taken near failure.",
    },
    {
      statement:
        "How Alan is today is read from the sets Alan has just done rather than asked in advance.",
    },
    {
      statement: "The first movement offered is one Alan has done enough to read a drop against.",
    },
    {
      statement: "How long Alan was away is no reason to expect more or less of Alan today.",
    },
    {
      statement: "A movement Alan turns down tells the selector as much as a set Alan finishes.",
    },
    {
      statement: "A movement chosen carries the weight to use and a suggested number of reps.",
    },
  ],
  constraints: [
    "The 122 sets already logged stay readable through any change to how training is tracked.",
    "The fitness coaching notes bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
