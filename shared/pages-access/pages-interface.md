---
description: Documents the generic CRUD accessors for pages rows — property model, types, filter operators, RPC mapping, seq allocation, and event payloads.
---

# Pages interface

Generic CRUD for rows in `public.pages` whose `page_type_slug` is **not** `page-type` or `property-definition`. For writes to those two slugs, use the [page-types interface](page-types-interface.md) — the normal accessors reject them.

## Property model

Every page is a flat single-namespace row on the read side: a `Page` object with strongly-typed universals (`id`, `seq`, `title`, `icon`, `userId`, `pageTypeId`, `pageTypeSlug`, `createdAt`, `updatedAt`, `deletedAt`) plus a `[k: string]: Json` index for everything else. `Page` is a branded type — produced only at trust-boundary call sites through the `Page(value: unknown)` brand-constructor (see Branded Types). Data-tier writes (`createPage` / `patchPage` / `upsertPage`, etc.) accept `PagePropertiesInput<T> = T & JsonObjectInput<T>`, a generic that infers the caller's named-key shape and validates JSON-shape at compile time (eliminating `as unknown as Page` casts). Definition-tier writes (`createPageType` / `patchPageTypeById` / `patchPropertyDefinitionById`) accept `Partial<Page>` — see [page-types-interface.md](page-types-interface.md). Promoted-column keys: `id`, `seq`, `title`, `icon`, `userId`, `pageTypeId`, `pageTypeSlug`, `createdAt`, `updatedAt`, `deletedAt`. Every other key backs an entry in the `attributes` jsonb column.

Write routing: `userId` / `title` / `icon` go to columns; the other promoted keys are system-managed and raise if present; everything else merges into `attributes`. `pageTypeSlug` is materialized onto every row, so filters and selects avoid a slug → id lookup; it's set on insert by `page_create` and is immutable per row.

## Types

```ts
export type Page = {                                // read return — single canonical row type, branded
  id: string
  seq: number
  title: string | null
  icon: string | null
  userId: string
  pageTypeId: string
  pageTypeSlug: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  [k: string]: Json
} & { readonly __brand: "Page" }
export function Page(value: unknown): Page { return value as Page }   // trust-boundary brand-constructor
export type PagePropertiesInput<T extends Record<string, unknown>> = T & JsonObjectInput<T>   // typed-keys write input
export type PageCondition =
  | { key: string; eq: Json } | { key: string; neq: Json }
  | { key: string; lt: Json } | { key: string; gt: Json }
  | { key: string; lte: Json } | { key: string; gte: Json }
  | { key: string; isNull: true }
  | { key: string; in: Json[] } | { key: string; notIn: Json[] }   // set membership (any-of / none-of)
  | { key: string; contains: string } | { key: string; notContains: string }  // case-insensitive substring (and its negation)
  | { key: string; includes: Json }     // jsonb array membership
  | { key: string; isEmpty: true } | { key: string; isNotEmpty: true }  // null / missing / empty-string / empty-array (and its negation)
export type PageWhere = PageCondition[]

// Multi-key sort. `id` is always the implicit final tiebreaker so pagination
// is stable. Ordering on attribute keys works but is slower without a
// targeted index.
export type PageOrder = { by: string; dir: "asc" | "desc" }[]

// Opaque cursor — encodes (values[], id) where values aligns with the order
// array. Callers round-trip it as a string.
export type PageCursor = string

// Projection. Missing keys return `null` (predictable shape); omit for all keys.
export type PageSelect = string[]
```

## Operators

Each `PageCondition` is a single operator applied to one key. Multiple conditions in a `PageWhere` AND together. All operators work on both promoted columns and attribute keys unless noted, and are supported by every entry point (reads and writes) — the read path translates conditions into PostgREST filters client-side; the write path funnels them through the `_pages_row_matches` plpgsql helper, which implements the same semantics server-side.

| Operator | Semantics | Notes |
|---|---|---|
| `eq` / `neq` / `lt` / `gt` / `lte` / `gte` | Value comparison. `neq` is the boolean inverse of `eq` (matches rows where the stored value is not equal to the operand). | On attribute keys, `eq` uses jsonb containment (`@>`); `neq` matches the inverse via the same containment shape. `lt` / `gt` extract the jsonb value (slower without a targeted index). `lte` / `gte` route by value type: string operands use text extraction (`attributes->>key`) so ISO-formatted dates compare lexicographically; numeric / boolean operands use the jsonb path (`attributes->key`) for type-aware ordering. Inclusive variants (`lte`, `gte`) and exclusive variants (`lt`, `gt`) share boundary semantics — pick whichever matches your filter intent. |
| `isNull` | Matches rows whose value is SQL NULL (promoted) or json null / missing key (attributes). | Does **not** match empty strings. |
| `in` | Any-of set membership — true when the value equals one of the supplied JSON values. | On attribute keys, each candidate is matched with `eq` semantics (jsonb containment). Empty array matches nothing. Works on reads and writes. |
| `notIn` | None-of set membership — semantic inverse of `in`. | Scalar storage only (mirrors `in`); empty array is vacuous. Array properties fall through to `applyFilters`. Works on reads and writes. |
| `contains` / `notContains` | Case-insensitive substring match (ILIKE `%value%`) and its inverse. Value is treated as a literal: `%`, `_`, and `\` are escaped. | Text-like values only. `notContains` treats SQL NULL or json-null lhs as "did not contain" (the row passes the filter — it stays in the result), so missing-value rows are not silently filtered out. Works on reads and writes. |
| `includes` | Jsonb array membership — true when `attributes->key` is an array containing the given value. | **Attribute keys only**; raises on promoted columns. Multi-value "any of" is not supported; multiple `includes` conditions AND together (i.e. "all of"). Works on reads and writes. |
| `isEmpty` / `isNotEmpty` | `isEmpty` is true when the value is SQL NULL, a missing json key, an empty string (`''`), or an empty array (`[]`); `isNotEmpty` is its boolean inverse. | The empty-array case makes `isEmpty` correct for relation properties, whose value is stored as a single id string OR an array of ids — an unlinked relation (`[]`) now reads as empty, and a single-id-string or non-empty array reads as non-empty. Empty **objects** (`{}`) remain **non-empty**; callers needing that distinction should use a different operator. Works on reads and writes. |

## Functions

The read (getPage/getPages) and write (create/patch/upsert/delete, plus by-id fast-path and by-ids batch) accessor signatures, with call-site examples. See [pages-interface-functions.md](pages-interface-functions.md).

## RPC plumbing

For the PostgREST/RPC routing table, full RPC signatures, seq-allocation behavior on create, and the event payload shape every write RPC emits, see [pages-rpc.md](pages-rpc.md).
