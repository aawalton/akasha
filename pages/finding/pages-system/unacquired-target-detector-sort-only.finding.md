---
id: 570ea715-d8d2-53b7-ab2f-4aa5ba8183ba
slug: unacquired-target-detector-sort-only
page-type-slug: finding
title: "Unacquired target detector sort only"
domain-slug: domain/pages-system
---

# Claim

`deriveViewTargetSlugs` treats four classes of view-config key as reading a resolution target — sort, `group_by`, filter and visible column — and the diagnostic that reports it having missed one is emitted from the sort path only, so a missed `group_by`, filter or column target still resolves to a silent null with nothing emitted.

# Evidence

`packages/shared/pages/ui-store/src/query/view-target-slugs.ts:66-76` builds the key set from four places: `config.sorts` at :68, `config.group_by` at :69, `config.filters` at :70, and `config.visible_properties` at :74. The first three are `gating` — the docblock at :14-17 says they "determine membership/order" and must be resident before first paint.

The failure the derivation prevents is stated at :6-10: a target page-type whose slug was never acquired "has no rows in the mirror, so its resolution silently yields null — a rollup SORT key then fails to discriminate (the reported 'second sort not applied'), and a relation/rollup COLUMN renders blank."

`rg -n "unacquired-sort-target" src/` returns three lines: the reason's declaration at `diagnostics.ts:52`, and one emit inside `noteUnacquiredTargetIfMissing` at `sort-resolve.ts:63`. That function is called from `sort-resolve.ts:212` and `:234`, both in the sort comparable path. `rg -i "unacquired|absent from the mirror|missing target"` over `src/query/` returns hits in `sort-resolve.ts` only.

So of four classes, one is instrumented. A missed `group_by` target groups every affected row under a null bucket; a missed filter target changes which rows are in the view at all — the docblock's own "membership" — and neither emits anything. A missed display target renders a permanently blank cell, indistinguishable from one still filling, since :17-20 says display cells "fill progressively (blank → resolved)".

The detector's own text names the derivation as the thing that fails: `sort-resolve.ts:65` reads "deriveViewTargetSlugs likely missed this target type (#15778)".

Not measured: whether a `group_by` or filter key referencing a relation/rollup target occurs in any live view config. `view-target-slugs.unit.test.ts:54-58` exercises all three gating classes as a fixture, but I queried no production configs.

Read at `ecf5f9518f` on `main`, 2026-08-07.
