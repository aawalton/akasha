import type { Initiative } from "../initiative.page-type.ts"

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
        "`subagent-presence` lands through `runMechanicalChange` on every road now, naming the change adding a file of any kind and the change taking a page away, so `landedMechanically` at `commands/modules/mechanical-landing` has no caller but its own test, which proves the `MECHANICAL` change kind rather than the function. Two roads are left: `notification-feed-rows:73` appends a tracked jsonl through `page-entry-queue:47`, and `restore.command:207` writes bodies and the git index.\n",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "Every landing road works a patch out first and reaches `applied`: `apply-running` for `change-apply`, and `runMechanicalChange` for every other program, which `subagent-presence` now takes on every road of its own. Two roads write tracked files with neither patch nor landing: `notification-feed-rows:73` appends through `page-entry-queue:47`, and `restore.command:207` writes bodies and the git index.\n",
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
