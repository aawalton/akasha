---
id: d7efb25e-e0e3-5536-970f-c46563b3d757
slug: mined-item-catalog-owner-column
page-type-slug: finding
title: "Mined item catalog owner column"
domain-slug: domain/temper
---

# Claim

The `temper-mined-item` page type stores `userId` as a write-only column on rows that are actually a globally-shared reference catalog keyed only by `itemId`, so every current reader bypasses row ownership by using the service client, and the first reader added through the normal owner-gated path would silently see only the fraction of the catalog it inserted itself.

# Evidence

From project #16020 (domain `temper`, status `someday_maybe`, captured 2026-07-25, never given an objective). Its opening corrects an earlier claim that two users mining the same item share a row and user B's `minedAt` overwrites user A's; verified that only half is true and severity is lower than first claimed.

True: `api.watcher.upsert-mined-items.tsx:117-121` sets `uniqueAttributeKey: "itemId"` globally, so two users mining item 12345 land on one row, and `minedAt` is last-writer-wins (rides `attributes`, merged at `pages-bulk-upsert.ts:228`).

False, and load-bearing: `userId` is NOT overwritten. `pages-bulk-upsert.ts:227-244`'s `ON CONFLICT DO UPDATE SET` list omits `user_id`, written only on the INSERT arm (`:199`). Ownership is first-writer-wins and sticky, not a sibling of #15963 (a live row silently repointed), as the original filing assumed.

Checked and ruled out: collision with #15971's `_enforce_owner_stability` guard, since `userId` is a promoted column. It does not collide: `pages_bulk_upsert` cannot change `user_id`, so the guard has nothing to fire on; recommended against extending it here. Guard wiring was read from #15971's branch, not yet on main.

The real, structural issue: `item-tooltip-types.ts:40` calls this page type "static reference data", correctly — a global `itemId` key is right by design. But the catalog carries a per-user owner column that is write-only: all three readers (`api.items.tsx:118`, `api.items.search.tsx:62`, `index.script.ts:223`) are unscoped and use `getSupabaseServiceClient()`, bypassing RLS. Under `pages_owner_select` (`user_id = auth.uid()`), an owner-gated reader would see only rows it inserted first, nearly none for a mature catalog. The first reader added through the normal owner-gated path would silently return a fraction of the catalog and look like a working query. `minedAt` also means "when did anyone last mine this," not "when did I" — fine today, wrong once treated as per-user provenance.
