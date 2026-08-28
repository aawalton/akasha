---
page-type-slug: finding
slug: nine-percent-of-rows-carry-no-writer
title: "91% of rows carry the writing agent's id, the rest carry no writer, and by never enters a row at all"
domain-slug: domain/page-writes-system
---

# Claim

Across every rows sidecar in akasha, 91.0% of 4,563,109 rows carry the writing agent's own id and the other 9% carry no writer of any spelling. Where a row is attributed it is not `by` that does it: `by` never enters a row, reaching only the git commit subject, and most rows stand in `.uncommitted` sidecars that are never committed.

# Evidence

Taken 2026-08-28 over every rows sidecar in akasha: 11,573 files, 4,563,109 rows, and 4,151,469 of them carrying `agent-id` — 91.0%, the writing agent's own id, put on the row by `tools/lib/supervisor-console.ts:71` and standing on the `.lines` sidecars under `pages/seat-log-day/`.

The other 9% carry no writer at all. Across the 458 distinct top-level keys in the population, `by`, `writer`, `written-by`, `writtenBy`, `actor`, `author`, `agentId` and `seat` stand on no row. `owner` stands on 8 rows in `pages/daily-tracking/*.sessions.jsonl`, and there, like `claimed-by-slug`, it is a domain property of what the row is about rather than a record of who wrote it.

`by` never enters a row. `idStamped` at `tools/lib/page-rows-write.ts:118` adds `id` and nothing else, and `by` reaches exactly two places in that file — `commitAll` at `:270` and `:419` — where `messageFor` in `tools/lib/page-write-commit.ts:18` folds it into a git commit subject. So the attribution `by` carries lives in git history alone, and only for rows that are committed: most rows stand in `.uncommitted` sidecars that are never committed, and `rowsLanded` at `:269` skips `commitAll` for them, which makes the `by` argument dead on that path.

The 91% that are attributed are attributed the other way, by the appending caller putting its own id in the row through the `agent-id` slot `LogLine` declares at `tools/lib/log-append.ts:14`. The two mechanisms are separate and neither reaches the other's rows.

Old rows keep no writer and are not backfilled: nothing records who wrote them, and a guess written into 4,281,958 rows would read exactly like a record.
