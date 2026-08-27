---
description: Documents the PostgREST + plpgsql RPC plumbing under the pages access layer — operation routing, RPC signatures, seq allocation, and event payloads.
---

# Pages RPC plumbing

Implementation surface beneath the typed access-layer wrappers documented in [pages-interface.md](pages-interface.md). Read that file first for the public types and functions; this one covers how each accessor maps to PostgREST or a plpgsql RPC, the RPC signatures themselves, and the side effects (seq allocation, event emission) that callers depend on.

## PostgREST vs RPC
Writes are plpgsql RPCs; reads are PostgREST.

| Operation | Path |
|---|---|
| `getPage` / `getPages` | PostgREST `.from('pages').select(<projection>)` with filters. `pageTypeSlug` is a direct `.eq('page_type_slug', slug)`. `getPages` with `withCount: true` adds `{ count: 'exact' }` to the same call (one round-trip); set on the un-cursored first fetch only. |
| `createPage` | RPC `page_create` |
| `patchPage` / `patchPages` | RPC `page_patch` |
| `patchPageById` | RPC `page_patch_by_id` |
| `upsertPage` | RPC `page_upsert` (wraps `page_create` / `page_patch`) |
| `upsertPages` | RPC `pages_upsert` (loops `page_upsert` server-side) |
| `softDeletePage` / `softDeletePages` | RPC `page_soft_delete` |
| `softDeletePageById` | RPC `page_soft_delete_by_id` |
| `undeletePage` / `undeletePages` | RPC `page_undelete` |
| `undeletePageById` | RPC `page_undelete_by_id` |
| `hardDeletePage` / `hardDeletePages` | RPC `page_hard_delete` |
| `hardDeletePageById` / `hardDeletePageByIds` | RPC `page_hard_delete_by_id` / `page_hard_delete_by_ids` |

## RPC signatures

```sql
page_create          (p_page_type_slug text, p_properties jsonb, p_select text[] DEFAULT NULL) → jsonb
page_patch           (p_page_type_slug text, p_where jsonb, p_set jsonb, p_select text[] DEFAULT NULL, p_patch jsonb DEFAULT NULL) → SETOF jsonb
page_patch_by_id     (p_page_type_slug text, p_id uuid,    p_set jsonb, p_select text[] DEFAULT NULL, p_patch jsonb DEFAULT NULL) → jsonb
page_upsert          (p_page_type_slug text, p_where jsonb, p_set jsonb, p_select text[] DEFAULT NULL) → jsonb
pages_upsert         (p_page_type_slug text, p_items jsonb, p_select text[] DEFAULT NULL) → SETOF jsonb
page_soft_delete     (p_page_type_slug text, p_where jsonb, p_select text[] DEFAULT NULL) → SETOF jsonb
page_soft_delete_by_id  (p_page_type_slug text, p_id uuid,    p_select text[] DEFAULT NULL) → jsonb
page_undelete        (p_page_type_slug text, p_where jsonb, p_select text[] DEFAULT NULL) → SETOF jsonb
page_undelete_by_id  (p_page_type_slug text, p_id uuid,    p_select text[] DEFAULT NULL) → jsonb
page_hard_delete     (p_page_type_slug text, p_where jsonb, p_select text[] DEFAULT NULL) → SETOF jsonb
page_hard_delete_by_id  (p_page_type_slug text, p_id uuid,    p_select text[] DEFAULT NULL) → jsonb
page_hard_delete_by_ids (p_page_type_slug text, p_ids uuid[], p_select text[] DEFAULT NULL) → SETOF jsonb
```

Every RPC raises if `p_page_type_slug` is `'page-type'` or `'property-definition'`.

The `_by_id` / `_by_ids` siblings are identity-equivalent to their where-DSL parents called with `[{key:'id',eq:p_id}]` / `[{key:'id',in:p_ids}]`, but route the candidate lookup through `pages_pkey` instead of a `_pages_row_matches`-driven scan over the page-type partition. Use them whenever the caller already knows the target id(s); keep the where-form for compound predicates and non-id keys.

## Seq allocation on create
The page-type row's own `seq` column doubles as the child counter — no separate `seq_counters` table. `page_create` bumps the page-type row's `seq`, inserts the new page with the allocated seq and materialized `page_type_slug`, and returns — all in one transaction. Concurrent creates serialize on the page-type row lock.

On **leaf pages** `seq` is the immutable identity assigned at creation; on definition-tier rows (`page-type`, `property-definition`) it's a rolling child counter. The `(page_type_slug, seq)` unique index is partial — `WHERE page_type_slug NOT IN ('page-type', 'property-definition')`.

## Unique-key materialization on write
Every data-tier write RPC recomputes the row's `unique_key` column via the pure helper `_compose_unique_key`, fed by the page-type's unique-flagged property definitions — same write-path materialization pattern as `seq` and `page_type_slug`. The universal partial index `UNIQUE (page_type_slug, unique_key) WHERE deleted_at IS NULL AND unique_key IS NOT NULL` enforces uniqueness, raising SQLSTATE `23505` on conflict. Affordance semantics and composition rules: [page-types interface — Unique properties](page-types-interface.md#unique-properties).

The same write paths also recompute the derived `status` / `completed_at` index-mirror columns via `_compose_status` / `_compose_completed_at` (def-gated on the page-type declaring the `status` / `completedAt` stringIds). These are internal — not promoted, not projected; they exist to serve the universal partial index `pages_status_completed_at_idx (page_type_slug, status, completed_at DESC) WHERE deleted_at IS NULL AND status IS NOT NULL`. Composition rules live in `@shared/pages-proc`, in `_compose_status` and `_compose_completed_at` themselves.

## Events
Every write RPC inserts one row per affected row into `public.events` inside its own transaction — mutation and event commit atomically, or neither does. The source write's emission contains the source row's `created` / `updated` / `deleted` event and, when a forward-relation key with a declared back-relation has changed, one `page.relation.mirror_pending` event per (source, backKey) tuple — payload `{sourceId, backKey, backKind, added, removed}`, eventCategory `page-relation-mirror`, `reference_id = sourceId`. No subscriber consumes the `mirror_pending` row, so no per-target back-relation `updated` event follows it. Emission still routes through the single choke point `public._pages_emit_db_result(jsonb[])`, which preserves caller-given order within one emission via `unnest(p_events) WITH ORDINALITY`. Scan order is the monotonic `events.seq` column populated at INSERT time from a global sequence; `inserted_at` / `id` stay for partitioning and audit but do not gate ordering. Payload discriminates on `type`:

```ts
type DbResultEvent = DbCreatedEvent | DbUpdatedEvent | DbDeletedEvent
interface DbEventBase { rowId: string; tableName: "pages"; pageTypeSlug: string }
interface DbCreatedEvent extends DbEventBase { type: "created"; fields: Page }
interface DbUpdatedEvent extends DbEventBase { type: "updated"; patch: Partial<Page>; oldValues: Partial<Page> }
interface DbDeletedEvent extends DbEventBase { type: "deleted"; oldValues: Page }
```

`patch` / `oldValues` on `updated` cover only the keys the caller wrote. `fields` on `created` and `oldValues` on `deleted` are the full flat properties of the row.
