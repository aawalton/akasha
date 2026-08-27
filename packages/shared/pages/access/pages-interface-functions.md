---
description: Read/write accessor function signatures for the generic pages interface — getPage/getPages, create/patch/upsert/delete variants, and call-site examples.
---

# Pages interface — functions

## Functions

```ts
// Reads -------------------------------------------------------

// Throws on >1 match. Null on 0. `pageTypeSlug` optional when `where`
// narrows by `id` or `pageTypeId`; otherwise required.
export type GetPageArgs = {
  pageTypeSlug?: string
  where: PageWhere
  select?: PageSelect
  includeDeleted?: boolean
}
export function getPage(sb, args: GetPageArgs): Promise<Page | null>

export type GetPagesArgs = {
  pageTypeSlug: string
  where?: PageWhere
  select?: PageSelect
  includeDeleted?: boolean
  order?: PageOrder              // default: [{ by: "seq", dir: "asc" }]
  limit?: number                 // default: 100; server-capped
  cursor?: PageCursor
  withCount?: boolean            // when true, `count` is exact total matching `where` after RLS (ignores `limit`/`cursor`); else `null`
}
export type GetPagesResult = { rows: Page[]; nextCursor: PageCursor | null; count: number | null }
export function getPages(sb, args: GetPagesArgs): Promise<GetPagesResult>

// Writes ----- (each generic <T> below extends Record<string, unknown>; elided)

// `properties` must include `userId`. Reserved system keys raise.
// `pageTypeSlug` in ('page-type', 'property-definition') raises.
export type CreatePageArgs<T> = {
  pageTypeSlug: string
  properties: PagePropertiesInput<T>
  select?: PageSelect
}
export function createPage<T>(sb, args: CreatePageArgs<T>): Promise<Page>

// `set` merges (promoted → columns, rest → jsonb `||`); optional `patch` runs RFC 6902 ops after — see [json-path-patches.md](json-path-patches.md).
// Single-row variant throws on >1 match, null on 0.
export type PatchPageArgs<T> = {
  pageTypeSlug: string
  where: PageWhere
  set: PagePropertiesInput<T>
  patch?: JsonPatch
  select?: PageSelect
}
export function patchPage<T>(sb, args: PatchPageArgs<T>): Promise<Page | null>
export function patchPages<T>(sb, args: PatchPageArgs<T>): Promise<Page[]>

// By-id fast-path variant — primary-key lookup so the planner uses pages_pkey
// instead of scanning the full page-type partition through `_pages_row_matches`.
// Identical semantics to `patchPage` with `where: [{ key: 'id', eq: id }]`, just
// orders of magnitude faster on hot paths. Use whenever the caller already
// knows the target id; keep `patchPage` / `patchPages` for compound predicates.
export type PatchPageByIdArgs<T> = {
  pageTypeSlug: string
  id: string
  set: PagePropertiesInput<T>
  patch?: JsonPatch
  select?: PageSelect
}
export function patchPageById<T>(sb, args: PatchPageByIdArgs<T>): Promise<Page | null>

// Routes to page_create on 0 matches, page_patch on 1, raises on >1 (per item for the batch variant).
// `set` must include `userId` for the create path. Batch items upsert in input
// order in one txn; any failure rolls back every prior item.
export type UpsertPageArgs<T> = PatchPageArgs<T>
export type UpsertPagesArgs<T> = {
  pageTypeSlug: string
  items: { where: PageWhere; set: PagePropertiesInput<T> }[]
  select?: PageSelect
}
export function upsertPage<T>(sb, args: UpsertPageArgs<T>): Promise<Page>
export function upsertPages<T>(sb, args: UpsertPagesArgs<T>): Promise<Page[]>

// Shared args for all three delete variants.
export type DeletePageArgs = {
  pageTypeSlug: string
  where: PageWhere
  select?: PageSelect
}

// soft = sets deletedAt=now(); undelete = clears it (matches soft-deleted);
// hard = permanent DELETE.
export function softDeletePage(sb, args: DeletePageArgs): Promise<Page | null>
export function softDeletePages(sb, args: DeletePageArgs): Promise<Page[]>
export function undeletePage(sb, args: DeletePageArgs): Promise<Page | null>
export function undeletePages(sb, args: DeletePageArgs): Promise<Page[]>
export function hardDeletePage(sb, args: DeletePageArgs): Promise<Page | null>
export function hardDeletePages(sb, args: DeletePageArgs): Promise<Page[]>

// By-id delete variants — same fast-path as patchPageById. Use whenever the
// caller already knows the target id(s); keep the where-form for compound predicates.
export type DeletePageByIdArgs = { pageTypeSlug: string; id: string; select?: PageSelect }
export type DeletePageByIdsArgs = { pageTypeSlug: string; ids: string[]; select?: PageSelect }

export function softDeletePageById(sb, args: DeletePageByIdArgs): Promise<Page | null>
export function undeletePageById(sb, args: DeletePageByIdArgs): Promise<Page | null>
export function hardDeletePageById(sb, args: DeletePageByIdArgs): Promise<Page | null>
export function hardDeletePageByIds(sb, args: DeletePageByIdsArgs): Promise<Page[]>
```

## Call-site examples
```ts
// By (type, seq), slim projection
await getPage(sb, {
  pageTypeSlug: "project",
  where: [{ key: "seq", eq: 42 }],
  select: ["seq", "title", "status"],
})

// Project claim — gate folded into `where`. null ⇒ already claimed.
await patchPage(sb, {
  pageTypeSlug: "project",
  where: [{ key: "seq", eq: seq }, { key: "claimedBy", eq: null }],
  set: { claimedBy: agentId, claimedAt: Date.now() },
  select: ["seq", "claimedBy"],
})
```
