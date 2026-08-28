---
id: 01a0201a-4f61-7000-bbca-d3b95080fea6
slug: a-narrowing-cannot-un-compute-an-inherited-computed-key
page-type-slug: finding
title: "A narrowing cannot un compute an inherited computed key"
domain-slug: domain/pages-system
---

# Claim

This does not bite the file write path today: the computed check is live there and 0 of the markdown corpus trips it, while `judgeRow` checks no computed key at all. Re-measured 2026-08-28, 177,449 rows — 43.1% — is what a row type check WOULD refuse on the computed class. Almost all of that is a key computed by inheritance rather than re-declared, which corrects what this finding first claimed.

# Evidence

Measured 2026-08-20 over 352,945 rows; re-measured 2026-08-28 over 411,488. The older tree cannot be recounted, this repository's history beginning 2026-08-25.

Refused by class, re-measured: type 255,493 (62.1%), **computed 177,449 (43.1%)**, redeclaration 2,322 (0.6%), undeclared 0.

WITHDRAWN: that 155,057 of the computed class state a key their own page type re-declares with `narrows-slug:`. The count itself reproduces exactly. But no `temper-mined-item-name` declaration stands or is reachable in history, so nothing supports the narrowing part. `name` is computed by inheritance alone, from `pages/page-property-definition/page-name.page-property-definition.md` on `page`, which every page type inherits — as are `world-mechanic-reading.name` 11,354, `character-reading.name` 57, `game-character.name` 5.

Across all 393 page types exactly one declaration re-declares an inherited computed key as non-computed: `monarch-transaction.updated-at`, over 10,976 rows, stating no `narrows-slug`. So nothing uses the narrowing form this finding calls correct: the computed class is inheritance, not redeclaration.

Mechanism, re-verified: `judgeFrontmatter` tests `several.find((one) => one.computed)` before `redeclaration()` and before the type loop, so a narrowing cannot un-compute an inherited computed key. Control both ways: with both declarations a page stating `name` refuses "name is computed on `page`"; remove the computed declaration and it passes.

Two readings, opposite ways. Either the precedence is wrong and a narrowing should be consulted first; or a page type should not re-declare a computed key at all, `computed: true` to `false` reversing a declaration rather than narrowing it. The second costs one declaration to enforce and clears 10,976 rows of 177,449.

`notification.body` remains two documents declaring one key: `page-body.md` states `type: template`, `notification-body.md` `type: text`, over 2,322 rows — disjoint, so `narrows-slug` does not remedy it either.
