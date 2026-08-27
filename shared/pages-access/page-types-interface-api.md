---
description: Accessor and RPC signature reference for the definition tier — the PropertyDefinition type, the page-type and property-definition CUD functions on the Supabase-JS surface, and the underlying plpgsql RPC signatures. Semantics (materialization, universal tier, unique/parent composition, statement-timeout) live in the parent page-types-interface.md.
---

# Page-types interface — accessor & RPC reference

The function and RPC signatures for the definition tier. The conceptual model — what lives in the tier, materialization, the universal definition tier, statement-timeout behavior, and unique / parent composition — lives in [page-types-interface.md](page-types-interface.md). All per-kind mutators are **single-item only** (no bulk variants).

## Types

`Page`, `PageWhere`, `PageSelect` — defined in the [pages interface](pages-interface.md). Reads return `Page` (universal columns strongly typed, attribute keys flat alongside via the `[k: string]: Json` index). Definition-tier writes take `Partial<Page>` as the input bag — universals are optional on input (system-managed columns are rejected by the access-layer guards), attribute keys ride the same flat namespace.

```ts
export type PropertyDefinition = {
  id: string          // the property's stringId (stable within its owning page-type)
  title: string       // display title (sourced from pages.title)
  type: string        // e.g. "text", "relation", "multi-select"
  pageId: string      // id of the property-definition page (provenance)
  config?: Json
  accent?: boolean
  sort?: "alpha" | "manual"
  columnName?: string
  indexName?: string
  skipRelationMirroring?: boolean
  isRequired?: boolean
  unique?: boolean    // enrolls the property in the page-type's composed unique_key — see Unique properties
  parent?: boolean    // enrolls the property as the page-type's parent pointer — see Parent property
}
```

## Page-type functions

```ts
// Create — `properties` must include userId. Slug is hardcoded 'page-type'.
export type CreatePageTypeArgs = { properties: Partial<Page>; select?: PageSelect }
export function createPageType(sb, args: CreatePageTypeArgs): Promise<Page>

// By-id patch — primary-key lookup; null on miss. Optional `patch` is an
// RFC 6902 op array applied to attributes after the `set` merge — see
// [json-path-patches.md](./json-path-patches.md).
export type PatchPageTypeByIdArgs = { id: string; set: Partial<Page>; select?: PageSelect; patch?: JsonPatch }
export function patchPageTypeById(sb, args: PatchPageTypeByIdArgs): Promise<Page | null>

// Backfill / repair — rebuild propertyDefinitions on {target} ∪ descendants(target).
// Idempotent.
export type RematerializePageTypeArgs = { pageTypeId: string }
export function rematerializePageType(sb, args: RematerializePageTypeArgs): Promise<number>

// Read the materialized blob. Single indexed lookup; empty array on miss.
// Look up by page-type id (direct) or by its slug (e.g. "project"); the slug
// branch resolves via `attributes->>slug` on the page-type row.
export type GetPropertyDefinitionsArgs =
  | { pageTypeId: string }
  | { pageTypeSlug: string }
export function getPropertyDefinitions(sb, args: GetPropertyDefinitionsArgs): Promise<readonly PropertyDefinition[]>

// Resolve an inheritance subtree to slugs — the parent's own slug plus every
// page-type whose `extendsPageTypeId` chain reaches it. Reads all page-type
// rows once (via `getPages`) and defers the walk to the pure, cycle-guarded
// `resolveDescendantPageTypeIds` from `@shared/pages-core`. `[]` on unknown
// parent slug. The single authority a URL resolver scopes an id-suffix lookup
// to so `/{parent}/{slug}-{last8}` resolves any page of a descendant type (pair
// with `getPageByIdSuffixAcrossTypes` on the generic read surface).
export function getDescendantPageTypeSlugs(sb, parentSlug: PageTypeSlug): Promise<PageTypeSlug[]>
```

## Property-definition functions

```ts
// Patch by id — single-match by primary-key lookup. Raises if pageType is cleared.
// Routes through `property_definition_patch_by_id`.
export type PatchPropertyDefinitionByIdArgs = { id: string; set: Partial<Page>; select?: PageSelect; patch?: JsonPatch }
export function patchPropertyDefinitionById(sb, args: PatchPropertyDefinitionByIdArgs): Promise<Page | null>
```

## RPC signatures

```sql
-- Page-type
page_type_patch_by_id   (p_id uuid,    p_set jsonb, p_select text[] DEFAULT NULL, p_patch jsonb DEFAULT NULL) → jsonb
page_type_rematerialize (p_page_type_id text) → integer

-- Property-definition
property_definition_patch_by_id   (p_id uuid,    p_set jsonb, p_select text[] DEFAULT NULL, p_patch jsonb DEFAULT NULL) → jsonb
property_definition_hard_delete   (p_page_id text) → jsonb
```

Every CUD RPC inserts into `public.events` — see the [pages RPC plumbing](pages-rpc.md#events) for payload shape. The RPC emits one `created` / `updated` / `deleted` event for its target row, and each derived rematerialize of a page-type row's `attributes.propertyDefinitions` additionally emits an `updated` event (with `patch`/`oldValues` keyed at `attributes`) so downstream consumers observe every propertyDefinitions change. The target row's own rematerialize write is suppressed to avoid a redundant second event.
