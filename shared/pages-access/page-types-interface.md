---
description: Documents the elevated accessors for page-type and property-definition rows, including types, RPC signatures, materialization, and rematerialize behavior.
---

# Page-types interface

Elevated accessors for rows whose `page_type_slug` is `page-type` or `property-definition`. The [pages interface](pages-interface.md) normal accessors reject these slugs — definition-tier writes carry data-integrity invariants that only the per-kind RPCs preserve.

## What lives in the tier

- **`page-type`** rows define a page type: slug, inheritance via `extendsPageTypeId`, and a materialized `attributes.propertyDefinitions` blob (see [Materialization](#materialization)).
- **`property-definition`** rows each describe one property of one page type. Every property-definition row points at its owning page-type via its `pageType` attribute.

All per-kind mutators are **single-item only**. No bulk variants.

## Accessor & RPC reference

The `PropertyDefinition` type, the page-type and property-definition CUD function signatures, and the underlying plpgsql RPC signatures live in the reference doc: [Accessor & RPC reference](page-types-interface-api.md). The semantics below (materialization, the universal tier, statement-timeout behavior, unique / parent composition) are the parent's; the reference doc holds the signatures. Load it when you need an exact function or RPC signature.

## Universal properties

The `page-type` page-type owns property-definition rows for the nine universal page columns — `id`, `createdAt`, `updatedAt`, `deletedAt`, `pageTypeId`, `userId`, `seq`, `icon`, `title` — plus universal attribute-backed properties added as **data**, not DDL: `slug`, `cover`, and the rendering-config properties (`detailConfig`, `listingConfig`, `mediaConfig`, `sequence`). (The former `verified` / `verifiedExpiry` / `owners` trio was retired — soft-deleted root defs with zero writers and zero data at rest.)

Every page-type inherits these via the `extendsPageTypeId` chain, so they appear in every page-type's materialized `attributes.propertyDefinitions` blob and behave as first-class sort/filter/group dimensions through the property-type ops registry.

The `page-type` root row itself has `extendsPageTypeId = NULL` — it IS the root.

## Universal definition tier (multi-user)

Every page row carries a NOT NULL `user_id` and is owner-scoped by the `pages_owner_select` RLS policy (`user_id = auth.uid()::text`). The definition tier (page-types + property-definitions) is shared infrastructure, not per-user content, so it is published to **every** authenticated user through a **universal tier**: a small, fixed set of definition rows whose `user_id` is the reserved sentinel `UNIVERSAL_USER_ID` (`ffffffff-ffff-ffff-ffff-ffffffffffff`, from `@shared/pages-access`'s `sentinels.ts`; never issued by Supabase auth, distinct from the `NEVER_MATCH_VALUE` nil UUID). An **additive permissive** SELECT policy `pages_universal_select` (`FOR SELECT TO authenticated USING (user_id = '<sentinel>')`) sits alongside `pages_owner_select`; because both are permissive, Postgres ORs them, so every authenticated user reads **owned ∪ universal** at the DB. The sentinel keeps the access-control marker in the access-control column rather than smeared into domain `attributes`.

The universal set is per-row (a slug allowlist would over-share — only ~5 of ~222 page-types and an inherited subset of property-definitions are universal):

- **Infra page-types** — `page-type`, `property-definition`, `nav`, `view`. These four carry the materialized `propertyDefinitions` blob a non-owner needs to render their own `nav` / `view` instances and any custom type extending the root.
- **Inherited-universal property-definitions** — the root-owned property-defs that materialize into every type (those owned by the `page-type` root and not flagged `inherited: false`): the universal columns above plus `cover` / `slug`. (The infra types' *own-schema* property-defs are **not** universal — instance rendering reads the page-type row's inline blob, never the individual property-def rows.) `automation` is **owner-scoped, not universal** — its only runtime consumer is the mutation-time optimistic seam, which degrades gracefully to the server-authoritative path when absent.

Rows are marked once by an expand migration (data UPDATE to the sentinel + `CREATE POLICY`), landed atomically marker-before-policy so there is never a window where the engine cannot read the schema it needs to render. Because the read path (`getPages` / `streamPages` / `hydrateSlug` / `useAllPages` and the local PGlite query) carries no owner predicate — owner scoping is 100% RLS — it consumes the widened `owned ∪ universal` set automatically. The one client-side definition filter, the View page-type selector (`view-page-content.tsx`), filters to `pt.userId === currentUserId || pt.userId === UNIVERSAL_USER_ID` (owned ∪ universal) rather than the former brittle name allowlist.

## Materialization

`attributes.propertyDefinitions` on each page-type row is the flattened, inheritance-resolved, shadow-deduplicated list of property definitions that apply to that page type. Reads go through `getPropertyDefinitions(pageTypeId)` — a single indexed lookup, empty array on miss (no fallback walk).

Every CUD RPC in this tier performs its write and, in the same transaction, rebuilds `attributes.propertyDefinitions` on every affected page-type row:

1. Compute the affected page-type set.
   - For a `property-definition` write: `descendants(pageType-attribute-of-the-row)`. On a patch that moved the row between owners, `descendants(new-owner) ∪ descendants(prev-owner)`.
   - For a `page-type` write: `{self} ∪ descendants(self)`.
2. Acquire row-level `FOR UPDATE` locks on every affected page-type in sorted `id` order — deterministic lock order prevents deadlocks between concurrent writers.
3. For each affected page-type, walk ancestors via `extendsPageTypeId` root-to-leaf, collect every live property-definition page whose `pageType` attribute names a node in the chain, drop ancestor-owned entries flagged `inherited: false`, dedupe by `stringId` (leaf shadows ancestor), sort by `defaultOrder`, write to `attributes.propertyDefinitions`.
4. A cycle in the extends graph trips a 64-depth cap in `_affected_page_types` and raises — the write and every rebuild roll back.

## Statement timeout and the root cascade

A write whose affected set spans the root's descendants — patching or rematerializing the `page-type` root row, or any CUD on a root-owned (universal) property-definition — rebuilds every page-type in the system. Historically this cost dominated: the bare `_rematerialize_page_type` loop measured ~82 s at 244 page-types, driven almost entirely by the **per-data-row composed-column recompute** — every affected type re-derived `unique_key` / `status` / `completed_at` / `parent_key` on all of its live rows (~682k rows across the tree). That exceeded the database-level `statement_timeout = '10s'` runaway guard which `service_role` inherits, and the definition-tier pg accessors compensated with a session-scoped `SET LOCAL statement_timeout` runway on an explicit transaction.

That runway is **retired**. The per-data-row recompute is now signature-gated in `_rematerialize_page_type`: the four composed columns are pure functions of the row's attributes and a narrow projection of the definitions blob (the sets of `unique` / `parent` ids and whether a `status` / `completedAt` def is present), captured by `_composed_column_signature`. A write whose signature is unchanged on a descendant type skips that type's whole recompute. Because `unique` / `parent` are leaf-scoped, a root-owned definition write leaves every descendant's signature unchanged in the common case (title / type / config / order edits, and create / soft-delete of non-signature properties), collapsing the cascade to blob rewrites only — well within the default 10 s budget. The definition-tier pg accessors therefore run each RPC as a plain `SELECT public.<rpc>(...)` with no elevated timeout and no wrapping transaction (each RPC is a single atomic plpgsql call).

The one residual: creating a **universal** `status` / `completedAt` definition on the root (which flips the signature at tree scale) still recomputes across every typed row. That is a rare, deliberate schema event, not a routine write, and is left to fit the default budget rather than kept on a standing runway.

## Unique properties

`unique: true` on a property-definition row enrolls that property in the owning page-type's uniqueness key. The platform composes the top-level `pages.unique_key` column (text, nullable — named `unique_key` because `unique` is a SQL reserved word) from the union of unique-flagged properties; domain code never writes the key.

- **Exact-type scoping**: the flag applies only to rows whose page-type owns the definition directly — it does not inherit to extending types (matching the per-domain partial indexes it replaced). `_build_property_definitions` strips `unique` from inherited entries when materializing a descendant's blob.
- Components are ordered alphabetically by property `stringId` (stable under display reordering) and encoded as a JSON array of the component values (collision-proof — no separator escaping).
- If any unique-flagged property's value is absent or null, `unique_key` is NULL and the row is unconstrained. Domains wanting hard enforcement also mark the property `isRequired`.
- One universal partial index enforces uniqueness: `UNIQUE (page_type_slug, unique_key) WHERE deleted_at IS NULL AND unique_key IS NOT NULL`. It replaces the former per-domain partial unique indexes. Violations raise SQLSTATE `23505`; read-then-insert callers treat that as the idempotent-race signal.
- Toggling a `unique` flag flows through the same rematerialize cascade as any definition-tier write (see [Materialization](#materialization)), extended to also recompute `unique_key` on the affected page-types' data rows.
- The composed key surfaces in the flat projection as the read-only promoted key `uniqueKey` (`PROMOTED_COLUMN` / `READ_ONLY_KEYS`): readable everywhere a `Page` flows, never writable by callers.

Composition runs in the proc-layer write paths via the pure helper `_compose_unique_key` — see `_compose_unique_key` in `@shared/pages-proc`. Raw psql writes leave `unique_key` NULL (unenforced); acceptable because the Pages Access Boundary prohibits raw SQL on `public.pages` outside `@shared/pages-access`.

## Parent property

`parent: true` on a property-definition enrolls that property as the owning page-type's single parent pointer. The platform mirrors the flagged property's value verbatim into the top-level `pages.parent_key` column at write time (`_compose_parent_key` — same choke points and exact-type scoping as `unique_key`; the attribute stays authoritative). Read back as the read-only promoted key `parentKey` (`PROMOTED_COLUMN` / `READ_ONLY_KEYS`) — callers never write it. Single-flag semantics: with multiple flagged defs the alphabetical-min `stringId` wins deterministically; multi-property parents are deferred (Rule of Three). The covering index `pages_parent_key_walk_idx (page_type_slug, seq) INCLUDE (id, slug, parent_key) WHERE deleted_at IS NULL` serves heap-free parent-edge walks — first consumer: `getDescendantPageTypeSlugs`, walking page-type `extendsPageTypeId` via `parentKey`. See `_compose_parent_key` in `@shared/pages-proc`.

## RPC signatures

The plpgsql RPC signatures backing these accessors, and the per-write event emission, live in the [Accessor & RPC reference](page-types-interface-api.md#rpc-signatures).
