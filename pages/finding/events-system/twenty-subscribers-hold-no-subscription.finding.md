---
id: 5af096ff-0dcc-526d-a71c-2f55756000ce
slug: twenty-subscribers-hold-no-subscription
page-type-slug: finding
title: "Twenty subscribers hold no subscription row and match nothing"
domain-slug: domain/global
---

# Claim

Two thirds of the subscriber rows can never receive an event, for a reason no dangling
sweep looks for. The dangling sweep asks which subscriptions name a dead page type and
finds four. It cannot see that twenty of the thirty `event_subscribers` rows hold no
subscription row at all, so the delivery loop has nothing to iterate over and fetches
nothing whatever arrives. Among them is the subscriber that sent every one of Alan's
2,320 push notifications.

# Evidence

Measured 2026-08-20 against the live database with psql. No row was inserted, updated
or deleted.

`readEventsBatch` (`worker-runtime/src/events-cursor.ts:77-96`) selects the
subscription dimensions for a subscriber name, then builds one delivery query per row
returned. Zero rows means the loop body never runs, so the batch is empty by
construction rather than by any predicate failing.

Population: all 30 subscriber rows, none unexamined. Twenty hold zero subscription
rows: `temper-completion.indexer` (2,379,950 rows processed in its life),
`persona-reward-watcher` (637,720), `aria-story-points` (60,946), `iris-tower-points`
(54,112), `story-length` (19,528), `zadi-points-chapters` (10,868),
`apns-push-notifier.notification-created` (2,320), `alanwalton-daily-tracking-sleep`
(2,317, status `error`), `alanwalton-daily-tracking-relationship` (2,300) and eleven
more. That 2,320 equals `notification.created`'s count in `apns_push_log` exactly, so
that row is what drove those pushes.

Three controls fired before I trusted the instrument: a synthetic subscription on
category `agent` matched 9,346; one on a nonsense category matched 0; the question
selector matched 65 real historical events, so its zero going forward means the stream
stopped rather than that the selector is blind.

The structural cause is that the two cleanup paths touch opposite tables and neither
reconciles the other's. `reapRetiredSubscribers` deletes only from `event_subscribers`;
`applyEventSubscriptionReconciliation` deletes only from `event_subscriptions`. The
only foreign key runs `event_subscriptions.subscriber_name` -> `event_subscribers`
`ON DELETE CASCADE`, so removing a subscriber silently takes its subscriptions, and
removing a subscription strands its subscriber. Nothing performs a set-difference over
`event_subscribers` at all.
