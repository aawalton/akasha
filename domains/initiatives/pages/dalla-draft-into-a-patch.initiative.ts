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
      statement: "A file that is not text is refused rather than decoded into an edit.",
      workingMemory:
        "Two functions named `textIn` differ: `change-running:70` throws `NOT_TEXT` where `decodeUtf8` answers null, and `mechanical-change-running:39` answers null instead. The `askedFor` twins refuse with `notUtf8` before either is reached. `holdsBytes` is true on the two wallpaper file properties and nowhere else, and `no-raw-nul-bytes` and `change-taboo-terms` both read it. A file declaring bytes is carried rather than decoded.",
    },
    {
      statement: "A helper two changes share lives in a module rather than in one of the changes.",
      workingMemory:
        "Every reach from one change to another goes by address. Ten imports remain, each borrowing a helper rather than reaching work: splice and property arithmetic from `add-property-value` and `remove-property-value`, manifest arithmetic from `remove-manifest-ways`, package parsing from `rename-package`, and two more. `changes/modules` already holds `change-answer` and `page-literal`. `runAgentChange` has no caller and cannot go: it is all its file holds, and `code` is required on `page-type/module`.",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "`apply-running:25` declares the apply's run as `{ checks: true, writerOwesReading: false, readersOweReading: true }`, and `applying:252` runs `warrantedAgain` only where `writerOwesReading` is true, so an apply runs the checks and no warrant. The warrant runs earlier, at `asking:255` and `file-arguing:276`, both reaching `unwarrantedIn` in `warrant-owing`. What is left is for the apply to warrant what its own changes call for.",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "`landedMechanically` is its own module at `command-system/mechanical-landing`, whose one caller is `subagent-presence:109`. Deleting it is converting that caller, then dropping the folder, the export entry and the part slug. Its six departures are each a thing this intent ends. The block is `subagent-presence.module.test.ts` at 10.5 processor seconds: 17 landing tests at 0.53 over 1 fixed, so three test files fit under 5 and two do not. Nothing touching presence lands until that division lands.",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "`landedMechanically` lands straight onto the tree at its one remaining call site, `subagent-presence`. Every other program reaches `applied` through `runMechanicalChange`, and `change-apply` reaches `applying` through `apply-running`. Those two entries into `applying.module.code.ts` are the one path that works a patch out and applies it. The patch stays inside the landing rather than being kept.",
    },
    {
      statement: "Only `akasha change` drafts changes.",
      workingMemory:
        "`change-draft`, `change-apply` and `change-drop` are the acts, and `change-apply` works on a patch rather than making one. Every other command declares `change-mechanical` and lands through `runMechanicalChange`, which is right. `landedMechanically` takes an `agentId` that drafts rather than lands, and no caller hands one.",
    },
    {
      statement: "A draft survives between commands in the store an agent's page declares.",
      workingMemory:
        "`drafting` writes and commits `<agent page>.patch.diff`, which no page declares, and `patchIn` reads it back in a later process, so a draft crosses between commands through it. The declared `edits` file is `uncommitted: true`. The successor exists: `edits-keeping`, `edits-landing`, and `subagent-handed:37` finds handed work through `editsAt(page)`. Two readers of the patch remain, both in the frozen presence file: `patchesUnder:205` spells the name by hand, and `:170` calls `tookIn`.",
    },
    {
      statement: "Every property a command's page type declares is read.",
      workingMemory:
        "5 of 27 properties on `command.page-type.ts` are read: `change-kind-slug` by `kindOf`, `taking` and `help-notes` by `surfaceOf`, `said` and `takes` by `helpOf`; `akasha change` reads `help-notes` a second time off its own page. The other 22 are proven unread by deleting each and diffing `--help`, on an instrument that fired on all 5. `parse-args` reads the same vocabulary off `CommandHelp`, a hand-written twin set by 5 literals, so either `calling` grows or the page type shrinks.",
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
