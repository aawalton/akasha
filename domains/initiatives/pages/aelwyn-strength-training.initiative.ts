import type { Initiative } from "../initiative.page-type.ts"

export const aelwynStrengthTraining = {
  id: "01a07cf1-f428-7e0b-b26f-c7c657f361ba",
  pageTypeSlug: "initiative",
  slug: "aelwyn-strength-training",
  domainSlug: "domain/fitness",
  personaSlug: "aelwyn",
  intents: [
    {
      statement: "The fitness domain carries no debris from earlier attempts.",
      workingMemory:
        "Alan settled on 2026-09-07 that clearing the ground comes first. Three audits are open: dead modules across `exercise-access` and `session-planning`, duplicate and orphaned data pages under `alan/fitness/`, and the residue of earlier attempts, being the fitness findings, the gap invariants and whatever an older tree left behind. Nothing goes until an audit says removal is safe.",
    },
    {
      statement: "Every set Alan performs reaches a page.",
      workingMemory:
        "Alan settled on 2026-09-07 that the 28 days since 2026-08-10 hold no training, beyond at most one session nobody logged. He was rebuilding other systems. The hole is therefore in the training rather than in the tracking. 122 sets are logged across 16 sessions, dated 2026-06-19 to 2026-08-10, ten of the sixteen inside the eleven days from 06-19 to 06-29. Nothing recovers a session after the day that session happened.",
    },
    {
      statement: "One package holds the movement selection logic.",
      workingMemory:
        "`equipment-kit`, `movement-scoring` and `slot-templates` sit in both `exercise-access` and `session-planning`, and `set-progression` is in `exercise-access` alone. Under `commands/`, `movement-scoring` is reached twice at `@akasha/session-planning` and never at `@akasha/exercise-access`. A grep for the four `exercise-access` paths over the repository answers one line, inside the finding naming the split. The four are dead and the deletion is ready.",
    },
    {
      statement: "The equipment commands read the keys the equipment pages carry.",
      workingMemory:
        "`exercise-equipment-list` reads `equipmentItemCategory`, `equipmentItemLoads`, `equipmentItemAvailable` and three more, ordering on `equipmentItemSortOrder`; `exercise-equipment-set` writes the same six. Every equipment page carries those six names unprefixed, and has since 648fe2d2875 on 2026-09-03. Every load column reads `-`, `available` falls to its `?? true` default, and `--all` leaves nothing out. The dumbbells page names loads 3 to 30. Today's deletion of the old properties is innocent.",
    },
    {
      statement: "The history command fetches the newest sets.",
      workingMemory:
        "`exercise-history` orders on `sessionSlug` descending and slices the limit there, and a session slug opens with its weekday name, so the window runs wednesday, tuesday, thursday, sunday, saturday, monday, friday. The rows are re-sorted by date before printing, so the answer looks right. `--limit 5` on dumbbell-bench-press answers five 2026-06-25 rows and calls that day the best; the default of 20 answers all 16 and calls 2026-08-10 the best. Bench press has 16 sets, so this bites at 21.",
    },
    {
      statement: "A joint's mobility reads as a direction.",
      workingMemory:
        "Seven mobility readings exist, all dated 2026-06-19 to 2026-06-24. `akasha exercise-mobility-show` answers a trend for each of `supine-slr::right`, `supine-slr::left` and `wall-slide-overhead::n-a`, and every one reads `insufficient`. Overhead mobility near half range is already one of the thirteen coaching constraints, so what a reading would bound is programmed against today.",
    },
    {
      statement: "A layoff has a way back in that ran once.",
      workingMemory:
        "`akasha exercise-select` run on 2026-09-07, at 28 days since 2026-08-10 and so at full saturation, plans Dumbbell Bench Press at 4 sets of 15 to 17 at 30 lb and says `hold load, extend reps to 17 / add a set`. No reduction appears in the plan or among the rules fired, where the policy allows up to 12 percent. The rules named are in-kit, anchor:held, recency and coarse-jump-guard. Nothing names a layoff. So the path is unwritten rather than untested.",
    },
  ],
  constraints: [
    "The 122 sets and 16 sessions already logged stay readable through any change to how training is tracked.",
    "The coaching constraints bind what Alan is programmed to do; this initiative settles what is tracked.",
  ],
} as const satisfies Initiative
