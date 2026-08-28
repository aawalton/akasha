---
id: e255756c-279f-55ce-9400-fd52a9a8d47c
slug: branding-page-name-and-id-catches-a-class-with-no-live-instance
page-type-slug: finding
title: "Branding page name and page id catches a real class the typechecker cannot see, and no live instance of it exists"
domain-slug: domain/page-storage
---

# Claim

A uuid and a page name are both `string`, so nothing tells them apart at any seam. Two branded string types refuse the confusion — measured, including an argument swap that compiles today. But no live bug exists: all 109 diagnostics the brand raises sit on call sites that are correct now and break only when the merge-queue coordinator's ~106 write sites move from uuid to name. It is worth landing with that rewrite and not as a retrofit.

# Evidence

Measured 2026-08-20, per-package `bunx @typescript/native-preview -b`.

BEFORE, five genuinely wrong calls, exit 0:

    patchEntryPg(client, A_PAGE_NAME, set)
    patchBatchPg(client, A_PAGE_NAME, set)
    productionReaggregateDeps.patchBatch(client, A_PAGE_NAME, set)
    nameOfPageId(A_PAGE_ID, A_PAGE_TYPE_SLUG)      <- arguments swapped
    nameOfPageId(A_PAGE_TYPE_SLUG, A_PAGE_NAME)

AFTER, all four brandable cases refused TS2345, the swap included. A negative control beside them — correct calls, `const s: string = aPageName`, `aPageName.length` — raised zero diagnostics: the brand refuses the wrong kind without refusing the right one, and stripping to `string` stays free.

The whole module is two declarations plus the ways a branded value is made:

    export type PageName = string & { readonly brandedPageName: true }
    export type PageId = string & { readonly brandedPageId: true }

A name cannot be computed from a page's fields — `named-for:` is a default for naming a new page, not an addressing rule — so a branded name can come only from a lookup (`nameOfPageId`), from `nameFromAt(glob, at)`, which already refuses an `at` that does not round-trip (`file-name.ts:96`), or from a stated literal. `PageSlug` and `PageTypeSlug` earn no brand: `PageId` already catches the swap.

Cost: branding four id parameters in `reactors/db.ts` raised 109 TS2345 across 20 files. Call sites are 105 live. 60 `typeof` DI seams inherit for zero edits; only 2 hand-written seams in the whole CI tree carry a page id.

Correction: four of the five seams reported as silently drifting are `typeof` seams that tracked the brand and raised nothing. The fifth, `reaggregate-landed-batches.ts:26`, failed loudly — TS2322 at `:32`, contravariance at the assignment. None drifts silently.

Non-vacuity: TS2322, TS2305 and TS2307 controls each fired at exit 2, one inside the new module, reverting to exit 0.
