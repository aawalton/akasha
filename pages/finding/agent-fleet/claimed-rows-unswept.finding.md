---
id: 121c6e43-f47e-52af-ba6d-9de373747c90
page-type-slug: finding
title: "Claimed rows unswept"
domain-slug: domain/agent-fleet
---

# Claim

A `public.messages` row left at `claimed` by a seat that never resumes is reached by
nothing and reported by nothing. The only sweep that returns `claimed` rows to `pending`
runs inside the claiming seat's own supervisor restart loop; the `pending`-only bounce
backstop has no call site in the fleet at all; and `ops seat queue-reachability` scores
live-`pending` rows, so a stranded `claimed` row falls outside its denominator rather
than into a disposition.

# Evidence

Read on 2026-08-07 against `~/code` at `383bf60d35`.

**The sweep is per-seat, at that seat's own resume.** `reconcileClaimedRedelivery` has
one call site outside its own module and tests:
`packages/agents/supervisor/src/supervisor-interactive.ts:246`, inside the restart loop,
gated on `resume.resume && !adoptedThisIter` and passed `{ agentId, processStartedAtMs }`.
Its reader is `readClaimedBefore(id, …)`, keyed on that same agent. The comment beside it
states the scope: "on a resume respawn that process is dead, so nothing ever will."

**The bounce backstop runs never.** `packages/agents/shared/db-messages-bounce.ts` opens
with "NOTHING IN THE FLEET CALLS IT TODAY. Its one production call site was the verb that
ended a seat for good, and that verb is gone." It guards on `PENDING_MESSAGE_STATUS`, so
even called it would step over a `claimed` row.

**No instrument counts the population.** `ops seat queue-reachability` measures
"live-pending" rows and sorts them into `undeliverable` / `stalled` / `in-flight`; a
`claimed` row is not pending, so it is outside the denominator. Every non-dist, non-test
reader of `CLAIMED_MESSAGE_STATUS` is one of six modules and none is a fleet-wide scan:
the two claim writers, the witness and release guards, the per-seat sweep above, the
vocabulary module, and `queue-reachability-baseline.ts:355` — a delta classifier over
rows already declared, not a search for stranded ones.

`message-status.ts` says of `claimed`: "a claimed row is precisely the population a
redelivery mechanism must be able to see." One mechanism sees it, for one seat, when that
seat comes back.
