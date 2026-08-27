---
description: Streaming and collecting iterators over `getPages` cursor pagination, for workers, CLIs, and scripts that drain rows without exposing the cursor to the caller.
---

# Pages iteration

Streaming and collecting iterators over `getPages` cursor pagination. For workers, CLIs, and scripts that drain rows without exposing the cursor to the caller. See [pages-interface.md](pages-interface.md) for the underlying `getPages` semantics, `PageWhere` operators, and `PageOrder` rules — they apply identically here.

## Functions

```ts
export type StreamPagesArgs = Omit<GetPagesArgs, "limit" | "cursor"> & {
  pageSize?: number   // default 200, clamped to [1, 1000]
  max?: number        // optional cap on total rows yielded
}
export function streamPages(sb, args: StreamPagesArgs): AsyncIterable<Page>
export function collectPages(sb, args: StreamPagesArgs): Promise<Page[]>
```

`pageSize` controls the size of each underlying `getPages` call. `max` is a hard cap on total rows yielded — iteration stops as soon as that count is reached, even mid-page.

Cursor stability is preserved across page boundaries: rows inserted between pages are not double-yielded or skipped (verified by `iterate.database.test.ts`).

## When to use which

- `streamPages` — process rows as they arrive (worker reactors, large drains where buffering would waste memory).
- `collectPages` — caller buffers the full result anyway; `Array.fromAsync(streamPages(...))` under the hood.
- `getPages` — UI flows that need explicit cursor control (React Realtime hooks, `loadMore` buttons).

## streamPagesForView

The view-aware sibling of `streamPages`. Wraps `getPagesForView` (over the `pages_for_view` RPC) with internal cursor chaining, so callers that want to drain every row matching a view's filter/sort/group config — including rollup-resolved sort keys — get an async iterator without managing the cursor themselves.

```ts
export type StreamPagesForViewArgs = Omit<GetPagesForViewArgs, "limit" | "cursor"> & {
  pageSize?: number   // default 500, clamped to [1, 1000]
  max?: number        // optional cap on total rows yielded
}
export function streamPagesForView(sb, args: StreamPagesForViewArgs): AsyncIterable<Page>
```

Yields `Page` rows in the order the RPC returns them — server-side `ORDER BY` honors `args.sorts` (rollup-chained keys resolved via `_resolve_sort_value` on each row), and the opaque cursor preserves stability across page boundaries the same way `streamPages` does. `pageSize` controls the size of each underlying `getPagesForView` call (default 500 vs. `streamPages`'s 200, reflecting that view drains typically hit larger row counts under a single ORDER BY plan); `max` is the hard cap on total rows yielded.

Use `streamPagesForView` when the caller's read shape is a *view* — filter/sort/group config that may reference rollup chains, computed properties, or other keys PostgREST cannot resolve directly. Use `streamPages` when the caller wants the raw `getPages` shape — flat `PageWhere` / `PageOrder` over stored attributes and promoted columns, no rollup resolution. The hydration path in `@shared/pages-ui-store`'s view-keyed `hydrateView` flow is the primary consumer — it pulls only the rows matching a view's config rather than the full per-`pageTypeSlug` slice.
