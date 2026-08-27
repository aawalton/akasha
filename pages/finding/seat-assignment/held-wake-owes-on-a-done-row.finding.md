---
id: dbacac4d-d4a1-5554-8768-de111ae81bfc
slug: held-wake-owes-on-a-done-row
page-type-slug: finding
title: "Held wake owes on a done row"
domain-slug: domain/seat-assignment
---

# Claim

`ops seat held-wake` reports `own-act-next` for a seat whose project row is `done`, so the fleet's obligation reader says an act is owed by a seat whose work finished hours earlier. Any detector built on that verdict reads a handed-back seat as one still working.

# Evidence

Seat `019fe63e-2279-733b-b909-6d390f2a0706`, `claude-alan-harness-developer-build-child-deploy-18148`, spawned by `amy`. Read on 2026-08-09 at 19:42Z:

    ops seat held-wake --agent-id 019fe63e-…  ->  own-act-next  status  claimed: done

Project #18148 is `done` with `completedAt` 15:31:59Z, and the seat's last transcript entry is 12:12:06Z — a hand-back summary, seven and a half hours before the reading. The row still reads `running` and `/proc`-live.

So three readings disagree about one seat. The row status says the work is over. The agent row says the seat is running. `held-wake` says the seat's own act is next, and names the `done` status as the basis for saying so.

`tools/lib/seat-sweep.ts:36` already treats `done` as naming no further act, so the two instruments in the fleet answer this question opposite ways off the same field.

The verdict vocabulary appears to have no case for `nothing is owed by anybody`, which is the true state of a finished project: `own-act-next`, `held-wake`, `custodian-dead` and `no-binding` are the four, and `no-binding` is reserved for a seat claiming no row at all. So a terminal row falls through to the seat's own act by construction rather than by a misread of this row.

This matters beyond the one seat because the obligation verdict was the proposed input to a running-seat detector on 2026-08-09. Built on it as it stands, the detector would have reported this seat as healthy.
