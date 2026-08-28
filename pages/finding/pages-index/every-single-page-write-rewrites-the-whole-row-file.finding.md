---
id: d4bd422d-9151-5300-a3f0-2b0a252d78ad
page-type-slug: finding
title: "Every single page write rewrites the whole row file"
slug: every-single-page-write-rewrites-the-whole-row-file
domain-slug: domain/pages-index
---

# Claim

Landing one page rewrites all of `pages.jsonl`. `keepPages` at `page/index/store/store.ts:392-402` sorts every row and writes the file whole, unconditionally, and every single-page landing reaches it through `landHere` at `page/index/build.ts:388-401`. The file stands at 18,106,104 bytes over 59,171 lines, so the cost of keeping the index current is fixed rather than proportional to what changed.

# Evidence

Measured 2026-08-28 at `48a6a7171d`.

`page/index/store/store.ts:400` is the write, calling `writeWhole` with every row joined. Every row is sorted first. Nothing narrows it to the rows that moved.

The path from a one-page landing: `landHere` at `page/index/build.ts:388-401` calls `appliedInto` at `build.ts:357-371`, which calls `keepPages` at `build.ts:369`. The code states the consequence itself at `build.ts:383-386`: the file is written whole either way, so landings that touch nothing in common still collide.

On disk at `.git/pages/index/pages.jsonl`: 18,106,104 bytes, 59,171 lines. Beside it `relations.json` at 134,475 bytes and `built-from.json` at 158.

The index is not in the working tree. `indexRoot` at `page/index/place/place.ts:62-71` runs `git rev-parse --absolute-git-dir` at `:65-67` and joins `pages/index` at `:68`, so nothing under it is committed and nothing there is reachable by a search over the checkout.

Earlier readings of the same file, both taken 2026-08-27: 18 MB over 59,037 lines, and 59,061 rows. The line numbers this claim came from were `store.ts:387-397` and `place.ts:52-59`; both have shifted.

Not measured: the wall-clock cost of one landing rewrite at the current size.
