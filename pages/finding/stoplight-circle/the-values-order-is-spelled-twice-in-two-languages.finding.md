---
id: d7e6d4be-086c-572b-b92c-61bd3c46a880
slug: the-values-order-is-spelled-twice-in-two-languages
page-type-slug: finding
title: "The values order is spelled twice in two languages"
domain-slug: domain/global
---

# Claim

The order of Alan's six values is written out in TypeScript and again in Swift, with nothing linking them. Reorder his values and the phone silently disagrees with the status bar. The tier-to-glyph map is likewise written out twice inside one package.

# Evidence

Verified by me, 2026-08-11.

**The two copies.**

    packages/shared/status-bar-access/src/daily-stoplights.ts:28
      export const VALUES_ORDER = ["faith","love","health","learn","fun","wealth"] as const

    packages/alanwalton/native-shell/ios-widget/ValuesStoplightsWidget.swift:120
      private let VALUE_ORDER = ["faith","love","health","learn","fun","wealth"]

Identical contents, two languages, no link and no crosscheck test. The Swift side's sibling comment acknowledges the risk: a stale copy would show six labelled circles that jump position the moment live data lands.

**The glyph map, twice more.** Written out at `daily-stoplights.ts:64` and again at `inbox-stoplights.ts:22`, both under `packages/shared/status-bar-access/src/`.

**Why it is a named defect now.** `domains/repetition.md` carries Standardized Palette: "Reference a design-system token; never write the value it resolves to. A literal matching a token is a copy of it, silent in both directions when the palette moves." `stoplight-circle` sits under `design-patterns`, beside `repetition` under `design`, so the rule reaches it. Before 2026-08-11 the stoplight sat under `alan-harness` and nothing in its ancestry said this.

**Same shape as the ESO day.** That boundary is also written twice — `shared/recurrence/src/reset-times.ts` and a Lua-targeted mirror at `temper/shared/foundation-misc/dungeons/src/eso-day.ts:17` with `RESET_OFFSET_SECONDS = 6 * 3600`. That pair at least has a crosscheck test. This one has nothing.
