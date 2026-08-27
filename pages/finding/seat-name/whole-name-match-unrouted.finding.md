---
id: 40227775-b970-50bf-acb6-84d243f97354
page-type-slug: finding
title: "Whole name match unrouted"
domain-slug: domain/seat-name
---

# Claim

Three findings in `names-that-do-not-resolve.md` (wake-arming, Remote Control default, model resolution) share one mechanism — a consumer matching the whole compound name against a bare persona slug — and though `#17320` recommended a sibling row for it, `#17327` and `#17325` each routed it elsewhere, so no project ever held it, even as the fleet already runs it live: 4 of 4 seated persona seats carry the compound name while the code consumer is unchanged.

# Evidence

Project #17341, domain `seat-name`, status someday_maybe, live-on deploy. Captured, not defined.

From #17314's purge work: `athena-purge`, working the `names-that-do-not-resolve` cluster, found three findings sharing one mechanism. Verified in-seat.

Mechanism: a consumer matches the WHOLE seat name against a bare persona slug. Specs are keyed by the bare slug; the lookup is exact equality. A seat named `{persona}-{role}` matches no spec, so the consumer takes its absent-branch, a silent, safe-looking default in all three.

Three instances, all in `skills/agent-harness/findings/names-that-do-not-resolve.md`: wake-arming (`assembleArmedSpecs`/`resolveArmedSpec` do `specs.find((spec) => spec.name === name) ?? null` against bare slugs only); Remote Control default (same match on agent name); model resolution (third consumer with this shape, one whose unit test cannot see it).

The enumeration is a lower bound, not a census: three is what has been found, each spotted incidentally; nothing has swept for the shape.

Measured now: `bun ops seat list`, live persona seats `sophia-intake`, `athena-purge`, `athena-intake`, `amy-handler` — 4 of 4 compound-named (`#17320` measured 2). `packages/agents/routing-core/src/wake-armed-seats.ts` unchanged: bare-slug keying and whole-name `find` still there, no `splitSeatName`. A third `carriers-on-different-clocks` instance: instruction in `~/instructions` (commit), consumer in code (deploy) — mechanism should have landed first.

Routing: `#17320` declined fixing this, recommended a sibling row. `#17327` lists it among eleven rename-consumer families, routed to `#17325`. `#17325` routes it off-row to `#17320`/`#17327`/`#17324`, but criteria 1-7 plus post-deploy 8 name none of wake-arming, RC-at-startup, `~/agents/` continuity, or model tier; cleared, `awaiting_manager_deployment`. `#17324` doesn't mention it. That row was never opened, `athena-intake`'s omission.

Moved off the row's retired `notes` attribute on 2026-08-15.
