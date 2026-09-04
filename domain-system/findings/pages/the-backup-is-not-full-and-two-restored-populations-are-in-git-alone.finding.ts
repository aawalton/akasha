import type { Finding } from "../finding.page-type.ts"

export const theBackupIsNotFullAndTwoRestoredPopulationsAreInGitAlone = {
  id: "01a06811-2c7a-7bff-acdd-a0a3c36c55f8",
  pageTypeSlug: "finding",
  slug: "the-backup-is-not-full-and-two-restored-populations-are-in-git-alone",
  domainSlug: "domain/akasha-migration",
  claim:
    "The reference copy at `/var/home/walton/repos/akasha-backup-2026-09-02` does not hold every file the repo holds, so ablating on the warrant that a backup has it risks losing content recoverable from git history alone. `pages/question/` is 534 files live and 0 in the backup; `dirty/coffee-shop-date/` is 392 live and 0. `question` is the one folder under `pages/` that is live and absent from the backup.",
  evidence:
    "Counted per folder against the live tree: `pages/question` 534 files live, 0 in the backup; `dirty/coffee-shop-date` 392 live, 0, and the backup's `dirty/` names 21 story folders with no `coffee-shop-date` among them. Both populations were restored tonight from their git blobs rather than from the backup, which is consistent with the backup never having held them.\n\nThe gap is not everywhere, so it is judged per folder rather than assumed either way. `pages/domain` runs the other direction: 11 files live against 692 in the backup, and `folder-path`, `oid`, `purpose` and `quote` are all four in the backup, so for those the reference copy is the safety net it is taken for.\n\nA count of run-cost pages parts two concepts that a prefix joins. The backup holds 11 `run-cost-*.domain.md`, the live tree 7. The 7 are the bands, and `tools/lib/run-cost.ts` names exactly those 7: eternal, fast, instant, lagging, painful, slow, torture. The other 4 are `budget`, `clock`, `cpu` and `ram`, which are dimensions rather than bands, and they are in the backup and not live, so what became of them is open.",
} as const satisfies Finding
