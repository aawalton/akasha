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
      statement: "The wide FileEdit type no longer exists.",
      workingMemory:
        "`landing` takes `readonly FileChange[]` and splits it into bodies and renames itself; `rowsFrom` works the rows out from bodies against a base. `FileEdit` is still declared there and held on both sides: `Prepared` carries `bodied` beside `changes`, and `changeOf`, `carryLanded`, `installingIn`, `landing-saying.pathsOf` and `mintingOnto` take the body form. The producers still compose bodies — `file-arguing.builtIn`, `mechanical-filing`, `track-landing`, `subagent-presence`.",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "`apply-running:25` hands `applying` a flat `{ checks: true, writerOwesReading: false, readersOweReading: true }`, and `applying:260` warrants only where `writerOwesReading` is true, so an apply runs the checks and no warrant. The data is there and thrown away: `edits-keeping:36-43` reads both fields off each change and keeps them on the row. What is left is for the apply to read the rows it folds rather than a constant. That refuses landings nothing refuses today, so Alan settles it first.\n",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "Three roads land on tracked files outside `runChange`. `landedMechanically` at `command-system/mechanical-landing` has one production caller, `subagent-presence:110`, and moving it is no repoint: `runMechanicalChange` takes named change askings rather than raw bodies and reaches `applying`, where no id is minted. `notification-feed-rows:73` appends a tracked jsonl through `page-entry-queue:47`. `restore.command:207` writes bodies and the git index.\n",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "`landedMechanically` lands raw bodies straight onto the tree at `subagent-presence:110`, through `landingAsked`. Two roads work a patch out first and reach `applied`: `apply-running` for `change-apply`, and `runMechanicalChange` for every other program. Two more write tracked files with neither patch nor landing: `notification-feed-rows:73` appends through `page-entry-queue:47`, and `restore.command:207` writes bodies and the git index.\n",
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
