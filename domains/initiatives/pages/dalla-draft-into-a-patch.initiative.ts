import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-draft-into-a-patch",
  domain: "page-type/change",
  persona: "dalla",
  intents: [
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "`apply-running:25` hands `applying` a flat `{ checks: true, writerOwesReading: false, readersOweReading: true }`, and `applying:260` warrants only where `writerOwesReading` is true, so an apply runs the checks and no warrant. The data is there and thrown away: `edits-keeping:36-43` reads both fields off each change and keeps them on the row. What is left is for the apply to read the rows it folds rather than a constant. That refuses landings nothing refuses today, so Alan settles it first.\n",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "`notification-feed-rows` names the feed's files uncommitted, so the append through `page-entry-queue:47` lands on a path the repository ignores rather than a file git tracks. `queueAt`'s other caller, `transport-log`, is reached by no log path. `landedMechanically` has no caller but its own test. `restore.command:206` writes HEAD's own body back, landing no change. `repository-is-written-by-a-change` holds the rest and sees no write of anything but TypeScript.\n",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "Every landing road works a patch out first and reaches `applied`: `apply-running` for `change-apply`, and `runMechanicalChange` for every other program, which `subagent-presence` takes on every road of its own. No road left writes a file git tracks with neither patch nor landing; the notification feed's rows are named uncommitted now. `restore.command:206` writes HEAD's own body back, landing no change.\n",
    },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "The edits an agent keeps are an uncommitted file appended to in place.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The edits a draft keeps are the dry run.",
  ],
} as const satisfies Initiative
