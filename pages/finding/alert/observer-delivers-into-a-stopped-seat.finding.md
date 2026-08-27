---
id: 88b750d6-8056-5a28-bb82-803dcdc10e74
slug: observer-delivers-into-a-stopped-seat
page-type-slug: finding
title: "Observer delivers into a stopped seat"
domain-slug: page-type/alert
---

# Claim

The alert route resolves a holder correctly and then delivers into a seat that is stopped, so the row is written and nobody reads it. Seven alert messages stand from tonight's first-ever firings — six `pending`, one `claimed`, none `read` — at two dead seats. The re-raise at the fifteen-minute mark writes to the same dead seat, so a condition nothing can clear re-raises without bound into a mailbox with no reader.

# Evidence

Measured 2026-08-15 19:45Z against the live database, an hour after the route carried its first events.

Seven messages stand, written by `ops alert observe` between 18:56:42Z and 19:41:52Z, each opening `A watch condition you answer for needs attention`. Six are `pending`, one `claimed`, none `read`. They target two agents that `ops seat list --all` gives as `stopped` and `dead`: `dalla-code-harness-operator-flex-1` holding `subscriber-lag`, and `aine-query-performance-operator` holding `query-plan-drift-regression`.

The resolution itself is right, which is what makes this narrow. Neither address is a hard-wired handle — each condition's own document was read and the seat stating that domain and role was reached, which is what `page-types/alert.md` asks. What was never established is whether anything stood behind the seat.

It is not the observer's own defect. `bun ops seat send --domain code-harness --role operator` run by hand at 19:48Z resolved to that same stopped seat and returned `pending unobserved`. The ordinary requirement address does this too, so what is at fault is a resolution that never asks whether anything is behind what it matched.

The re-raise makes one miss unbounded. `subscriber-lag` fired at 18:56:18Z and nothing cleared it, so the fifteen-minute re-raise wrote again at 19:11:47Z and 19:41:52Z, to the same dead seat each time.

From inside it reads healthy. `ops alert observe --dry-run` gives `read 0 raised 0 unmatched 0 open 2`, and nothing there separates delivered-and-read from delivered-into-a-corpse.

`domains/message.md` already carries the repair as an Intent rather than a Design: "Every message reaches a recipient, whether one has to be resumed or created."

Supersedes `lane-writes-into-a-stopped-seat`, whose `TARGET_AGENT_NAME = "aranya"` literal #19177 deleted.
