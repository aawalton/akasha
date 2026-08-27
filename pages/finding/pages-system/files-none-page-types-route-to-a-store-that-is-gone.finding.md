---
id: bbe2d0b7-6923-5c50-aaa9-b5da0391c2a1
slug: files-none-page-types-route-to-a-store-that-is-gone
page-type-slug: finding
title: "The 56 files-none page types route to a store that no longer exists"
domain-slug: domain/pages-system
---

# Claim

The 56 page types declaring `files: none` are routed by live code to a store that no longer exists, and answer empty rather than raising. `packages/shared/pages/ui-store/src/collection/store.ts:136` sets the backing to `"database"` for any slug the page-query-service roster does not name, and line 232 hands that slug to Electric. No `pages` relation exists in the cluster to attach to, so `email-message`, `calendar-event`, `image`, `notification` and 52 others resolve to nothing.

# Evidence

Measured 2026-08-20 against the live cluster at `postgres.postgres.svc.cluster.local`.

No relation named `pages` exists in any schema, of any kind. Selecting `relname` and `relkind` from `pg_class` for names matching `^pages` outside `pg_catalog` and `information_schema` returns eight rows, every one `relkind = 'S'` — an orphaned `pages_seq_*` sequence, of which 61 survive. `select count(*) from public.pages` answers `ERROR: relation "public.pages" does not exist`.

No publication carries the table either: `pg_publication_tables` names only `supabase_realtime` message tables, so Electric has no shape to serve even when the store asks. Electric and this connection reach the same CNPG cluster — `kubectl get svc -A` shows one Postgres and no second.

`public.page_versions` still holds 233,848 rows of history for the departed table, joinable to nothing.

The server half already refuses rather than answering empty: `packages/shared/pages/access/src/get.ts:27` reads "that page type is not file-backed, and pages are no longer read from a table". Only the browser store still routes to the absent one, which makes this asymmetric rather than uniformly broken.

56 of 368 page types declare `files: none`. Some are right to — `page`, `reference`, `world-mechanic` and `car` are abstract parents holding no page of their own. The rest named real data: `email-message`, `monarch-transaction`, `chess-puzzle`, `song-listen`, `heard-track`, `calendar-event`, `notification`, `story-chapter` and the `game-*` and `temper-*` families.

NOT MEASURED: whether any product view reads one of these types today and draws an empty state a person would take for real.
