---
id: 01a01fd8-2de2-7000-9aea-e2b95e13bb75
slug: zero-subscription-subscriber-reads-caught-up
page-type-slug: finding
title: "Zero subscription subscriber reads caught up"
domain-slug: domain/global
---

# Claim

A subscriber row holding no subscriptions cannot lag, so the subscriber-lag reader sets its `pendingCount` to 0 rather than null and it renders `caught_up`. Twenty of thirty rows stand in that state, so the monitor's clear evidence counts 28 caught up where 10 can process anything. The one row sitting at `status = 'error'` reads caught up beside the rest.

# Evidence

Measured 2026-08-20, by running `fetchSubscriberLag` against the live database rather than reading it.

`public.event_subscribers` holds 30 rows, `public.event_subscriptions` holds 12, and 20 of the 30 subscriber rows hold no subscription at all.

`tools/lib/devops-monitor/snapshot/db-slices-subscriber-lag.ts:151` sets `pendingCount` to 0 whenever `cursor_seq` is non-null, before any subscription is consulted. A row with no subscriptions never enters the loop at `:135`, so `maxSeq` stays null, `seqLag` at `:167` resolves null, and `pendingState` at `:169` resolves `caught_up`. The honest null and the health claim are computed within twenty lines of each other, and the health claim is the one the wedge reads.

The run returned 30 rows: 2 pending, 28 caught_up. Every one of the 20 dead rows read `caught_up` carrying `seqLag: null`. `tools/lib/devops-monitor/wedges/subscriber-lag.ts:107-110` then renders clear evidence carrying `subscriberCount: 30` and `caughtUpSubscriberCount: 28`.

`alanwalton-daily-tracking-sleep` carries `status = 'error'` and still read `caught_up`. Nothing else surfaces it: `packages/infra/ci/orchestrator/src/dispatcher/surface-error-subscribers.ts:29-32` filters on `PER_PIPELINE_NAME_REGEX`, `^pipeline-worker\.(own-pipeline|branch-events)\.[0-9]+$`, which no subscriber outside the per-pipeline family can match.

The same run produced `seqLag: -183` for `temper-task.reactor`, a cursor standing ahead of the newest event its subscription can match.

`tools/lib/devops-monitor/wedges/seat-derivation-coverage.ts:12` returns `unobservedBecause(...)` for this exact case and is the shape the repair takes.

Not measured: whether any other per-row decision inside a snapshot reader that returned rows carries the same split.
