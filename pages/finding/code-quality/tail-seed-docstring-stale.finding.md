---
id: c609b8e9-326e-5f6a-904c-4d859ddb11b1
page-type-slug: finding
title: "Tail seed docstring stale"
domain-slug: domain/code-quality
---

# Claim

The `InitialCursorSeq` docstring in `packages/shared/worker-runtime/src/events-types.ts` still documents the `"tail"` seed as a per-category maximum, `COALESCE(MAX(events.seq) WHERE event_category = ANY($subscription_categories), 0)`. The implementation dropped that filter and seeds to the global newest event. The stale description sits on the type an author reads to choose a seed; the correct one is a comment in the file that resolves it.

# Evidence

`events-types.ts` documents the three seeds above `export type InitialCursorSeq`. Its `"tail"` line reads: seed `cursor_seq = COALESCE(MAX(events.seq) WHERE event_category = ANY($subscription_categories), 0)` so the subscriber starts at the live edge and ignores backlog.

`register-events-subscriber-cursor-seed.ts` says the opposite about the same seed, twice. Its header comment: "the `\"tail\"` read drops its old per-category filter and bounds `inserted_at` to a recent window, pruning ~190 chunks to ~3 (~0.5 ms)". Its branch comment: "seed to the GLOBAL newest event so the subscriber skips all history and starts from now ... Dropping the per-category filter is what lets this chunk-prune (#14434)." The code calls `readGlobalTailSeed(pool, TAIL_SEED_WINDOW)` and falls back to `readGlobalTailSeed(pool, null)`.

The behaviour is correct and the reasoning for it is sound: `seq` is globally monotonic across categories, so the global-newest seq is an upper bound on the subscription's own newest, and the events between the two are by definition not of the category. Nothing is skipped and nothing extra replays. This record is about the description, not the change.

What it costs is that the two statements are in one package and a reader meeting both has nothing to tell them which drifted. The stale one is also the more reachable: it sits directly above the exported type, which is what an author opens to decide between `"head"`, `"tail"` and a number, while the accurate one is inside the resolver they have no reason to open. A reader who trusts it will believe a `"tail"` subscriber's start point depends on which categories it subscribes to, and reason about backlog from there.

Read at `~/code` on 2026-08-07 while ingesting `dirty/knowledge/events-cursor-subscriber.md`, which had copied the stale version into prose. That document was removed in the same run.
