import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "An edit holds only the information needed to make that edit.",
      workingMemory:
        "The ledger stores narrow rows and the mechanical and agent producers answer them. Measured on real ledgers: a move-heavy one cuts 98.7%, write-heavy ones 0 to 3.2%, so the compression is bounded by what the producer names rather than by how the ledger stores it. `narrowed` no longer refuses the six shapes `gathered` reaches where `was` is null. What is left: `Edit` losing its un-kinded member across the fourteen files importing it, and the ten whole-file producers.",
    },
    {
      statement: "The edits an agent keeps are an uncommitted file rather than a git object.",
      workingMemory:
        "`settled` writes the whole ledger through `git hash-object -w` on every append, so a ledger grown to n rows has written on the order of n squared bytes; `.git/objects` climbed 8.6 GB to 13.3 GB in twelve minutes. `check-cost` already holds the pattern replacing it: `uncommittedPartAt` beside the page, `appendFileSync`, and a ceiling rolling over to a further part, at 197,728 rows across 45 files. `file-property/edits` is declared on the agent page type already, defaulting to `jsonl`.",
    },
    {
      statement: "A change applies as it answers rather than waiting for an apply.",
      workingMemory:
        "The code is landed and a refusing change still lands nothing, but `change.command.ts` was left declaring the old default across roughly fifteen invariants and four help notes. Applying by default takes the message an apply works out where none is named. Alan named `draft` as the opt-out, holding the edits for a later apply, and ruled the flip reaches subagents. Without an opt-out no module can be created at all, as a page declaring code and the file beside it arrive together.",
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
        "Met but for one defect. `REACHED` is `change`, so the map covers all 43 addresses where it held 25: 25 mechanical, 15 checked, 2 authored, 1 restated, and `change-command` has no pages. The absence invariant barring command-line changes is deleted. `move-folder-package` reaches both siblings by address. The residue: `addedTo` writes what `gathered` answers into `kept.over` without reading `refused`, so a refusal blanks the ledger rather than surfacing.",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "The apply's own `unwarranted` at `apply.command.code.ts:112-126` is not `unwarrantedIn` rewritten: the shared one reads one flag off the call, the local one filters each row, and `FileEdit` carries no `writerOwesReading` field. It runs above the glass, so the glass skips checks and skips no warrant. `lint-exception` and `patch` both run checks and neither warrants; `akasha patch apply` reaches `applying` directly where `akasha apply` warrants its rows first.",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "`harness-landing` writes the tree with raw `writeFileSync`, `renameSync` and `rmSync`, reaching neither `landing` nor a change. `page-writing` lands with a null gate. Every `landedMechanically` call site composes its own `FileEdit`. `replace` builds its own `FileEdit` and imports nothing from `changes/`, so it is `change-file`'s act written twice. The `addressed` sidecar types every address as `Parameters<typeof import(path)['runChange']>[1]` and holds 25, all `change-mechanical-*`.",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "`landedMechanically` lands straight onto the tree at every call site. `page-writing.module.code.ts:147` calls `landing()` with a null gate and skips the ask. `harness-landing` writes the tree with `writeFileSync` and `renameSync`, never reaching `landing`. `applying.module.code.ts` is the one path that works a patch out and applies it, and both `akasha apply` and `akasha change --apply` reach it. The patch stays inside the landing rather than being kept.",
    },
    {
      statement: "Only `akasha change` drafts changes.",
      workingMemory:
        "`replace`, the one command drafting where it should land at once, is gone; its act is `change-file`. `apply`, `patch` and `lint-exception` work on a patch rather than making one. Every other command declares `change-mechanical` and lands through `landedMechanically`, which is right. The edits `akasha change` keeps are the git ref `refs/akasha/edits`, and `landedMechanically` carries an unused `agentId` that would turn drafting on.",
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
