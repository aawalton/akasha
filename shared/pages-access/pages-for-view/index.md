---
description: Entry point for the pages_for_view RPC and the getPagesForView accessor that resolve rollup sort values in SQL so server-side ORDER BY plus cursor pagination work for view-tab reads; links the parts in reading order.
---

# Pages for view

`getPagesForView` is the read path for view-tab list queries. Unlike `getPages` (which goes through PostgREST and orders on `attributes->>field`), it routes through the `pages_for_view` plpgsql RPC so rollup, computed, and promoted-column sorts all resolve server-side under one ORDER BY. View tabs require this because rollup chains can only be walked in SQL — a PostgREST `.order(refForKey(...))` against a rollup property silently sorts on `attributes->>'rollupId'` (which doesn't exist), the server returns rows unsorted, and the client-side `applyView` only ever sees the cursor-paginated window.

For non-view callers (workers, CLIs, `streamPages` drains, single-row `getPage` lookups) keep using `getPages` / `streamPages` — they're cheaper and don't need rollup resolution.

## Parts, in reading order

1. [Accessor](accessor.md) — the `getPagesForView` signature, where it lives, and cursor compatibility with `getPages`.
2. [Resolution semantics](resolution-semantics.md) — how a sort or filter key resolves by kind, and the `_resolve_sort_value` helper behind rollup and aggregate keys.
3. [RPC contract](rpc-contract.md) — the `pages_for_view` plpgsql signature, what each argument and returned column carries, and the errors it raises.
4. [Execution paths](execution-paths.md) — the flat fast path against the LATERAL path, and the indexes behind them.
5. [Why this lives in SQL](why-sql.md) — the reason the rollup walk is resolved server-side.
