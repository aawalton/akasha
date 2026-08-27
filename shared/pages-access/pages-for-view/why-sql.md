---
description: Why the rollup chain walk for sorts, filters and counts is resolved inside the RPC rather than client-side over PostgREST.
---

Part of [Pages for view](index.md).

## Why this lives in SQL

The rollup chain is a graph walk over `pages.attributes->'config'`; PostgREST has no primitive for it — for either sort or filter. Resolving both on the server keeps `ORDER BY`, `WHERE`, and `LIMIT` in one query plan, lets `nextCursor` keyset over the resolved value, and prevents the count-vs-body skew that bit view tabs when client-side `applyView` ran after a server-side `LIMIT 200` on a wrong column. PostgREST cannot walk a rollup chain for either sort or filter; both are resolved in one query plan inside the RPC. The count piggybacks on the same filter machinery via `COUNT(*) OVER ()` on the filtered base CTE, so it cannot diverge from the rendered filtered rows — the alternative (a parallel `getPages({ withCount: true, limit: 1 })` call) couldn't replicate rollup-filter resolution once that lands on this path. How this fits the broader resolver story lived in a Computed Property Types document that has since been removed.
