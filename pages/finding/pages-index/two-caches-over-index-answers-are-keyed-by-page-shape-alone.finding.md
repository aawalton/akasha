---
id: eeee09e7-fe68-57e7-a123-fbdf8b2b5c55
page-type-slug: finding
title: "Two caches over index answers are keyed by page shape alone"
slug: two-caches-over-index-answers-are-keyed-by-page-shape-alone
domain-slug: domain/pages-index
---

# Claim

Two caches answer from the page index but key only on the page shape, so an index that moved under them is not noticed. `rows-homes` at `tools/page/page-rows-home.ts:83` and `property-types` at `page/property/computed.ts:77` both take `shapeMarkOf(tree)` alone. The three caches beside them — `registry`, `declarations` and `vocabulary` — each fold an index stamp into their mark.

# Evidence

Measured 2026-08-28 at `48a6a7171d`.

Unstamped, and both read the index:

- `rows-homes` — mark at `tools/page/page-rows-home.ts:83`, cached at `:87`. It reaches the index through `homesIn` at `page-rows-home.ts:46-60`, which calls `tree.paths(PROPERTY_GLOBS)` at `:48`; both tree constructors resolve that to `scanSpanning` (`page/file-tree.ts:35` and `:62`), then `scanIn` (`page/page-types.ts:139`), then `scannedFromIndex` at `page-types.ts:107`, walking the disk only where the index answers null. It never touches `registryOf`.
- `property-types` — mark at `page/property/computed.ts:77`, cached at `:82`, reading the index through `globsIn` at `computed.ts:65`.

Stamped:

- `registry` — `page/property/registry.ts:54`, cached at `:60`. `indexStamp` is defined at `registry.ts:42-44` and hashes `rowsStamp()`, which is the `pages.jsonl` path, mtime and size at `page/index/store/store.ts:279-282`.
- `declarations` — `page/property/declarations.ts:68`, cached at `:72`.
- `vocabulary` — `page/property/frontmatter.ts:124`, used at `:128`.

An earlier reading said only `registry` carried an index stamp and named `vocabulary` as unstamped. Both halves of that are now wrong: three carry one, and the fourth unstamped cache, `property-types`, was not in that reading at all.

Not measured: whether a stale `rows-homes` or `property-types` answer has ever reached a caller.
