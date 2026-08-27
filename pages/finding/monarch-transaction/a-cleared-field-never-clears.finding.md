---
id: a83867c5-13d0-59db-9ba0-b4371698029a
slug: a-cleared-field-never-clears
page-type-slug: finding
title: "A cleared field never clears"
domain-slug: page-type/monarch-transaction
---

# Claim

A category, merchant, note or tag cleared in Monarch never clears on the page, because the sync omits the key when Monarch reports it empty and the page write merges rather than replaces.

# Evidence

`transactionProps` in `~/instructions/monarch/pages.ts` builds its `set` conditionally: `if (categoryId !== undefined) props.category = categoryId`, and the same shape for `merchant`, `notes` and `tags`. When Monarch reports any of the four empty, the key is absent from the write rather than present and null.

The page write merges. Measured on `monarch-transaction`: a page was written carrying `categoryProvenance`, then upserted again with a `set` naming `userId`, `title`, `monarchId`, `date`, `amount` and `account` but NOT `categoryProvenance`; the title changed and the provenance stood. The probe's page was hard-deleted afterwards and nothing was left.

So an omitted key keeps whatever it last held. The four fields can be set and can be changed, but none of them can be CLEARED — a category removed in Monarch stands on the page indefinitely, and no run reports it, because the sync did exactly what it was told.

The seat on #18106 found this and left it deliberately: clearing is a behaviour change across four fields and what empty MEANS differs by field. A tag list going empty and a category going empty are not the same event.

Measured: ZERO of the 10,382 live pages hold a stale value in any of the four, so this is latent rather than a live correctness problem today. The instrument was controlled first — 10,382 of 10,382 carry a `category` key inside `data` and 10,382 carry a named category, so the query finds what it looks for rather than returning zero from looking in the wrong place. 2,151 rows have been updated after creation, so a window has genuinely existed.

WHAT HOLDS THE COUNT AT ZERO FOR `category` IS ALAN'S OWN RULE. Monarch reports a category for every transaction and never null, because rule #0 in Monarch's rules engine forces `Uncategorized` onto every transaction on nine accounts rather than leaving the field empty. A category cannot clear — it can only change. Delete that rule and this defect starts biting the field it matters most for.
