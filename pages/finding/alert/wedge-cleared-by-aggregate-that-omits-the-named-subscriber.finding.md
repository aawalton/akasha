---
id: f546fe1f-4483-501d-a152-448224b4c6be
page-type-slug: finding
title: "Wedge cleared by aggregate that omits the named subscriber"
domain-slug: page-type/alert
---

# Claim

A wedge alert that named one stuck subscriber is cleared by a fleet-wide aggregate that never measures that subscriber, so a cursor which has not moved at all reads as recovered — repeatedly, within the same hour.

# Evidence

Observed 2026-08-14 on `main-pipeline-creator`, every snapshot routed to fallback with a
null owner.

Four wedged snapshots name the subscriber and carry its cursor:

    15:17:50Z  status=error  cursorSeq=24577167  seqLag=72346
    15:23:14Z  status=error  cursorSeq=24577167  seqLag=74969
    15:32:51Z  status=error  cursorSeq=24577167  seqLag=74969
    15:42:25Z  status=error  cursorSeq=24577167  seqLag=76765

`cursorSeq` is identical in all four and `cursorInsertedAt` is pinned at 07:52:09.882Z in
every one. The cursor did not advance one sequence number across twenty-five minutes,
while `timeLagSeconds` climbed 25999 to 27644. Grace was 1260.

The cleared snapshots interleaved with them name no subscriber, carry no cursor, and use
a different grace of 300:

    15:22:10Z  subscriberCount=41  pendingSubscriberCount=2  maxPendingCount=3
    15:28:34Z  subscriberCount=41  pendingSubscriberCount=1  maxPendingCount=3
    15:40:18Z  subscriberCount=39  pendingSubscriberCount=2  maxPendingCount=4
    15:49:05Z  subscriberCount=43  pendingSubscriberCount=3  maxPendingCount=4

The wedge asks whether one named subscriber advances. The clear answers whether few
subscribers fleet-wide are pending. The second cannot refute the first. A subscriber at
`status = error` has no pending backlog to count, so it leaves `pendingSubscriberCount`
and `maxPendingCount` by virtue of being broken — being errored is part of what clears
the alert that named it.

The same shape ran that morning on `pages-fs-projector`, wedged 04:44:34Z naming it and
cleared 04:45:41Z on an aggregate.

This is alerting rather than an outage. `worker-subscriber list-error` and `list-lag` both
came back empty afterwards, so the subscriber recovered on its own. What stands is that
four recoveries were reported that had not happened.
