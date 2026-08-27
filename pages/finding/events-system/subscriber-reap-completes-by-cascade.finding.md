---
id: 01a0200b-f58e-7000-b777-859270b3759d
page-type-slug: finding
title: "Retiring a subscriber clears both tables by cascade; what is missing is anything that runs the reap"
domain-slug: domain/global
---

# Claim

A retired subscriber's `event_subscriptions` row is taken by the foreign key cascade when its `event_subscribers` row is deleted, so one delete finishes the retirement. The two retired names standing in both tables today are waiting on a reaper that cannot run, not on a second delete statement. Adding one would be work against a defect that is not there.

# Evidence

Measured 2026-08-20 against the live database at `postgres.postgres.svc.cluster.local`, server address `10.244.0.27`. Read-only apart from one fixture inside a rolled-back transaction; no real row was inserted, updated or deleted.

The constraint is `event_subscriptions_subscriber_name_fkey FOREIGN KEY (subscriber_name) REFERENCES event_subscribers(subscriber_name) ON DELETE CASCADE`.

Proved on a fixture rather than read off the definition. In one transaction, two synthetic subscribers each took one subscription row. Deleting subscriber A took its subscription from 1 to 0, while untouched sibling B kept its 1, so the delete is what removed it. After `ROLLBACK` the tables stood unchanged at 30 subscribers and 12 subscriptions, with zero fixture residue.

`reapRetiredSubscribers` at `packages/infra/ci/orchestrator/src/dispatcher/reap-retired-subscribers.ts:36-45` issues one delete against `public.event_subscribers` for each name in `RETIRED_SUBSCRIBER_NAMES`. It names no second table and needs none.

Standing now: `automation.orchestrator` holds rows in both tables, status `idle`, cursor 25468845, 23,085,295 rows processed; `story-length` holds a subscriber row only, status `idle`, cursor 25210273, 19,528 rows. Both stand on the retired list, added today at 10:26:36 and 09:52:55 -0600.

Nothing runs the delete. The `workers/worker-supervisor` deployment carrying the dispatcher heartbeat reads 0/0 replicas.

Controls: a subscriber name known present returned 1 and an impossible name returned 0; a planted impossible subscription name registered as an orphan where the real sweep found none.
