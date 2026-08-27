---
id: 3acac390-e9f3-5abd-8409-82925b136854
slug: status-bar-snapshot-status-lists-unguarded
page-type-slug: finding
title: "Status bar snapshot status lists unguarded"
domain-slug: domain/database
---

# Claim

Two status lists inside `get_status_bar_snapshot` must be kept in step with two status vocabularies authored elsewhere, nothing checks either, and an omission shows up as silently wrong counts on the status bar rather than as a failure.

# Evidence

Read 2026-08-07 at `~/code` HEAD `383bf60d35`, in `packages/shared/supabase/database/schema/public/functions/get_status_bar_snapshot.sql`, while ingesting a quarantined question document that named both contracts and stated their consequence wrongly.

The first is at line 37, inside the `ntp` CTE defining the non-terminal pipeline set: `AND status IN ('pending', 'dispatching', 'running')`. A new non-terminal pipeline status not added here keeps those pipelines out of `ntp`. Because `step_join` at line 39 draws FROM `ntp`, their steps go too, so `pipelineCounts` and `stepCounts` both under-report.

The second is at line 194, in the project-counts filter: `AND (p.status IS NULL OR p.status NOT IN ('done', 'not_doing', 'duplicate'))`. A new terminal project status not added here counts finished projects as live.

Neither list names where its vocabulary is authored. The same file's `held_seqs` CTE at line 55 does: its comment ties `status IN ('active', 'paused', 'running')` to `LIVE_STATUSES` in `@agents/shared/db-agent-list`. That is the shape the other two lack.

What makes it quiet is that both failures are wrong numbers rather than errors. Nothing throws, the query returns, and a count that is too low reads exactly like a correct one. The quarantined document recording these contracts said they "drift into a slower query rather than into wrong counts", which is wrong in both directions.

The header says "GENERATED — regenerate via `bun run gen-schema`. Do not hand-edit.", and a repo search for `ntp AS MATERIALIZED` returns this file alone, so this is the only place the SQL body exists.

I did not establish whether a check covers this: the search of `packages/infra/checks/src/checks/` was by name rather than by reading each check.
