import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "The wide Edit type no longer exists.",
      workingMemory:
        "`file-arguing.builtIn` reads argv into `{ changes: FileEdit[], message }`, the one place an edit is composed outside the landing. Two near-identical `askedFor` twins decode those bytes back to strings and name a change, in `mechanical-filing` and `tracking-landing`, differing in the write address. `builtIn` answering `Asking[]` takes both with it. `subagent-presence` is the only other reach in. A decoy in `pages/shadow` sorts first in a search.",
    },
    {
      statement: "A helper two changes share lives in a module rather than in one of the changes.",
      workingMemory:
        "Four homes landed: `literal-splicing`, `package-naming`, `json-entries`, and `specifierFor` into `code-system/code-specifier`. Two reaches remain, both held on purpose. `rename-file-page:25` takes `splicedIn` from `rename-page-slug`; it belongs in `change-answer` and waits while another intent holds that module. `remove-page-property:12` takes `requiredIn` from `remove-property-value`; it reads the checker and is its own concern. Scan across lines: a single-line scan misses one.\n",
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
        "`landedMechanically` is its own module at `command-system/mechanical-landing`, whose one caller is `subagent-presence:109`; deleting it drops the folder, the export entry and the part slug. That caller's test file is the block, over the ceiling, and dividing the file is dead. The amplification is not git: every child started inside `bun test` pays a fixed 12ms of processor time, `/bin/true` included, against 0.29ms under `bun run`. Most of its cost is that toll over 550 starts.\n",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "`landedMechanically` lands straight onto the tree at its one remaining call site, `subagent-presence`. Every other program reaches `applied` through `runMechanicalChange`, and `change-apply` reaches `applying` through `apply-running`. Those two entries into `applying.module.code.ts` are the one path that works a patch out and applies it. The patch stays inside the landing rather than being kept.",
    },
    {
      statement: "A draft survives between commands in the store an agent's page declares.",
      workingMemory:
        "`drafting` writes and commits `<agent page>.patch.diff`, which no page declares, and reads it back in a later process. The declared `edits` file is `uncommitted: true` and its successor is there: `edits-keeping`, `edits-landing`, `subagent-handed:37`. The last two patch readers are in the frozen presence file and both are drafted away: 9 handed edits fold at HEAD, deleting `tookInUnder`, `patchesUnder` and their callers. They wait on the ceiling. Take them from `dalla-a4d2c944de0c8052d`.\n",
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
    "An intent reaching `subagent-presence` waits: its test file costs more than a test file may, so every change carrying it is refused.",
  ],
} as const satisfies Initiative
