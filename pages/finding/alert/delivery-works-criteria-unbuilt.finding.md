---
id: 5f77cfcb-f584-5f69-8fcd-4bb17218c7ab
page-type-slug: finding
title: "Delivery works criteria unbuilt"
domain-slug: page-type/alert
---

# Claim

In alert, neither of #18972's two remaining criteria — observer-silence reported by an unblockable route, and a stalled delivery told apart from no events arriving — is built yet, though the underlying delivery path already works: its first live exercise (2026-08-15) resolved and delivered every event, but into two stopped seats, undetected by the observer itself.

# Evidence

Project #18972 (parent #18963), alert, status awaiting_worker_seat. Objectives: (1) observer's silence reported by a route it cannot block; (2) stalled delivery told apart from no events arriving at all.

Redefined 2026-08-15 (lead, athena escalated): criteria written against a recipient model #19177 replaced; #19177 verified, queued. Not started; nothing of old criteria survives in code.

Old model resolved a persona, wrote a mailbox; new records an event, observer resolves+delivers. Criterion 1 (dead-recipient) gone: `resolveDeliveryTarget`/`TARGET_PERSONA = "aranya"` deleted on `project-18963`, absent at `cdf903566d`. Criteria 2-3 kept, moved to it.

First live exercise, evening 2026-08-15: 8 alert condition events (first 18:56:18Z `devops-monitor`, rest `infra-alert-bridge`) matched/delivered by `ops alert observe` — resolve works, 2026-08-12's `target resolve: 'aranya' not found` class does not recur — into two stopped seats (`dalla-code-harness-operator-flex-1`, `aine-query-performance-operator`): 7 msgs 18:56:42Z-19:41:52Z, 6 pending/1 claimed/0 read; `subscriber-lag` re-raised 3x into silence. Filed as `observer-delivers-into-a-stopped-seat`.

`tools/alert-observer-daemon.ts` is the whole delivery path, unwatched from outside — guards internal (systemd restart, push to Alan after 10 failed rounds); dying without failing a round is silent. Events durable, replay from cursor: delay not loss, unbounded. Filed as `nothing-outside-the-observer-watches-it`. `infra-alert-bridge/src/dead-path.ts` judges only Prometheus/rules, not this path (2026-08-12 outage ran full length under healthy `Watchdog`).

Measured: delivery dead 2026-08-12 14:10:41Z-2026-08-13 20:22Z; worker logged `target resolve: 'aranya' not found`/60s, `reconcileBootState` retried uncapped; window destroyed alerts, not delayed — `GitMirrorRefsBehind` fired/resolved wholly inside it.

Owed: `observer-delivers-into-a-stopped-seat`, `mailbox-stalled-without-signal` stay until met; first supersedes `lane-writes-into-a-stopped-seat`, mechanism #19177 deleted.
