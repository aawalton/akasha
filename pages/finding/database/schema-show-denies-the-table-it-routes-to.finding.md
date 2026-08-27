---
id: da6a921a-370e-5f66-aca6-bf4762d27d6e
page-type-slug: finding
title: "Schema show denies the table it routes to"
domain-slug: domain/database
---

# Claim

`ops schema show` routes readers to a table it then refuses to describe: the note it prints for `db_query_stats` says to join `public.db_query_fingerprints` for the SQL text, and `ops schema show db_query_fingerprints` answers "unknown table" and omits that table from the supported list it offers instead.

# Evidence

Measured 2026-08-07 by running both halves, while emptying `dirty/skills/agent-harness/findings/instruction-text-and-citations.md`, which recorded the same disagreement on 2026-07-28.

`ops schema show db_query_stats` ends with, verbatim: "Bucketed pg_stat_statements snapshots. Aggregate by `SUM(total_exec_time_ms)` over `bucket_start`/`bucket_end` windows; join `public.db_query_fingerprints` on `queryid` for the SQL text (no `query` column on `db_query_stats` itself)."

`ops schema show db_query_fingerprints` answers: "unknown table: db_query_fingerprints. Supported SQL tables: pages, events, metrics, event_subscribers, db_query_stats." The table the previous command just named is absent from that list.

So one invocation of the verb sends a reader to a table, and the next invocation of the same verb denies it exists. The note is not wrong — the join is the only way to reach query text, since `db_query_stats` carries no `query` column — which is what makes the refusal expensive rather than merely untidy: the reader has been told they need this table and then told the tool cannot describe it.

The consequence is falling back to raw `psql \d` for the column list, which is what the verb exists to prevent. The 2026-07-28 entry recorded establishing the column list for an outbound read that way.

What has changed since that entry, and does not save it: it also claimed the root `CLAUDE.md` names `schema show` as the way to avoid guessing column names on universal tables. That file no longer exists — it stands quarantined in the instructions repo as `dirty/code/claude.md` — so no surface now routes agents to the verb unconditionally. The verb's own two outputs still disagree, which is measured above and does not depend on any document.

Not established: whether `db_query_fingerprints` should join the supported list or the note should stop naming it. Either closes the disagreement, and which is right depends on whether the table is meant to be agent-facing at all.
