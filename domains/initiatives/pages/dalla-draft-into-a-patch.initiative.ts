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
        "`FileEdit` is `{ path, body: Uint8Array | null, carried? }` at `command-system/landing/landing.module.code.ts:24`, reached by 26 files. Thirteen are the landing's own machinery; the rest compose an edit by hand. A change answers `Stated` instead, so the type goes once nothing composes an edit without naming a change. `pages/shadow/shadow.module.test.ts` declares a decoy of its own that sorts first in a search.",
    },
    {
      statement: "A file that is not text is refused rather than decoded into an edit.",
      workingMemory:
        "Landed as a refusal at `change.command.code.ts`, reusing `decodeUtf8` from `code-system/utf8-body`. Measured: of 121,768 tracked files exactly 80 fail a strict decode, all `.png`, two per persona. That refusal also blocks removing one, which was safe before, as a removal carries a null body. The precise route is declared already: `holdsBytes` is true on the two wallpaper file properties and nowhere else, and `no-raw-nul-bytes` reads it. A file declaring bytes is carried rather than decoded.",
    },
    {
      statement: "An edit kept in the old shape is rewritten into the shape an edit holds now.",
      workingMemory:
        "Measured on awen's ledger: 13,984 rows, all moves over distinct paths, 13,161 holding `was === body`, bodies filling 420,914,180 of its 440,492,434 bytes. The other 823 changed content as they moved, so a row migrates to a move and, where the body moved too, a replace beside it. `edited()` at `edits-keeping.module.code.ts:41-42` refuses an absent `was` and `rowsIn:71` turns that into a refusal of the whole file, so the reader admits the new shape before a ledger is rewritten.",
    },
    {
      statement: "A change is reached by its address rather than by an import.",
      workingMemory:
        "Two runners now, each with a map of its own: 18 addresses under `change-agent` and 25 under `change-mechanical` and the four page types beneath it. What is left is five changes importing another change's code for a helper rather than reaching it: `rename-page` and `remove-package-alias` from `rename-package`, `change-page-page-type` from `change-imports`, `remove-package-alias` from `remove-manifest-ways`, `add-page-property` from `add-property-value`. `runAgentChange` has no caller.",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "The apply's own `unwarranted` at `apply.command.code.ts:112-126` is not `unwarrantedIn` rewritten: the shared one reads one flag off the call, the local one filters each row, and `FileEdit` carries no `writerOwesReading` field. It runs above the glass, so the glass skips checks and skips no warrant. `patch` runs checks and does not warrant; `akasha patch apply` reaches `applying` directly where `akasha apply` warrants its rows first.",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "Nothing outside `command-system` lands through `landingAsked`; the music commands and `page-secret-acting` are converted. `landedMechanically` is its own module now at `command-system/mechanical-landing`, whose one caller is `subagent-presence:109`. Deleting it is converting that caller, then dropping the folder, the export entry and the part slug. Its six departures are each a thing this intent ends. `subagent-presence.module.test.ts` over the ceiling is the block.",
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
      statement: "The patch a landing works out is held by no page property.",
      workingMemory:
        "A stored patch deadlocked this seat: a property only an apply writes, and an apply reads before writing, refused every apply until `akasha patch drop` took the stale path out. That absence is also the one signal clearing the edits ledger, at `undone`, so `applied()` must report landing before the store goes rather than after. In order: hand the patch to the landing in memory, clear the residue, stop the writer, drop the properties.",
    },
    {
      statement: "Every property a command's page type declares is read.",
      workingMemory:
        "5 of 27 properties on `command.page-type.ts` are read: `change-kind-slug` by `kindOf`, `taking` and `help-notes` by `surfaceOf`, `said` and `takes` by `helpOf`; `akasha change` reads `help-notes` a second time off its own page. The other 22 are proven unread by deleting each and diffing `--help`, on an instrument that fired on all 5. `parse-args` reads the same vocabulary off `CommandHelp`, a hand-written twin set by 5 literals, so either `calling` grows or the page type shrinks.",
    },
    {
      statement: "The check phase an apply runs in is named `change-apply` rather than `patch`.",
      workingMemory:
        "`check-cost` writes a `phase` on every row, and the only two values written are `patch` and `audit`: 197,067 rows hold `patch` against 661 for `audit`. The apply's checks are the `patch` rows, so the name says the old store rather than the act it names. A rename reaches the writer, whatever reads a recorded row, and the 197,728 rows already written across 45 files beside check pages.",
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
