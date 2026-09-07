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
        "Every change loads one way, through `runChange` by address. This is for one loading path rather than for guards: `guardSlugs` is declared on `ChangeMechanical` alone, so no guard is skipped. `address-mapping` builds the map from `change-mechanical` alone and bars command-line changes, which Alan's direction supersedes. `move-folder-package` is the one site importing a sibling; converting it answers the same, and its hand-built world re-gathers edits its inner reaches added.",
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
        'The tracked `.patch.diff` files are the old store the edits ref replaces; a patch exists from here only to keep the git mechanics clean. The four still tracked, for ali, athena and the subagents of awen and olwen, are resolved before the property is dropped. `patch-keeping` still calls `besideAt(page, "patch", "diff")` and 10 tests assert that file. `edits.file-property.ts` is already stale, since no `.edits.jsonl` is on disk.',
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
    "A patch and its conflicts are stored in the formats git already reads.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "A patch applies only where the caller asked for an apply.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The patch a draft keeps is the dry run.",
  ],
} as const satisfies Initiative
