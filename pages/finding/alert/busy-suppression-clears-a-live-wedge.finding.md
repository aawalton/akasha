---
id: 7205ada7-d75f-5f61-aa6f-2c0f70279f54
slug: busy-suppression-clears-a-live-wedge
page-type-slug: finding
title: "Busy suppression clears a live wedge"
domain-slug: page-type/alert
---

# Claim

A subscriber past its grace is not reported wedged while it shows log or iteration activity inside that grace, so a wedge that SPINS rather than stalls suppresses its own verdict and the condition reports `clear`. Restarting the wedged worker is enough to trip this: the respawn's boot lines are fresh activity on either arm, so the alert clears while nothing has recovered, and the quiet holds until that grace expires.

# Evidence

Measured 2026-08-16 between 01:39Z and 02:40Z, against the live database and cluster.

`subscriber-lag` fired at 01:39:02Z naming `main-pipeline-creator`, `status=active`, `pendingCount` 1, `pendingAgeSeconds` 1300 against `graceSeconds` 1260. At 02:03Z I killed the wedged process; the supervisor respawned it and it logged two `drift_detected` lines. At 02:15:57Z the condition reported `cleared`.

Nothing had recovered. At 02:37Z the row still read `status=active` with `cursorSeq` 24955468, frozen since 00:03:06Z, and no main pipeline stood for the uncovered sha.

It came back on its own, which bounds the harm. `subscriber-lag` fired again at 02:34:25Z on the same frozen cursor, `pendingAgeSeconds` 4623 — about nineteen minutes of false quiet, matching the grace running out from the 02:05Z boot lines. So a restart buys one grace window of silence and a false statement of recovery, not lasting quiet.

The path is `decideSubscriberLag` in `packages/agents/devops-monitor/src/wedges/subscriber-lag.ts`. A row past grace reaches a guard that skips it, rather than returning `wedged`, when `status !== "error"` and `isBusySubscriber` holds. That helper returns true when log activity OR iteration activity falls within grace. The respawn's boot lines at about 02:05Z sit roughly ten minutes before the 02:15:57Z snapshot, inside this subscriber's 1260-second grace, so the guard skipped it and the function fell through to its trailing `clear`.

The payload carries the fingerprint. The fired evidence is per-subscriber and reads `graceSeconds` 1260; the cleared evidence is an aggregate reading `graceSeconds` 300, which is `DEFAULT_GRACE_SECONDS` and is written only on that trailing branch.

The guard closes a real false positive: a subscriber working through a long batch should not be called wedged. What it cannot do is part a spinning wedge from work, both presenting as activity.

Not established: which arm carried this, and whether any subscriber cleared this way before tonight.
