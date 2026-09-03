import type { Finding } from "../finding.page-type.ts"

export const aNestedProgressFixtureWentWithTheOrphanedMockThatHeldIt = {
  id: "01a066a0-1b40-7a3e-9c51-4d2f80b3e7c1",
  pageTypeSlug: "finding",
  slug: "a-nested-progress-fixture-went-with-the-orphaned-mock-that-held-it",
  domainSlug: "domain/temper",
  claim:
    "`crossProgress` was the only fixture anywhere shaping a task's `progress` as a nested record of sixteen per-character entries, and it went when its orphaned mock was ablated. That nested shape is the one the filed `isCompleteForever` regression depends on, so the fixture that would have shown the regression is now reachable only from the backup.",
  evidence:
    "`temper/scripts/src/watcher/import-tasks-complete-forever/mocked-pages-access.ts` exported `crossProgress(current, total, activeEntryKey?)`, which built `{ current, total, entries }` with `entries` holding sixteen `char-N` records of `{ current, total, sortOrder, label }`, and `cumulativeRow(progress)` filed that under the key `progress`.\n\nNothing imported the file. A search of the whole repository for `mocked-pages-access` answers with one hit, the finding `the-temper-code-audit-names-entry-points-that-match-no-file`, which records that commit `09f964f5c5` deleted all 27 test files the package held and left this helper and three others with no consumer.\n\nThe finding `the-watchers-finished-forever-read-ignores-the-nested-progress-still-declared` records that `isCompleteForever` inside akasha reads `progressCurrent` and `progressTotal` and never reads `progress`. `watcher-import-tasks.module.test.ts` covers the cap-reached, goes-rather-than-rolls and swept-away cases at lines 125, 225 and 367, and every task it builds through `taskOf` carries flat keys, so no test inside akasha puts a nested `progress` in front of that reader.\n\nThe file is at `/var/home/walton/repos/akasha-backup-2026-09-02/temper/scripts/src/watcher/import-tasks-complete-forever/mocked-pages-access.ts`, 71 lines.",
} as const satisfies Finding
