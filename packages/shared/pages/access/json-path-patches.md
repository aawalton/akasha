---
description: Documents the optional p_patch argument on page_patch, page_type_patch_by_id, and property_definition_patch_by_id — RFC 6902 JSON Patch ops applied to attributes jsonb after the p_set merge.
---

# JSON-path patches

`patchPage` / `patchPages` / `patchPageTypeById` / `patchPropertyDefinitionById` accept an optional `patch: JsonPatch` alongside `set`. Use it for per-field writes that compose with concurrent disjoint-path writes without clobbering — e.g., two clients editing different keys inside `attributes['config']` — and for the only path that can remove a top-level attribute key (`set`'s `||` merge can replace but cannot drop). Whole-property `set` is still the right choice for initial creation and any single-writer slice.

See [pages-interface.md](pages-interface.md) for the underlying `patchPage` / `patchPages` surface and `page_patch` RPC, and [page-types-interface.md](page-types-interface.md) for `patchPageTypeById` / `patchPropertyDefinitionById` and the `page_type_patch_by_id` / `property_definition_patch_by_id` RPCs.

## Semantics

The semantics below are identical for `page_patch`, `page_type_patch_by_id`, and `property_definition_patch_by_id` — all delegate to the shared `_apply_json_patch` helper after their `||` merge.

- **Op subset**: `add`, `remove`, `replace`. RFC 6902's `move`, `copy`, `test` are deferred until a use case appears. `add` is creation-tolerant (creates if missing, replaces if present); `replace` and `remove` raise on missing path.
- **Path**: RFC 6901 JSON Pointer. First segment must be an attribute key — promoted columns (`userId`, `title`, `icon`) and system-managed keys (`id`, `seq`, `pageTypeId`, `pageTypeSlug`, `createdAt`, `updatedAt`, `deletedAt`) raise. Pointer escapes: `~1` → `/`, `~0` → `~`.
- **Raises**: unknown `op`; path not starting with `/`; `replace` / `remove` on missing path; promoted/system-managed first segment; malformed `p_patch` (must be a JSON array).
- **Order**: `p_set` lands first via `||` merge; `p_patch` applies on the merged result. Keys present in both interact — caller responsibility to keep them consistent.
- **Eventing**: the `updated` event's `patch` / `oldValues` projection covers the union of `keys(p_set)` and the first-segment of each `p_patch` op path. Subscribers see top-level "config changed" — sub-path diffing in events is out of scope.
- **Definition-tier guard order** (`property_definition_patch_by_id` only): the universal-shadow guard (no shadowing of reserved `stringId`s outside the page-type root) runs against the post-`p_set` view, before the patch applies — the guard inspects what the caller is *claiming*, not what survives an arbitrary patch op.

## Types

```ts
// RFC 6902 JSON Patch — subset applied to `attributes` jsonb on patch writes.
export type JsonPatchOp =
  | { op: "replace"; path: string; value: Json }
  | { op: "add"; path: string; value: Json }
  | { op: "remove"; path: string }
export type JsonPatch = JsonPatchOp[]
```

## Call-site examples

```ts
// page_patch: update sorts in-place. Concurrent writers on other paths (e.g., filters) are unaffected.
await patchPage(sb, {
  pageTypeSlug: "view",
  where: [{ key: "id", eq: viewId }],
  set: {},
  patch: [{ op: "replace", path: "/config/sorts", value: nextSorts }],
})

// property_definition_patch_by_id: drop a legacy top-level attribute key from a definition row.
// The `||` merge in `set` cannot drop keys; `remove` is the only path that can.
await patchPropertyDefinitionById(sb, {
  id: propertyDefinitionId,
  set: {},
  patch: [{ op: "remove", path: "/options" }],
})
```
