import type { Finding } from "../finding.page-type.ts"

export const aWholeFileLandingResurrectsAFileASiblingDeleted = {
  id: "01a06874-bc0a-7000-9fce-af021accc73d",
  pageTypeSlug: "finding",
  slug: "a-whole-file-landing-resurrects-a-file-a-sibling-deleted",
  domainSlug: "domain/akasha-migration",
  claim:
    "A `landedMechanically` change built from a path a worker chose before reading the tree writes that path back where a sibling has since deleted it, and the landing reports it as an ordinary write. This is the known whole-file revert with the file absent rather than changed, and it is harder to catch: a reverted line shows in `git show` as a deletion beside the sibling's addition, while a resurrected file shows as a plain addition with no deletion at all, which is exactly what a first landing of a new file looks like. The tell is `git log --stat` naming the same path as a deletion in an earlier commit.",
  evidence:
    "Measured 2026-09-03 12:30 while migrating `tools/lib/oauth-*`. My landing `8c79e6e47f` wrote `services/claude-account-upkeep.ts` (+118) and `services/claude-account-upkeep-stall.ts` (+217), both with zero deletions. The service-entry-point lane had carried both in at `e4cc86cdde` as `akasha/agents/claude-accounts/modules/account-upkeep-running/` and `.../account-upkeep-stall-reading/` and removed the entry points; `services/` held nothing else, so my landing recreated the directory. `code` was 0 and the report read `wrote services/claude-account-upkeep.ts`, indistinguishable from a first write. What surfaced it was reading `git show --stat` and noticing two files I believed I was editing carried no deletions — an edit to a file that stands shows both. `bc6952940a` takes both away again and points the two akasha modules at the new `claude-account-upkeep` and `claude-account-upkeep-stall` modules. The general rule the two faults share: a whole-file landing must be built from bytes read after the last sibling landing, and a path a worker is editing rather than creating must be confirmed to still stand before the change is built.",
} as const satisfies Finding
