---
id: a37b8d6c-bee7-5916-b3d5-9a6db367168b
page-type-slug: finding
title: "Handed back seat waits alive"
domain-slug: barred-meaning/project
---

# Claim

A seat that hands work back can stay alive waiting for the verdict, so the task that says it
has retired leaves a live seat idle and counted as wedged.

# Evidence

Measured 2026-08-05 05:50 UTC, on a seat dispatched 2026-08-04 20:47.

`tasks/lead/verify-handback.md` says of a returned row: "the seat that did the work has
retired, so there is nothing to wake", and of the verdict: "A verdict travelling only by
message dies with its recipient". Both sentences point the verdict at the row document and
away from the seat.

Seat `claude-code-harness-developer-17847` (019fce87-f125-78f3-8e7f-497f080fa2ff) handed
back row #17847 at 21:08. The verdict was written into #17847's document and the row moved
to `done` at about 21:15. No message was sent to the seat.

At 05:47 the next morning — eight and a half hours later — `ops seat list` reported it
`running / live / wedged`, and `ops seat alive` reported "row supervisorPid alive and
present in the env-keyed /proc set". `ops seat active` counted 4 wedged against 21 running
over a 900s window. The seat had not exited.

One message was sent at 05:52 carrying the verdict. The roster then reported the same seat
`advancing`. So the state was not a wedge: it was a seat idle at the end of its turn with
nothing arriving, and the io-wedge taxonomy — which keys on transcript-write recency —
cannot separate that from a seat that has stopped writing because it is stuck.

Three sibling seats dispatched the same evening (17814, 17815, 17816) had exited by the
morning and were absent from the roster, so the outcome is not uniform across a batch.

NOT MEASURED. What decides whether a handing-back seat exits or waits. Whether the other 3
wedged seats in that count are in the same state. How long such a seat waits before exiting
on its own, if it does. Whether any instrument distinguishes an idle-waiting seat from a
stuck one today.
