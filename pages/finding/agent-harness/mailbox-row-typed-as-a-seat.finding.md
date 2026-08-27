---
id: 195b6e23-4263-504b-aa49-888beace2cbe
page-type-slug: finding
title: "Mailbox row typed as a seat"
domain-slug: domain/agent-harness
---

# Claim

The `alan` row is a mailbox with no process typed as a seat, so every liveness surface reports it `running` and `dead` at once, and no repair to the exit-stamp reading can reach it.

# Evidence

Measured 2026-08-05 by this lead, verifying #17813. `ops seat list` returns 20 rows: 19 `running live` and one `running dead`, which is `alan`. It is the only status-liveness disagreement left on the fleet once #17813's exit-stamp repair is deployed.

`ops seat alive alan` exits 2 with `dead — probe ran, absent from /proc, no live pid, no heartbeat within the proven-dead floor. The seat has no spawn state, which is the only place a clean-exit stamp can be written, so this reading had nowhere to consult`. There is no stale record to supersede; the row never had a process.

The mistyping is structural. The row carries `role: null`, so `subjectCanHaveProcess` returns true and the branch that would answer for a process-less subject cannot fire.

Nothing routes wrongly on it today. `decide-dead-recipient-routing.ts` folds a `not-applicable` liveness to deliver, with the reason stated in the source: an inbox addressed by name is read by whoever drains it, never by a process the probe could find. So mail to `alan` is delivered rather than refused, and this is a contradiction on a reported surface rather than a live misrouting.

What it costs is the surface. Any consumer added later that gates on `alive` rather than on the routing decision inherits the wrong answer, and a reader of `ops seat list` sees one row that has disagreed with itself for as long as the row has existed.
