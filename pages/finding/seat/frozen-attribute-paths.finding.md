---
id: a81398eb-240b-576a-995d-92505c1e95b3
page-type-slug: finding
title: "Frozen attribute paths"
domain-slug: page-type/seat
---

# Claim

A seat record freezes the absolute paths of the documents its attributes name, so moving one of those documents leaves the hold-seat guarantee silently absent until somebody states the seat again.

# Evidence

Measured 2026-08-14, after `page-types/` absorbed the domain documents `persona`, `person`, `role` and `task`.

A seat record under `~/.instruction-seats/` stores, per attribute, the slug and a `documents:` array of absolute repo paths resolved when the seat was stated. Nothing re-resolves them. When one of those documents moves, `hold-seat` reports `not-applicable` with the words "nothing this agent may do while refused would restore them, so THIS GUARANTEE IS ABSENT for it until they are stated again" — so the seat is not refused, it is unguarded, and nothing reaches the agent to say so.

Of the live seats holding a record at the time of measurement, all but one named at least one moved document. Restating with `bun tools/seat.ts` re-resolves and re-arms the guarantee, verified on one seat: the refusal returned immediately and named the two page types it now points at.

`hooks-fire` passes throughout, because the hook does run — it just has nothing to hold.

The seat record already stores the slug beside the paths, so resolving at check time rather than at statement time would make a move transparent.
