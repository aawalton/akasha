---
id: 09e4699e-c645-5062-9e72-b0fe664a0c1c
page-type-slug: finding
title: "Notin skips composed column"
domain-slug: domain/pages-system
---

# Claim

`notIn` on a composed read column lowers to jsonb containment, where `in` on the same key uses the column.

`filters-where.ts:142` calls `toColumn`, which covers promoted columns only. The `in` branch at :116 calls `toReadColumn`, which also covers composed columns such as `status`. So the blocked census re-parses `attributes` per row rather than comparing a text column: 228ms and 59,262 buffers, against 48ms and 19,871 for the same filter written on the column.

# Evidence

Measured 2026-08-09 16:45 UTC, live database, read-only.

The alert fired on fingerprint -9005132544390811429 at a 254ms mean, sustained rather than a tail: 254.4ms at 30 minutes, 269.5 at seven days, flat between.

The measured caller is `blocked-census-gather.ts:97`: `getPages` on `project`, `notIn` the three terminal statuses `done`, `not_doing` and `duplicate`, which cover 13,554 of 14,004 live project rows.

`toColumn` (`routing-core.ts:57`) covers promoted, writable keys only; `toReadColumn` (`:107`) adds `COMPOSED_READ_COLUMN`. `status` is composed, and `:68` names `pages_status_completed_at_idx` as the index that path exists to reach. `in` was widened to `toReadColumn` under #14789; `notIn` was not, and its comment at `:134` still calls the promoted case the only column case.

EXPLAIN (ANALYZE, BUFFERS) on both lowerings of that filter: shipped, `NOT attributes @> {status: …}` x3, 228.4ms and 59,262 buffers; on the column, `status <> …` x3, 48.4ms and 19,871. Both took the same index scan, removed the same 13,781 rows and returned the same 450. So the cost is not index choice but parsing `attributes` once per clause per row.

Five call sites pass `notIn`, all keyed on `status`. A second fingerprint, -5819039513251025396, went over budget the same hour at a steady 237ms: four negated clauses and no other filter — `project/census.ts:152` or `sibling-dep-census.ts:125`, both adding `someday_maybe` to the three terminal statuses. Those four cover 13,994 of 14,004 project rows, so it parses `attributes` four times per row to discard all but ten.

The two lowerings differ where the column is null: `NOT (status = v)` is null and excludes the row; the containment form includes it. No live project row has a null status, so they agree here; a fix must settle other keys.

Not established: whether `notIn` was left on `toColumn` deliberately over that null divergence or simply not revisited when `in` moved; and which census site produces the second fingerprint.
