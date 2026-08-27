---
description: How pages_for_view resolves a sort or filter key by kind — promoted column, stored attribute, rollup or aggregate — and what the _resolve_sort_value helper does for the last two.
---

Part of [Pages for view](index.md).

## Sort resolution semantics

For each sort key the RPC dispatches by where the value lives:

| Key kind | Resolution | ORDER BY expression |
|---|---|---|
| Promoted / stored column (`title`, `seq`, `createdAt`, ...) | direct column reference | `pages.<column>` |
| Jsonb attribute, non-computed | text extraction on the row's `attributes` | `attributes->>'<key>'` |
| Rollup property | walk the rollup chain via `_resolve_sort_value` and ORDER BY the resolved scalar | `_resolve_sort_value(pages.id, <propertyDefinitionId>)` |
| Aggregate property | walk the relation array via `_resolve_sort_value` and fold per `config.function` | `_resolve_sort_value(pages.id, <propertyDefinitionId>)` |
| Unknown / unresolvable key | RAISE EXCEPTION (loud, not silent) | — |

`id` is always the implicit final tiebreaker so pagination is stable, mirroring `getPages`.

## Filter resolution semantics

Filter keys are resolved by the same dispatch as sort keys, so the same chain that orders rollup rows on view-tab reads also matches them. For each filter the RPC resolves the row's value per key kind:

| Key kind | Resolution | Filter `lhs` source |
|---|---|---|
| Promoted / stored column (`title`, `seq`, `createdAt`, ...) | direct column reference | `pages.<column>` |
| Jsonb attribute, non-computed | text extraction on the row's `attributes` | `attributes->>'<key>'` |
| Rollup property | walk the rollup chain via `_resolve_sort_value` and match the resolved scalar | `_resolve_sort_value(pages.id, <propertyDefinitionId>)` |
| Aggregate property | walk the relation array via `_resolve_sort_value` and fold per `config.function` | `_resolve_sort_value(pages.id, <propertyDefinitionId>)` |
| Unknown / unresolvable key | RAISE EXCEPTION (loud, not silent) | — |

The full operator set (`eq` / `neq` / `lt` / `gt` / `lte` / `gte` / `isNull` / `in` / `notIn` / `contains` / `notContains` / `includes` / `isEmpty` / `isNotEmpty`) applies uniformly across all key kinds — operator dispatch is independent of value source. For rollup keys this means `neq` / `notContains` / `isNotEmpty` match against the resolved terminal scalar (via `p_resolved`) just like `eq` / `contains` / `isEmpty` already did, so a rollup-typed column can use any operator its terminal type supports without a client-side fallback.

## `_resolve_sort_value` helper

`_resolve_sort_value(p_page_id uuid, p_property_definition_id uuid) RETURNS jsonb` walks the rollup chain configured on the property definition. Each hop reads `pages.attributes->'config'` on the property-definition row and follows `{relationPropertyId, targetPropertyId}` to the next page; when the terminal `targetPropertyId` is itself a rollup, the walk recurses on the target page-type with the nested rollup's config. The returned value is the terminal scalar, used directly in `ORDER BY`.

- **Depth cap** — `MAX_ROLLUP_DEPTH = 10`, mirroring `computeRollup` and the client-side resolver.
- **Cycle detection** — a visited array keyed by `(pageTypeId, relationPropertyId, targetPropertyId)` is threaded through the recursive CTE; revisiting a key returns SQL NULL so the row sorts as "no value" rather than looping.
- **Missing context** — if a hop's `relationPropertyId` is missing on the source page, the target property doesn't exist, or the chain bottoms out without reaching a scalar, the helper returns SQL NULL. Nulls sort last.

When the property definition's `type = 'aggregate'`, the helper takes the single-hop fold path instead of the rollup chain walk: it reads the multi-relation array from the source page's attributes at `relationPropertyId`, looks up each target page's stored attribute at `targetPropertyId`, and folds with `config.function` — one of `sum` / `count` / `avg` / `min` / `max` / `first` / `count_distinct`. Aggregate is single-hop only, so neither `MAX_ROLLUP_DEPTH` nor the rollup cycle-detection apply. Null target values are skipped: `count` uses the relation array length, `count_distinct` counts distinct non-null numeric values, and `sum` / `avg` / `min` / `max` / `first` fold over numeric-extractable values only. An empty relation yields `0` for `count` / `count_distinct` and SQL NULL for the other functions; nulls sort last by the same rule as the rollup branch.
