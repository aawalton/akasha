---
id: beef5c38-b740-51e7-a95e-cae0bdb51b54
slug: wait-markers-cleared-on-launch
page-type-slug: finding
title: "Wait markers cleared on launch"
domain-slug: domain/global
---

# Claim

A step's capacity-wait markers are cleared the moment it launches, so a step that waited ten minutes for node room reads afterwards as one that never waited. The evidence survives only in the events log, and the row a diagnosis naturally reaches for is the one that has forgotten.

# Evidence

Measured 2026-08-03 while diagnosing branch CI wall clock.

`check-typesafety-bundle-shared` in pipeline 26963 read, on its step row:

    dispatchWaitReason  NULL
    dispatchWaitNode    NULL
    dispatchWaitSince   NULL
    neverFitSince       NULL
    launchAttempts      NULL

All null is a strong signal, and it is documented as one: the markers are written only on a `defer` verdict and `neverFitSince` only on `fail`, so all-null appears to rule out both the defer path and the never-fit path and to say the step was never evaluated by the decider.

`ops pipeline timeline --seq 26963` for the same step:

    18:01:38  pending     -> dispatching
    18:01:42  dispatchWaitNode, dispatchWaitReason, dispatchWaitSince   [written]
    18:11:30  dispatching -> launching
    18:11:34  launching   -> running
    18:16:07  running     -> completed

It deferred against a full bound node for 590 seconds. The markers were set, and cleared on the `dispatching -> launching` CAS — which is by design, since they are set-once and would otherwise re-patch every tick and re-wake the dispatcher through its own NOTIFY.

The consequence is that the markers are readable only while the step is still waiting. Any post-hoc read — which is what a diagnosis of a finished slow pipeline is — sees them cleared on exactly the steps that waited longest and succeeded, and intact only on steps still stuck. A survey of finished pipelines therefore reports the wait as absent wherever it resolved.

Across the 9 branch pipelines sampled, `ops pipeline timeline` showed 89-111 marker-write events per run against ~130 steps, none of it visible on the rows afterwards.

NOT measured: whether any consumer other than a human reads these fields post-hoc, and whether the dispatcher's own logs retain the defer decisions beyond the pod log window (the supervisor log I sampled held ~25 minutes).
