---
id: d909838a-3ebf-5f99-8b1b-ada5cbbd29a7
page-type-slug: finding
title: "Reaper list misses unit workers"
domain-slug: domain/global
---

# Claim

The reaper that deletes a retired subscriber's row takes its names from a hand-maintained list, and the convention for adding one fires on a package leaving `SUPERVISOR_WORKER_WATCH_NODES`. A subscriber owned by a systemd unit never stands in that set, so retiring it passes no trigger, its name is never added, and its row is left behind — lagging without bound with no worker to drive it, against a mechanism built for exactly that orphan.

# Evidence

Measured 2026-08-15 between 19:48Z and 20:40Z, against the live database and `~/code` at `af292e8eb5` on main.

The mechanism exists. `reapRetiredSubscribers` at `packages/infra/ci/orchestrator/src/dispatcher/reap-retired-subscribers.ts` deletes any `event_subscribers` row whose name stands in `RETIRED_SUBSCRIBER_NAMES`, on every 60s dispatcher heartbeat. Its header names this exact class: deleting a worker package removes the code that registers the row but never the row, which then sits pinned with its cursor frozen, accumulating unbounded phantom subscriber-lag. It deletes only names listed explicitly, deliberately, so that no missed dynamic-name pattern can reap a live subscriber.

The list holds seven names and `pages-fs-projector` is not among them. Its stated convention for adding one is the same change that removes the package's entry from `SUPERVISOR_WORKER_WATCH_NODES`.

That trigger could never fire here. `git log -S pages-fs-projector` over `preparation-steps.ts` returns nothing, so the name was never in that set: it ran as a systemd user unit, `pages-fs-projector.service`, rather than as a supervisor-watched node. `check-supervisor-watch-set.ts` enforces the watch set, and a unit-owned subscriber is outside what it can see.

What it cost. The row froze at 18:50:27Z when #19225 took the unit down, `subscriber-lag` fired at 18:56:18Z, and at 19:52Z the row still read `idle` with `seqLag` 11298 and `pendingCount` 1000 capped.

How it ended. Between 19:52Z and 20:24Z the row was deleted by hand; `subscriber-lag` cleared at 20:24:00Z, and `list-lag --all` now returns 37 subscribers with no such name. No automated path could have done it — the five in-repo delete sites are a per-pipeline regex, a four-name dispatcher list, a merge-queue scope, a self-only delete, and this seven-name list. So the mechanism built for this never ran, and the name is still absent from it.

Not established: who deleted the row.
