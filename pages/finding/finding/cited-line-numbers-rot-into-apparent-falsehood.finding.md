---
page-type-slug: finding
slug: cited-line-numbers-rot-into-apparent-falsehood
title: "A finding's cited line numbers rot into apparent falsehood"
domain-slug: page-type/finding
---

# Claim

Of seven code citations measured across three pages-system findings, five no longer name the line they were written for, and nothing re-anchors them. A reader who checks one sees unrelated code and reads the finding as false, which `finding.page-type.md:36` then invites them to say. Drift turns a true finding into an apparently-false one, and the rules direct its removal. 121 of 144 findings beneath `domain/pages-system` cite a line number; only 714 of 3,181 name a commit to check one against.

# Evidence

Measured 2026-08-28 at `fdc92905`, each citation read with `git show <commit>:<path>` at HEAD and, where the finding names a commit, at that commit.

DRIFTED, cited → where the claimed code now stands. `pages-system/page-stem-cut-at-two-different-dots`: `page/name/name.ts:22` for `stemOf`'s `base.indexOf(DOT)` → `:28`, and `:22` now holds a `throw`. `pages-system/seven-name-stem-readers-disagree`: `pages-system/store/row-pages.ts:49` → `:52`, and `tools/lib/page-query-naming.ts:19` → `:22`. `pages-system/scan-index-test-compares-a-root-frozen-at-import`: `repo/roots/roots.ts:38` for `export const HERE = akashaHere()` → `:51`, and `:104-107` for `rootBeside` → `:111`; `:104-107` now holds `isVendored`.

HELD: `name.ts:15` and `page/index/store/store.ts:219-220`, both exact at HEAD. The rot is per-citation, not per-file — `name.ts:15` and `name.ts:22` stand in one sentence, one right and one wrong.

THE COMMIT IS WHAT SAVES IT. Only the third names one, `8c1650a7`. There `roots.ts:38` is exactly `export const HERE = akashaHere()` and `:104-107` is `rootBeside` entire; the file went 8,583 → 9,362 bytes. That finding is correct at the commit it names and wrong at HEAD. The other two name no commit, so nothing re-anchors them even in principle.

WHY THIS IS WORSE THAN STALENESS. `finding.page-type.md:36` — "Where you checked and the claim is false, say so." Two of the five now land on the right function's opening line rather than the statement claimed, which reads plausible; three land on unrelated code. Both roads end at a true finding removed.

EXPOSURE. 121 of 144 findings beneath `domain/pages-system` cite a line number, and 1,121 of 3,181 repo-wide. 714 of 3,181 name a commit-like hash in its body.

GENUS ALREADY NAMED: `finding/finding/detail-destination-free-text-rots` calls this "a reference whose subject moves without the reference noticing". It names the shape and measures none of it.

NOT MEASURED: whether any finding has been removed for this; whether the two populations overlap.
