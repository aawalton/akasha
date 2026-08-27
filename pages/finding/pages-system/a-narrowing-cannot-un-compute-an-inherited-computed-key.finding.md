---
id: 01a0201a-4f61-7000-bbca-d3b95080fea6
slug: a-narrowing-cannot-un-compute-an-inherited-computed-key
page-type-slug: finding
title: "A narrowing cannot un compute an inherited computed key"
domain-slug: domain/pages-system
---

# Claim

This does not bite the file write path today. The computed check is live there, but 0 of 57,873 real markdown pages trip it, and `temper-mined-item` declares `files: none` so its 155,440 items are rows — and `judgeRow` checks no computed key at all. So 181,280 rows, 51.4%, is what a row type check WOULD refuse, not standing breakage. 155,057 of them state a key their own page type deliberately re-declares with `narrows-slug:`, which the judge never consults.

# Evidence

Measured 2026-08-20 over 352,945 sidecar rows and 57,873 markdown pages.

Rows refused by class: required 352,945 (100%), type 255,306 (72.3%), **computed 181,280 (51.4%)**, redeclaration 2,295 (0.7%), undeclared 0. The other five classes are 0 on every row.

The 181,280 splits three ways. **155,057** are `temper-mined-item.name`, whose own `temper-mined-item-name.md` states `narrows-slug: page` — the correct narrowing form. **26,218** state a computed key with no narrowing declaration: `world-mechanic-reading.name` 11,354, `monarch-transaction.updated-at` 10,947, `persona-reward-concept.created-at` 3,860, `character-reading.name` 57. **5** are `game-character.name`, redeclaring without `narrows-slug`.

Mechanism: `judgeFrontmatter` tests `several.find((one) => one.computed)` before `redeclaration()` and before the type loop, so a `narrows-slug` declaration cannot un-compute an inherited computed key and the correct remedy is unreachable. Control both ways: with both declarations a row stating `name` refuses "name is computed on page"; remove the computed declaration and it passes — so the inherited declaration refuses, not the narrowing.

The check is live on the file path, proved through `tools/write.ts --dry-run`: a `finding` fixture without a computed key passes; the same plus `name:` fails.

Two readings, opposite ways. Either the precedence is wrong and a narrowing should be consulted first; or a page type should not re-declare a computed key at all, because turning `computed: true` into `computed: false` reverses a declaration rather than narrowing it.

`notification.body` is a third instance of two documents declaring one key — `page-body.md` is `type: template`, `notification-body.md` is `type: text`, 2,295 rows. Like `publishedAt` the two are disjoint, so `narrows-slug` does not remedy it either. Two of the three known instances are disjoint, so `narrows-slug` only ever fixed the compatible case. `template` has no rule at all, so those also sit unjudged.
