---
id: 4998afb0-2311-5cdc-9799-a79a85a3a7a0
page-type-slug: finding
title: "Page list count not returned"
domain-slug: domain/ops-cli
---

# Claim

`ops page list --json`'s `count` field is total matching rows, not rows returned — `--type project --limit 3` returns 3 rows with `count: 12997` (matching a direct psql count) — so a caller deriving row count via `.count` instead of `.pages | length` reads a ~4000x-inflated number, the same trap #16426 fixed on `ops project list` by adding a `returned` key.

# Evidence

From project #16432 (domain `ops-cli`). Never carried an objective — this is its capture.

`ops page list --json` emits `{ count, next_cursor, pages, truncated }`. `count` is total matching, not rows returned — verified: `--type project --limit 3` returns 3 rows with `count: 12997`, matching a direct psql count of project pages.

The envelope answers three questions with three numbers but names only two, leaving "how many rows do I have in hand" derivable only as `.pages | length`. That derivation is the exact defect #16426 removed from `ops project list` by adding a `returned` key.

Worse than `project list`'s gap: `count` is the obvious key to reach for, and it is wrong by the size of the whole table. An agent reaching for `.count` reads 12997 for 3 rows in hand — a 4000x error, larger and more authoritative-sounding than the one it replaced, precisely because the key is named `count`. Found by athena reviewing #16426; this trap is why that row shipped `returned` alongside `count` rather than `count` alone.

Fix, mirroring #16426: `returned` = rows in hand (always exact, never null), `count` = total matching (unchanged semantics, nullable only when unprovable). Purely additive; no key renamed, removed, or restructured.

Why its own row, not folded into #16426: `page list` is the higher-traffic verb by a wide margin and is consumed well outside the projects CLI, needing its own blast-radius enumeration rather than inheriting one done for a narrower verb. #16426 deliberately did not widen the shared core — it extracted `gatherEntityList` so `migration list` and `temper task list` still emit exactly `[pages, truncated]` (verified). Whether `returned` belongs on the shared core for all entity-list verbs, or only the two verbs carrying `count`, is the design question this row leaves open, as #16426 explicitly left it.

Prior art: #16426's `decideListCounts` pure decider, its `count: null` unprovable case, and its passthrough plus explicit `Object.keys` key-set assertion.
