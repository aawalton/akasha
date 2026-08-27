---
id: 84f1ad67-ae33-53c9-9157-de1ffa6ba421
slug: help-verdict-and-reading-unread
page-type-slug: finding
title: "CommandHelp declares verdict and reading, and nothing reads either"
domain-slug: domain/ops-cli
---

# Claim

`CommandHelp` declares `verdict` and `reading`, and nothing reads either. Both are single-member string unions whose only possible value is `"emits"`, stated at three sites in all, and no renderer, audit, dispatcher or hook consults them.

# Evidence

`tools/ops/surface.ts:54` declares `export type VerdictDisposition = "emits"` and `:56` declares `export type ReadingDisposition = "emits"`. `CommandHelp`, at `:60`, carries optional `verdict` and `reading` keys of those types.

The complete set of uses: `verdict: "emits"` at `tools/commands/tests/run.ts:22` and `tools/lib/verify-render-help.ts:6`; `reading: "emits"` at `tools/commands/elaine/health-import.ts:23`.

A search of `tools/` for `VerdictDisposition`, `ReadingDisposition`, `help.verdict`, `help.reading` and `"emits"` returned only those type declarations and those three declaration sites. `tools/ops/render.ts` prints neither key, and `tools/lib/command-surface.ts` passes the whole help object through without reading them.

Not measured: whether anything outside this repository reads them. This rests on a survey of 292 help declarations taken on 2026-08-24; the number of commands has risen since, so a later declaration could exist. I did not check whether the two keys were meant to drive behaviour that was never built.
