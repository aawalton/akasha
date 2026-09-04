import type { Finding } from "../finding.page-type.ts"

export const esoHealthSampleRowsLandInSidecarsWhosePageIsNeverMinted = {
  id: "01a06a44-1c30-7a10-9f52-3b7c8e0d4411",
  pageTypeSlug: "finding",
  slug: "eso-health-sample-rows-land-in-sidecars-whose-page-is-never-minted",
  domainSlug: "domain/akasha-migration",
  claim:
    "Five `health-samples.jsonl` sidecars under `akasha/alan/` hold 251 rows of Alan's ESO health tracking with no page beside them, each alone in its folder, so the rows are unreachable. The migration did not do this: the owning paths never existed in git history, and the 2026-09-02 backup shows the same orphan state for the two dates it covers. The writer lands rows without minting the page.",
  evidence:
    "Measured 2026-09-03. An orphan detector deriving the owner as `<dir>/<field1>.<field2>.ts` from each `.jsonl` basename, seeded first against a folder holding a real page with three sidecar variants (`rows.jsonl`, `rows.uncommitted.jsonl`, `rows.part2.uncommitted.jsonl`) and two deliberate ghosts, reported both ghosts and neither real pair.\n\nAn earlier rule that stripped only the last two dot-components reported 420 orphans, 360 of them under `akasha/seat-system/seat-log-days`. Those were false: the `.uncommitted` and `.part2.uncommitted` infixes made it derive `...seat-log-day.lines.ts` when the page beside them is `...seat-log-day.ts`, which `ls` on the folder showed present. The corrected rule reports 26 orphans over 15,975 jsonl files.\n\nFive of the 26 are under `akasha/`:\n`tracking/daily/eso-days/pages/2026-08-31` 11 rows, `/2026-09-01` 26, `/2026-09-02` 1, and `eso-daily-tracking/eso-daily-trackings/eso-day-2026-09-02` 108, `/eso-day-2026-09-03` 105. Each folder holds the sidecar and nothing else.\n\n`git log --diff-filter=AD` on two of the owner paths returns nothing, so no commit ever added or deleted them. 234 `.eso-day.ts` pages exist for earlier dates against 238 sidecars; the last page is 2026-08-23 and the last sidecar with a page is 2026-08-22. `find` for `*eso*2026-09-03*` outside `findings/` returns the sidecar alone.\n\nThe two paths show a move in flight from `eso-day` to `eso-daily-tracking`, and both ends orphaned, so the writer at the new path repeats the defect.",
} as const satisfies Finding
