---
description: The pages_for_view plpgsql signature — each argument, the page / sort_values / total_count columns it returns, and the exceptions it raises.
---

Part of [Pages for view](index.md).

## RPC contract

```sql
pages_for_view(
  p_page_type_id  uuid,
  p_filters       jsonb,    -- array of {field, operator, value}; see filter resolution below
  p_sorts         jsonb,    -- array of {field, direction: "asc"|"desc"}
  p_cursor        jsonb,    -- null or {values: jsonb[], id: uuid}
  p_limit         int,      -- default 200; no upper cap
  p_resolve_keys  text[],   -- default '{}'; extra keys to resolve into the row (flat, by property key)
  p_with_count    boolean DEFAULT false  -- when true, every returned row carries the same total_count over the filtered base CTE
) RETURNS TABLE (page jsonb, sort_values jsonb, total_count bigint)
```

- `page` is the full flattened row in the same shape `getPages` returns — a `Page`: promoted columns merged with `attributes`, all flat at the top level (no nested `data` bag). The top-level bag key is the property's `id` (which today equals its `stringId` — `_build_property_definitions` materializes each `PropertyDefinition` with `id = stringId`, so `propertyId` is the lookup key on the flat row). One extension: every key in the `p_sorts ∪ p_filters ∪ p_resolve_keys` closure carries its **resolved** value at that key — for a rollup key, the terminal scalar from the chain walk, not the unstored `attributes->>'<rollupId>'` that would otherwise be null. This lets the client read `row[propertyId]` and get the same value the server filtered on, so `applyView`'s post-filter and post-sort passes (which exist to handle optimistic-mutation rows that haven't reached the server) dispatch the underlying-type predicate / sort accessor instead of falling through `rollupOps`'s null-only fallback. The merge is right-side-wins on conflict so a rollup-resolved key shadows any stale stored attribute carrying the same name. A future `PropertyDefinition.id` vs `PropertyDefinition.key` split (tracked separately) would route through this same lookup point — the engine would then resolve `propertyId → def.key` once per filter and read `row[def.key]`.
- `sort_values` is the resolved scalar for each sort key in `p_sorts` order, returned alongside the row so the accessor can encode `nextCursor` without recomputing the rollup walk.
- `p_cursor` uses keyset pagination over `(sort_values..., id)`. The accessor decodes the opaque cursor with `decodeCursor`, hands the `{values, id}` payload to the RPC verbatim, and re-encodes the last row's `sort_values` plus `id` for `nextCursor`.
- `p_filters` keys are validated upfront the same way sort keys are — unknown keys RAISE before the main query runs. For each row, distinct keys from `p_sorts ∪ p_filters ∪ p_resolve_keys` are resolved once via `_safe_resolve_sort_value` (a wrapper around `_resolve_sort_value` that swallows `unknown sort field` for keys outside the page-type's propertyDefinitions) into a single `resolved_values` jsonb object — keyed by the same flat-row key as the rest of the page (property `id` = `stringId` today) — that is reused three ways: as the `p_resolved` argument to `_pages_row_matches` (rollup-property filters resolve identically to rollup-property sorts), as the source for the per-key `sort_values` array (positional lookup, no second walk), and as an overlay merged into the projected `page` jsonb at the top level so client-side `applyView` and view cells see the resolved values at `row[propertyId]` without re-walking the chain. The default empty `p_resolved` preserves write-path callers (page_patch / page_upsert / page_soft_delete ACL checks) that match against stored attributes + promoted columns only.
- `p_resolve_keys` is a caller-supplied list of extra keys to resolve into the row jsonb at the top level (under the same flat-row property keys as sort/filter keys). Typical use: a view UI passing the rollup display-column keys that aren't referenced by sorts or filters, so cells can render without a client-side `computeRollup` pass. Unlike sort/filter keys, `p_resolve_keys` is **not** validated upfront — display closure is opt-in and a missing or stale key resolves to SQL NULL inside the closure (cell renders empty) rather than raising. Sort/filter keys still raise on unknown because they affect query correctness.
- `p_with_count` toggles the `total_count` column. When true, every returned row carries the same `total_count` value, computed via `COUNT(*) OVER ()` over the filtered base CTE — that is, the count is taken pre-cursor and pre-LIMIT, so it reflects the total rows the filters match (after RLS) rather than the page-sized window. When false, `total_count` is NULL on every row and the window function is not evaluated. The semantics are identical to `getPages({ withCount: true })` from the V1 PostgREST path, so the count badge stays consistent across both read paths. The accessor projects the first row's `total_count` into `result.count` (or `null` when `rows` is empty and `withCount` was false).

### Errors

- Unknown / unresolvable sort field → `RAISE EXCEPTION 'pages_for_view: unknown sort field <name>'`. View tabs surface a typed error instead of silently returning unsorted rows.
- Unknown / unresolvable filter field → `RAISE EXCEPTION 'pages_for_view: unknown filter field <name>'`. Symmetric with the sort error path; previously these silently matched zero rows.
- A special case of the two above: when the page-type row carries **no** materialized `propertyDefinitions` blob at all (`v_defs IS NULL` — e.g. the page-type row has not yet hydrated into a PGlite replica), the RAISE appends the suffix `(no propertyDefinitions blob)`. The sort path lets `_resolve_sort_value`'s message propagate verbatim; the filter path re-wraps to `pages_for_view: unknown filter field <name> on page-type <id> (no propertyDefinitions blob)` so the suffix survives into the caller's error. Clients use this suffix to distinguish a transient "page-type not loaded yet" gap (recoverable — retry until the row lands) from a genuinely-missing field on a present blob (a real stale filter — surface loudly). The PGlite live-query retry seam (`@shared/pages-ui/src/cache/pglite-live.ts`) keys its two-tier retry on exactly this suffix.
- Rollup chain exceeds `MAX_ROLLUP_DEPTH` → `RAISE EXCEPTION 'pages_for_view: rollup depth exceeded for property <id>'`.
- `p_limit` outside `[1, 1000]` → clamped, never raised.
- Filter operator unsupported by `_pages_row_matches` → propagates the helper's own RAISE so reads and writes share one error surface.
