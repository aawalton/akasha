---
id: b2a53734-db63-59a8-9e64-dd2058c26379
page-type-slug: finding
title: "What still reaches the database pages system"
domain-slug: domain/pages-system
---

# Claim

Measured 2026-08-20: 59 stored functions name the `pages` table, not 65. Commit 6d4dc66eea, landed minutes into this session, dropped exactly the six that account for the difference. 52 of the 59 are machinery that dies with the system and 7 are domain readers. In TypeScript, nine delete RPCs and the two surviving stored readings are reached through a variable rather than a literal, so no grep of a call site finds them, and 340 constants across 234 files hide 140 slugs the same way.

# Evidence

Run against `DATABASE_ADHOC_URL` and the code at `8cbbf03d1c`. Every zero has a positive control; one read clean only because a Postgres `\m` boundary means nothing to grep.

SQL. 59 live by `pg_get_functiondef ~ pages` over `prokind=f`, matching 59 of 87 snapshot files. 52 machinery, 5 readers. At `6d4dc66eea^` it was 65: that commit deleted `_wake_day_window` and the activity, capacity, safety, surplus and status-bar readings, each naming pages at its parent; 59+6=65. The 65 is another delegate's commit, not drift. Readers left: get_plants_reading, get_sleep_reading, trigger_pipeline, error_capture, mark_pipeline_rebased. `_compose_completion_progress` and `pages_by_relation` are machinery, reached only from the page-write procs. Neither it nor pages_search has a caller but its unit test. Two instructions queries still call the dropped `_wake_day_window`.

TypeScript. 20 RPC names appear as literals. Nine never do: `rpcName`/`deleteRpcName` at `access/src/delete.ts:30`, `page-type.ts:106` and `property-definition.ts:79` return the soft, undelete and hard names by branch. `sb.rpc(routine, ...)` at `status-bar-access/src/upkeep-stoplights.ts:77` and `apns-push-notifier/src/surplus-fall-notifier.worker.ts:41` reach the two surviving readings. `access/src/pg`: 56 modules, 41 name pages, 27 CI loaders.

Electric. Four apps declare `PAGE_TYPE_SLUG`, `PROPERTY_DEFINITION_SLUG` and `AUTOMATION_SLUG` via `PageTypeSlug("...")` — a `= "page-type"` grep misses all three. `use-core-definitions-ready.ts:25` catches and sets ready true, so a failed acquire renders rather than blocking. `backingOf` falls back to reading `files:` off page-type rows. `app-capacitor` carries none of the three api routes; the other four carry all.

Generated. `database.ts`: 152 Functions entries, 95 pages-system.

Tests. `browser-test-harness/src/harness.ts` writes real rows for 3 of 12 `.browser.test` files. Both realtime smoke tests update the lowest-seq live `property-definition` row.
