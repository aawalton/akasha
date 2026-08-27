---
id: 1d6103b2-b5ee-5205-991e-ebfd06e53144
page-type-slug: finding
title: "Version exempt inert below owner"
domain-slug: domain/pages-system
---

# Claim

`versionExempt=true` on a property-definition owned by a parent page-type is inert for every
descendant type: the key still versions there. The flag's own declaration site documents it without
that caveat, so the one place someone sets the flag is the one place the trap is not stated.

# Evidence

Read 2026-08-07 against `~/code` at `origin/main` `383bf60d35`.

The database walks ancestors when materializing definitions.
`_build_property_definitions.sql` selects `FROM public._pt_ancestors(p_page_type_id)` and joins
property-definition pages on `attributes->>'pageType' = chain.page_type_id`, keeping a row where
`is_leaf OR COALESCE((attrs->>'inherited')::boolean, true)`. So a descendant type's materialized
`propertyDefinitions` carries ancestor-owned definitions, and its pages carry those keys.
The version policy does not walk. `policy-snapshot.ts:76-78` reads
`getPagesByPageTypeSlugPg(client, { pageTypeSlug: "property-definition", where: { pageType: typeId } })`
— exact ownership. A parent-owned def never lands in a descendant's `exemptKeysByPageTypeId` entry.
The same applies to the content storage tier (`storage='content'`), which default-exempts through the
identical query at `:85-87`.

The behaviour is deliberate and documented, but in the wrong place for whoever trips it.
`policy.ts:24-31` states it fully, as the rationale for `STRUCTURAL_EXEMPT_KEYS`: "A def-level
`versionExempt=true` flag on the ROOT page-type base is INERT for descendant types … A universal +
non-overridable entry here is the only mechanism that survives inheritance." Two unit tests pin it,
`policy.unit.test.ts:73-84` and `:86-94`.

The gap is at the declaration. `property-definition.ts:149-155` documents the flag as "A page-type
opts IN to version history via its `versioned` flag; a versioned page-type captures every NON-exempt
property. `true` here excludes this property's changes from the version store." Nothing about
ownership or inheritance. Someone setting the flag on a parent-type property reads that, gets no
warning, and the descendants keep versioning the key silently.

The repair is a sentence in that comment. Whether `loadPolicySnapshot` should walk ancestors
instead of comparing ownership is a separate question this does not settle.
