---
id: 2424330e-076d-5b36-a977-f35d41ffea09
page-type-slug: finding
title: "Page upsert loses natural key and persona fixture leaks"
domain-slug: domain/pages-system
---

# Claim

`page_upsert` has no natural-key guard: its live-row count is scoped to `deleted_at IS NULL`, so a re-run after a soft delete always inserts a new row rather than reviving the old one, and a caller-supplied `where` that matches nothing inserts with no fallback identity check — unlike `pages_bulk_upsert`, which raises when the caller's key is not flagged `unique: true`.

# Evidence

Project #17436, domain `pages-system`. Found while investigating four duplicate `selah` rows in the `persona` page type.

Five `persona` rows carry slug `selah`: one Alan's (user `9ba554f7-…`, created 2026-06-28), four belonging to the throwaway browser-test account `4ee54543-…` (created 2026-07-06, 07-09, 07-25, 07-28), each later soft-deleted except one left uncaught for days. That account owns no other `persona` row, plus 43 `idle-persona-card` rows and several scratch/test rows over the same window. The last created event carries only `title`/`slug`/`seq`/ids, then an update 60ms later sets a self-cover `cover` — the shape `idle-persona-roster-hydrated.browser.test.ts` seeds and exercises. No other `persona` slug repeats.

**Defect 1 — fixture not cleaned up.** Each run of that browser test that doesn't clean up leaves a row behind; nothing sweeps them. Four accumulated over ~3 weeks.

**Defect 2 — `page_upsert` re-inserts after soft delete, no key guard.** `packages/shared/pages/proc/src/page-upsert.ts` counts live matches for the caller's `where` (scoped `deleted_at IS NULL`) and calls `page_create` on zero — so a re-run after a soft delete always re-inserts, and a `where` matching nothing silently inserts with no fallback check. `pages-bulk-upsert.ts` guards exactly this, raising when the caller's dedup key isn't `unique: true`; `page_upsert` has no equivalent.

**Context.** No uniqueness constraint on `(page_type_slug, slug)` (plain btree). The only relevant unique index, on `(page_type_slug, unique_key)` where live and non-null, never fires for `persona` because `_compose_unique_key.ts` composes `unique_key` to NULL when no property is flagged `unique: true`. Whether to flag `persona`'s `slug` unique is for a definition reading — it needs the live system swept first: `persona-image/athena` and `food/beans-60g-2026-06-25` each currently carry two live rows too.

Verified by query or by reading the named file.
