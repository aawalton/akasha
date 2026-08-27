---
description: The getPagesForView accessor surface — argument and result types, where it lives, and why its cursors cannot be replayed against getPages.
---

Part of [Pages for view](index.md).

## Accessor

```ts
export type GetPagesForViewArgs = {
  pageTypeId: string
  filters?: PageWhere                  // matches _pages_row_matches operator semantics
  sorts?: PageOrder                    // multi-key; (sort_values..., id) is the keyset
  cursor?: PageCursor
  limit?: number                       // default 200; no server-side cap
  resolveKeys?: readonly string[]      // extra keys to resolve into the row (display columns, keyed by property key)
  withCount?: boolean                  // default false; when true, result.count carries COUNT(*) over the filtered base CTE
}
export type GetPagesForViewResult = {
  rows: Page[]
  nextCursor: PageCursor | null
  count: number | null                 // null when withCount was false; otherwise total filtered row count (post-RLS, pre-LIMIT)
}
export function getPagesForView(
  sb: PageAccessClient,
  args: GetPagesForViewArgs
): Promise<GetPagesForViewResult>  // result.rows is Page[]
```

Lives at `src/get-for-view.ts`, re-exported from `src/index.ts`. Cursor encoding/decoding reuses [`cursor.ts`](../pages-interface.md#functions).

## Cursor compatibility

The cursor codec is shared with `getPages` (`cursor.ts`). A cursor produced by `getPagesForView` cannot be replayed against `getPages` and vice versa — the `values` array length matches the caller's `sorts` order, and the resolved-rollup scalars only exist on the view path. Accessors that switch read paths between requests must drop any in-flight cursor.
