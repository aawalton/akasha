---
id: 01a01ffb-e92e-7000-adc7-114989cfa127
slug: view-columns-that-can-never-render
page-type-slug: finding
title: "View columns that can never render"
domain-slug: domain/global
---

# Claim

Thirty-six columns across fourteen live view files name a key that no property declares and no page of the type carries, so each renders empty on Alan's screens and always will. None is a spelling error; every one names something genuinely absent, mostly a value that lived on a page-type row retired during the file migration. Writing a property document for any of them would make an audit read green while the column stayed blank.

# Evidence

Measured 2026-08-20 through `answer()` in `instructions:tools/lib/page-query.ts`, with the two-part test the `unfound` field now computes: a key is absent where no property declares it AND no page of the type carries it. Both halves are load-bearing — `slug` on `finding` is declared but carried by 0 of 3,234 pages, so a carry-only test would refuse it.

Population: 72 view files, 53 naming columns, 36 mentions flagged across 14 views. Only `visible-properties` and `always-show-properties` were counted; `hidden-properties-order` names columns that do not render.

By page type. `claude-account` (8 pages): twelve columns in `personas-accounts` — agent-type, status, default-worker-model, default-headless-model, fallback-worker-model, default-auto-compact-window, default-agent-effort-level, seven-day-utilization, session-kind, parent, instance, last-heartbeat-at — and seven-day-utilization plus five-hour-utilization in `claude-accounts-claude-accounts`. `persona` (41): value, session-id, domain, across three views. `session-tracking` (622): value, type. `merge-queue` (1): status, consecutive-greens, branch, completed-at. `temper-task` (24): rrule, in two views. `story-read-royal-road` (103): word-count, length. `project` (2): parent-id, initiative. `ki-book` (1): completed-at.

`persona.value` and `temper-task.rrule` are named Gap B in the migration brief — the value is on the row and on no file. The persona files carry `value-slug`, and the row's `value` was measured stale, so carrying it across would overwrite good data with worse.

Not established: for each column, whether the value is recoverable from a retired row, derivable, or genuinely dead. That is a per-cluster judgement, and several of these types have already had their row retired.
