---
id: 0da27770-b6ae-594c-839f-a587a2302993
slug: litrpg-view-projections-are-covered-by-no-test
page-type-slug: finding
title: "Litrpg view projections are covered by no test"
domain-slug: domain/ops-cli
---

# Claim

The projections that shape what `ops litrpg next` and `ops litrpg now-reading` print — `toSelectionView` and `toNowReadingView` — are exported from the code repository's CLI files, imported by nothing outside those two files, and reached by no test on either side. The selector beneath them is well covered. The layer the /nova loop actually parses is not, and moving both bodies here neither lost that coverage nor gained it.

# Evidence

Measured 2026-08-13 while moving the `litrpg` namespace under `domains/tasks/ops/move-command-bodies.md`, landed at c5a9589ca.

That nothing reads them. `grep -rn "toSelectionView\|toNowReadingView"` across the whole code repository, excluding `node_modules` and `dist`, returns six lines: a declaration and a single same-file call in `packages/collections/litrpg/src/cli/next.ts`, the same pair in `packages/collections/litrpg/src/cli/now-reading.ts`, and the same pair again in the unrelated `packages/collections/music/src/cli/next-exploration.ts`. Both litrpg functions carry an `export` keyword and a JSDoc ending "Pure." — written to be tested, and never imported by a test.

What is covered instead. `packages/collections/litrpg/src/nova/select.unit.test.ts` stands beside `select.ts` and exercises `selectNextExploration` and `selectNowReading`, which return the discriminated `LitrpgSelection` and `NowReading` shapes. Everything between those shapes and stdout — the flattening into `{ kind, story, chapter }`, the `chapterNumber ?? null` coercion, and the human formatter's `(ch. N)` and `—` arms — is the untested part, and it is the part a caller reads.

What the move changed about it. `tools/commands/litrpg/next.ts` and `tools/commands/litrpg/now-reading.ts` now carry their own copies of both projections and both formatters, and the verbs dispatch to those. The code repository's copies stay registered in `packages/collections/litrpg/src/cli/registry.ts` but are shadowed, so nothing runs them. Coverage went from zero to zero.

That the output is nonetheless right today. Both verbs were run from a worktree against the live catalog, in the TSV and `--json` arms, and diffed byte-for-byte against the same invocations on the pre-change tree — identical on stdout, stderr and exit code.

Not measured: whether an instructions-repository test can reach a projection that is not exported from its verb file. Nothing in the code repository was edited.
