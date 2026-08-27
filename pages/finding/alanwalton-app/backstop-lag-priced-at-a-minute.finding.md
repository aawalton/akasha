---
id: 114a1b6a-6352-58ee-8848-ac76dea36626
slug: backstop-lag-priced-at-a-minute
page-type-slug: finding
title: "Backstop lag priced at a minute"
domain-slug: domain/alanwalton-app
---

# Claim

The persona-reward-watcher package states a 60-second heartbeat in two docblocks where its wired constant is an hour. One is the coverage-backstop sentence in a sibling module holding no cadence constant, so the worst-case reconcile lag for an un-evented point source is priced sixty times too fast. The other is the stated ground for a fire-once dedup, so a live mechanism's warrant rests on a cadence its own file contradicts twenty-seven lines earlier.

# Evidence

At `~/code` on `main`, `packages/alanwalton/persona-reward-watcher/src/persona-reward-watcher.worker.ts:88` is `const PERIODIC_HEARTBEAT_INTERVAL_MS = 3_600_000` — one hour. Line 323 passes it as `heartbeat: { intervalMs: PERIODIC_HEARTBEAT_INTERVAL_MS, fn: reconcileAllPersonas }` to `runLongRunningWorker`, so the constant is the wired value and both passages below are prose alone.

`subscriber.ts:32-35` reads: "Coverage note: the reward reads each persona's own `relationship-progress` points, so subscribing to that page-type's `updated` event accelerates every persona-day point write directly onto her row. Any point source that does not patch the relationship-progress row rides the 60 s heartbeat backstop instead." That file declares no interval and imports none, so a reader deciding whether an un-evented point source can be left un-evented has nothing local to check the minute against.

`persona-reward-watcher.worker.ts:364` reads: "FIRE-ONCE DEDUP: a 60s heartbeat would otherwise re-notify every tick." That is the stated warrant for the unread-notification marker under it, twenty-seven lines after `3_600_000` in the same file.

`pages/finding/alanwalton-app/entrypoint-comment-reports-the-criterion-cadence.finding.md` records the same 60 s-against-3_600_000 defect at `aria-story-points.worker.ts`, and `pages/finding/code-repo/heartbeat-criterion-pinned-where-fleet-departs.finding.md` measures the fleet at seventeen of twenty hourly against a CI test pinning 60 s. Added here is a second site and two shapes neither names: the wrong number standing in a module holding no constant to contradict it, and the wrong number serving as the WARRANT for a live mechanism rather than as a staleness budget.

Found ingesting `dirty/code/packages-alanwalton-persona-reward-watcher-claude.md`, whose "hourly heartbeat" matches the constant against the comments. Probe run bare and unpiped: `rg -n "PERIODIC_HEARTBEAT_INTERVAL_MS|60 s|60s" packages/alanwalton/persona-reward-watcher/src/`.
