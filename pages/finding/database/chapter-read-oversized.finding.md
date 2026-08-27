---
id: 82b5a8e8-5677-577d-92e8-05d9548d680c
page-type-slug: finding
title: "Chapter read oversized"
domain-slug: domain/database
---

# Claim

A single-row read of one story-chapter page on the reader path costs roughly 5,250 buffer pages (~43 MB) to return exactly one row at a healthy floor of 48.8-50.6ms, and the query's predicate shape and the cause of that floor are not yet established.

# Evidence

Routed to astra by aranya (diagnosed, not prescribed) during the 2026-07-25 estate investigation.

Single-row PostgREST read of one story-chapter page costs ~5,250 buffer pages (~43 MB) for exactly 1 row. Attrs: story/chapterNumber/length/progress. qid -4899138059080100686, first seen 2026-07-07 (5,276 lifetime calls — alert's "new" means "absent from committed baseline"). Rows/call exactly 1. blks/row rose 5,017->5,264 over 18 days (~+5%, table growth). Healthy mean 48.8-50.6ms, six consecutive days.

Not a fire: buffer work per row is flat across 18 days — neither a plan regression nor a workload-shape change, a constant standing cost. It stepped 3.8x on 07-24 (49ms->189ms) on identical buffer work; that cause is outside this statement's execution, belongs to aranya's #16058, not here. The floor here: 43 MB of buffers for one row is the shape of a scan where a lookup should be.

Matters twice: user-facing; amplifier of estate-wide contention (aranya: near-constant work-per-row over 18 days makes it her cleanest contention probe, better than aggregate p99 — do not "fix" without a replacement probe).

Not yet established: plan unread (read it first); not confirmed as #15895's mechanism (different page-type/predicates, hypothesis only); not confirmed as TOAST/detoast of chapter prose (43MB exceeds one chapter's text, but attributes exclude prose, worth checking); predicate shape (id/slug/(story,chapterNumber)) unknown, decides the fix.

First step: EXPLAIN (ANALYZE, BUFFERS) the deployed statement in bind-parameter form; GENERIC_PLAN to confirm plan; check attribute-predicate-index-coverage.md and content-storage-tier.md.

Retraction, 2026-07-25T12:10:50.458Z: the "anti-correlated" claim to astra/#16058 cherry-picked two of nine points; over ten windows: n=10, r=-0.119, rho=-0.079 (note cut; a further retraction and a released constraint on astra's project follow, uncaptured). Project #16100, status someday_maybe, live-on: deploy, domain database.
