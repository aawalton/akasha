---
id: df389b2b-be7a-5595-ba89-2da0fbfc24d3
slug: core-vocabulary-undeclared
page-type-slug: finding
title: "Core vocabulary undeclared"
domain-slug: domain/pages-system
---

# Claim

The pages system's own vocabulary stands only in TypeScript. `PropertyType`, `ViewLayout`, `FilterOperator`, `AggregateFunction` and `GroupGranularity` are each a closed union naming what a page may hold and how it may be shown, and no domain document anywhere names any of the five.

# Evidence

The five unions, each at its declaration:

- `packages/shared/pages/core/src/types.ts:6` — `PropertyType`, the union of what a property may be: text, markdown, number, select, multi-select, date, instant, relation, formula, aggregate, json, rrule, progress, rich-document, action-button and others.
- `packages/shared/pages/core/src/schema/view-data.ts:17` — `ViewLayout`: cards, table, grid, board, list, calendar, gallery, notes, timeline.
- `packages/shared/pages/core/src/property-types/types.ts:5` — `FilterOperator`: equals, not_equals, contains, gt, lt, gte, lte, is_empty, includes, is_between, is_relative_to_today, is_complete and others.
- `packages/shared/pages/core/src/property-types/aggregate.ts` — `AggregateFunction`: sum, count, avg, min, max, first, count_distinct.
- `packages/shared/pages/core/src/schema/view-data.ts:31` — `GroupGranularity`: none, week, month, year.

All five sit under `packages/shared/pages/**`, which is `pages-system`'s declared `code-path`.

Searched for each term across `domains/` on 2026-08-10. What the corpus does hold is `person-access-page-type`, `person-authority-page-data` and `person-authority-page-schema` — three domains that govern who may reach and change a page type, resting on a page-type notion nothing defines. `pages-system` itself carries three rules, all about the shape of a query (`Exclusion By Complement`, `Unbucketed List Read`, `Rollup And Aggregate Reads`), and the last of those names rollups and aggregates as though they were already declared.

Noticed while sweeping for undefined abstractions under `amy/defined-foundations`, which is scoped to the Alan harness. These are outside that scope and are filed rather than fixed.
