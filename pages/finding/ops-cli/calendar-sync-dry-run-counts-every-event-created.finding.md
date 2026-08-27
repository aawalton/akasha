---
id: 5941de47-dcfd-5c13-8945-7a732348a1b2
slug: calendar-sync-dry-run-counts-every-event-created
page-type-slug: finding
title: "Calendar sync dry run counts every event created"
domain-slug: domain/ops-cli
---

# Claim

`ops calendar sync run --dry-run` reports every event it fetched as `created`, whatever already stands in the estate. The counts a dry run prints are therefore not a preview of what a real run would do, and the flag's own help — "Fetch + map but write nothing; print counts only" — reads as though they were.

# Evidence

Measured 2026-08-13 while proving the moved body of this verb. Two runs, one against the live tree and one against the worktree, both printing byte-identically:

    --- Syncing provo-library ---
    provo-library: created=549 updated=0 failed=0
    --- Done --- sources=1 created=549 updated=0 failed=0

`provo-library` has been synced before, so a real run would report most of those 549 as updates. Zero updates is the mechanism showing rather than a fact about the source.

`packages/alanwalton/calendar/sync/src/sync/sync-source.ts` line 79: `const known = options.dryRun ? new Set<string>() : await existingExternalIds(sb, sourcePageId)`. Each mapped item then takes `isNew: !known.has(event.id)`, and the tally counts `isNew` as created and everything else as updated. Under `--dry-run` the known set is empty by construction, so every event is new.

The skipped lookup is a read rather than a write, so this is not the dry run protecting anything — `existingExternalIds` queries pages and would be safe to run. What the flag genuinely does protect is real: verified before running it, `syncAll` skips `trackSyncRun` and `patchPageById` under `dryRun`, and `syncSource` returns at line 115 before the only write it holds, `upsertPages`. So the sandbox is sound and the counts are the part that misleads.

This is a fact about the capability in the code repository, not about the moved body — it read the same before and after the move, which is how it was noticed.

Not established: whether the empty set was chosen to save a query or is an oversight, and whether anything reads these counts other than a person at a terminal.
