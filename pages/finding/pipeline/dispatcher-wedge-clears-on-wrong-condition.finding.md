---
id: 36d11e98-08d1-5264-ad19-dc6f6e2520a7
slug: dispatcher-wedge-clears-on-wrong-condition
page-type-slug: finding
title: "Dispatcher wedge clears on wrong condition"
domain-slug: page-type/pipeline
---

# Claim

The pipeline's dispatcher-liveness wedge cleared itself on the wrong condition: it moved wedged->recovering->cleared as the dispatcher's own tick resumed while staleCount stayed at 2 throughout and the oldest stale step grew from 754s to 1021s — the alert's "cleared" state disagreed with the staleCount evidence printed beside it in the same payload, certifying health that did not exist.

# Evidence

Project #16151, domain pipeline, no objective; capture off retired `notes` attribute 2026-08-15. Measured live 2026-07-25 12:29-12:46Z, right after astra's 12:34Z CNPG switchover.

RETRACTED defect (12:55Z, on the record as false): originally filed "orphaned dispatch, never reconciled" for steps 1157663/1157664 (`kubectl get pods -n ci | grep pe-25803` returned zero pods at 12:46Z). Both steps in fact completed normally with pods, exit 0 (1157663 updated 12:48:09, 1157664 updated 12:46:46) — they were queued ~17-19min, not orphaned. Cause of the error: a point-in-time pod absence read as a permanent state; the pods had not been created yet.

STANDING defect — dispatcher-liveness wedge clears on the wrong condition:
  12:39:48  wedged      dispatcherAlive=false  staleCount=2  oldest 754s
  12:43:04  recovering  dispatcherAlive=true    staleCount=2  oldest 632s
  12:44:07  cleared     dispatcherAlive=true    staleCount=2  oldest 660s
  12:45:58  (by hand)                           staleCount=2  oldest 1021s
It cleared because the dispatcher's tick resumed, not because the stale steps drained — "cleared" shipped with staleCount=2 in its own payload, worse than when it first fired. State and evidence are computed independently and disagree in the same message; the alert going quiet actively certifies health that doesn't exist.

Also: all instances routed to owner_handle=null (fallback) — a CI wedge class with no owner.

Scope: (a) reconcile 'dispatching' steps with no live pod after a grace period; (b) require the wedge's clear condition to demand its own evidence be empty; (c) give CI wedge classes an owner handle.

Cross-reference: this same wedge-clearing-on-wrong-condition defect recurred as a second confirmed instance and was closed into project #16153 at 14:20Z.
