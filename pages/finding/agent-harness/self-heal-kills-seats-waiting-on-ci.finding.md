---
id: f4d879c4-0b6b-5d7c-b63f-fb6bb23b8ded
page-type-slug: finding
title: "The supervisor's self-heal restart kills a seat waiting on CI, because waiting reads as idle"
domain-slug: domain/agent-harness
---

# Claim

The supervisor's self-heal restart kills a seat that is waiting on a long external step, because waiting reads to it as idle. A seat mid-deploy waiting on CI is indistinguishable from an idle one, and the restart it fires does not bring the seat back to work — the row reads `stopped`, its name stays held, and nothing resumes it. The work in its context at that moment is lost unless somebody reconstructs it from the transcript.

# Evidence

Proven for one seat. `narrative-engine-manager-build-parent-deploy-19282`, agent `01a00b4f-54f1-7626-9c86-faad8d4f6a07`, exit recorded 2026-08-16T16:46:28Z via `ops seat exits`. Its `stopReason` is `crash-reaped` with `reaperEventFound: false`, and its supervisor log tail names the cause: forty minutes of `Self-heal deferred-restart: deferring restart — session busy (inFlight=1)`, then `agent idle — firing restart_preserve`, then `Self-heal: SIGTERM sent`. Host memory was 43 GB available with `psiFullAvg10: 0`, so this was not pressure.

The deferral loop is the mechanism. Self-heal holds off while it can see in-flight work, so the kill lands exactly when the seat goes quiet — which for a deploy manager is when it starts waiting on a pipeline, not when it has nothing to do.

`restart_preserve` did not restore it to work; the row read `stopped`.

NOT AN INSTANCE OF THIS: `01a0151d-2ef4-71a3-a90e-533d4e08dc44`, a later seat on the same tree on 2026-08-18, was stopped deliberately by amy minutes after spawning it, because it had been recorded under the wrong parent. Its stop and its name being held afterwards are that act, not self-heal. Corrected by the seat that made the stop.

Cost on one tree: project #19282 ran through four managers, three dying mid-tree. The third died between pushing a rebase and writing it into #19282's own row, so `origin/project-19282` stood pushed at `66b358adf5` while the row named the pre-rebase tip `f434e686` and a blocker cleared two days earlier. The commit mapping for three child projects existed nowhere but a dead seat's transcript.

Not verified: whether the first two deaths had the same cause. Only the third carries an exit record naming self-heal.
