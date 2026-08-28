---
id: 5d33442c-1eb5-5c6c-b522-0d92d7d882d3
page-type-slug: finding
slug: a-named-repo-scan-falls-to-a-walk-with-no-refusal
title: "A named repo scan falls to a walk with no refusal"
domain-slug: domain/pages-system
---

# Claim

A page scan given a named repository whose index does not reach the root it was handed takes the disk walk with no refusal, where the same scan given no repository refuses.

# Evidence

Measured 2026-08-28 at `8c1650a7`.

`scanIn` at `page/page-types.ts:107-115` refuses rather than walking when a caller names no repository and the index describes the root, on the stated grounds that two answer sources can disagree and nothing downstream would say which was used. At `page/page-types.ts:105-106` the same function takes the index answer only where `scannedFromIndex` is not null and otherwise falls to the disk walk at `:123-128`, with no such refusal on the named-repository branch.

Which root the index test compares against stands as `scan-index-test-compares-a-root-frozen-at-import`. Refusing the fallback rather than walking is only survivable once trees that are not the live checkout carry an index of their own.
