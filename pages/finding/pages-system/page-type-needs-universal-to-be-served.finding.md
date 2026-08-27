---
id: 5c60d76b-79f5-50dc-9a8f-2bb17fa26164
slug: page-type-needs-universal-to-be-served
page-type-slug: finding
title: "A page type created without the universal flag is invisible to the deployed web app"
domain-slug: domain/pages-system
---

# Claim

A page type created without `--universal` is invisible to the deployed web app, which answers 404 for its listing URL.

# Evidence

Measured 2026-08-18 against the deployed pod at `https://alanwalton.com`, signed in.

`ops page-type create` creates a type owned by the caller unless `--universal` is passed. `page-listing.tsx` resolves the URL through `getPageTypeByPluralSlug` on the user's client, so RLS decides, and a caller-owned type is not returned — the loader throws 404.

Of 200 page types read from the store, 178 are owned by the universal sentinel `ffffffff-ffff-ffff-ffff-ffffffffffff` and 22 by a user. `/projects` (universal) serves; `/readouts` and `/monarch-rules` (user-owned) both answer 404. A throwaway type created with `--universal` served immediately, seconds after creation and with no deploy or pod restart; the same type without the flag did not.

Ownership cannot be corrected in place: `ops page-type update` refuses with `userId cannot be reassigned on an existing page`, so the type has to be hard-deleted and recreated, taking its property definitions with it.

`readout-scale` was created without the flag here and then rebuilt with it. `readout`, created by another seat, still stands user-owned and still answers 404.
