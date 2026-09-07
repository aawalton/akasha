import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
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
        "Alan ruled that the patch store and the `patch` commands both go, `resolve` ablated rather than reshaped, leaving the edits ref the sole store and a patch worked out in memory for the git mechanics. It is proven derivable: a patch rebuilds from the edits byte for byte, and a conflict mark is recomputed rather than remembered. In order: close the fold's crash window, hand the patch to the landing in memory, clear the residue, stop the writer, drop the properties.",
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
    "The edits a draft keeps are stored in the format git already reads.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "A patch applies only where the caller asked for an apply.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The edits a draft keeps are the dry run.",
  ],
} as const satisfies Initiative
