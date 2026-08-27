---
id: 1a0c9265-9484-55d1-a04c-a1c13254a342
slug: mirror-skips-unrepaired
page-type-slug: finding
title: "Mirror skips unrepaired"
domain-slug: domain/pages-system
---

# Claim

A `page.relation.mirror_pending` event whose payload fails the applier's parse is dropped for good:
the target page's back-relation key never lands and nothing afterwards re-derives it. The skip is
deliberate, a thrown parse error being what would freeze the cursor and stall relation mirroring
fleet-wide. What no part of the system carries is the other end of that trade — the page left with a
stale reciprocal key, no repair path back to it, and a subscriber that goes on reading as healthy.

# Evidence

Read and run on 2026-08-07, in `~/code` on `main`.

The drop. In `packages/shared/pages/relation-mirror-applier/src/manifest.ts` the handler calls
`safeParse` on the payload and, on failure, returns `{ skipped: … }` rather than throwing. Its
comment gives the reason: a thrown `ZodError` is classified non-transient, freezing the cursor at
`status=error`, "which DoS-es ALL downstream relation mirroring fleet-wide on a single poison row."

The cursor moves past it. `packages/shared/worker-runtime/src/events-subscriber.ts` logs
`processed=` and `skipped=` per tick and one `console.warn` per skipped row, then continues. Its own
comment at the log site: a dropped row and an applied row both advance the cursor.

Nothing re-derives the missed key.
`packages/shared/pages/relation-mirror-applier/src/page-relation-mirror-applier.worker.ts` composes
the worker from a boot reconcile that is a no-op and an hourly heartbeat whose body is a bare
`SELECT 1` — "it re-derives nothing, so it backstops nothing", in the file's own words. The only
path that ever writes the back-key is
`packages/shared/pages/access/src/pg/apply-relation-mirror-event.ts`, once per event.

Nothing consumes the skip. Searched `packages/`, `services/` and `infra/` for `skips.length`,
`skipped=` and `skipped row`: every hit outside the worker-runtime log site belongs to an unrelated
backfill or sync script.

The subscriber still reads as healthy. Wedge detection derives `pending_age_seconds` from
`public.events`, which a skipped row leaves untouched because the cursor already moved — noted at
the idle-tick branch of `events-subscriber.ts`.

Found while ingesting `dirty/knowledge/back-relation-mirroring.md` in the instructions repo, whose
second Mechanism paragraph states the same thing. That document is quarantined and queued for
removal, so the observation is filed here rather than left to go with the sweep.
