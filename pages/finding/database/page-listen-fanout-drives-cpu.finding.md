---
id: 808ce157-d218-59e8-a2c3-47bbe2dc64e2
page-type-slug: finding
title: "Page listen fanout drives CPU"
domain-slug: domain/database
---

# Claim

Per-process CPU across the worker-supervisor pod is bimodal and tracks event subscription category rather than handler work: every worker subscribed to eventCategory 'page' burns a flat 7.6-9.1% of a core regardless of what its handler does, because the fleet's LISTEN channel is derived per event category rather than per page type, so every page event wakes every page-category subscriber.

# Evidence

Project #16245, domain `database`, tags `workers performance events listen author:worker-16240`, owner `aranya`, status `someday_maybe`.

Surfaced during #16240 (timer cadence), which is explicit this is not what it fixes; this row is the actual driver of the pod's ~2.2 cores.

FINDING: per-process CPU is bimodal, tracking event subscription category not handler work. eventCategory 'page' subscribers -> flat 7.6-9.1% of a core each regardless of work (page-relation-mirror-applier 7.6%, heartbeat a bare SELECT 1; requester-ship-notifier 7.71%; aria-story-points 9.03%, ceri 9.06%, zadi 9.08%, iris-tower 9.17%, nimue 8.89%, elaine 8.85%). Narrow custom category (fun-points): 1.07%. No subscribers: 0.32-1.78%. erin-chess-points 20.56% (3 subscribers); alanwalton-daily-tracking 27.8% (4 subscribers).

MECHANISM: LISTEN channel is per event category not per page type — 'events_new_<event_category>' (events-subscriber.ts:4). Every page event NOTIFYs every page-category subscriber; each runs a cursor read and logs 'ticked name=' (:186-192) even on no match. DEFAULT_MAX_IDLE_MS=30_000 (:44) makes each subscriber probe every 30s regardless of traffic, invisible in worker.loop_duration_ms.

CONTROL: page-relation-mirror-applier (SELECT 1 only) sits at ~8% same as real-reconcile workers; fun-points is 8x cheaper, differing only by narrow-category subscription.

CANDIDATES, not decided: per-page-type/subscription-hash NOTIFY channels (biggest win); coalesce subscribers sharing byte-identical filters (apns-push-notifier's two manifests); raise maxIdleMs where unneeded (RunEventsSubscriberOptions.maxIdleMs, unset everywhere today).

REPLICATED 2026-07-25T20:57Z (aranya), independently: 37 processes, 20s /proc deltas on node-05: 0-1% 13 workers (free), 2-9% EMPTY VALLEY, 9-16% 20 workers (mean ~13%), 36-50% 4 workers. Bimodal, nothing in the valley; 20 unrelated jobs at identical cost means cost is not the job. Matches this row's split.
