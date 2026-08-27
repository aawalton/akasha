---
id: b5e0b603-b096-5cd3-b2c5-cb41455fcd68
page-type-slug: finding
title: "Pushes stopped twenty hours before the shutdown that looks like their cause"
domain-slug: domain/global
---

# Claim

Alan's phone has had no push of any kind since 2026-08-19T16:00:02Z. The obvious
explanation is wrong: `worker-supervisor` was scaled to zero at 2026-08-20T12:38Z,
twenty and a half hours later, and the push worker ran through that whole gap sending
nothing. The cause is the page-event cutover, not the shutdown. Restoring the cluster
will not restore the pushes. Nothing anywhere reports the silence.

# Evidence

Measured 2026-08-20 against the live database with psql, and against the cluster with
`kubectl get`. Nothing was started, stopped or written.

`public.apns_push_log` holds 4,609 rows over a horizon of 2026-07-15 to 2026-08-19,
and stops dead: `notification.created` 2,320 (last 2026-08-19T16:00:02Z),
`project.done` 1,860 (last 2026-08-18T23:31:07Z), `question.answered` 353 (last
2026-08-19T03:07:29Z), `question.dismissed` 66 (last 2026-08-19T15:10:07Z),
`game-turn.published` 9, `rung:green` 1. Zero rows on 2026-08-20.

The shutdown is not the cause. `/var/tmp/nimue/cluster-restore-list.md` records Group A
stopped 2026-08-20 ~12:38Z, and `kubectl get deploy -n workers worker-supervisor` reads
0/0 now. The supervisor was demonstrably alive across the gap: subscriber cursors
advanced to 2026-08-20T12:34:23Z (`temper-completion.indexer`), 12:31:59Z
(`persona-reward-watcher`) and 11:53:20Z (`iris-tower-points`).

A frozen `updated_at` on the push subscriber rows is not counter-evidence: the idle
tick is guarded `AND error IS NOT NULL`, so a pass matching no events moves nothing.

Nothing has been missed yet. No question file under `memory:questions/*.md` carries an
`answered-at` later than 2026-08-19T16:00:02Z, across 695 files — 351 answered, 83
dismissed, 1 open. The capability is silent rather than already having dropped a push.
