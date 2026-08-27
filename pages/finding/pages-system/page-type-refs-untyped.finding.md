---
id: 527a73bf-e5b2-57d1-b2c1-77e209a3d0d5
slug: page-type-refs-untyped
page-type-slug: finding
title: "Three keys that name a page type by its slug are typed as plain text rather than as a relation"
domain-slug: domain/pages-system
---

# Claim

Three keys that name a page by its slug are typed `slug` rather than `relation-slug`, so a rename no longer follows them: `page-type` on an automation, `page-type` on a page query, and `page-type` on a view.

# Evidence

The move command repoints a frontmatter value only where the property naming it is typed `relation-slug`, plus the document's own `slug`; the narrowing stands at `repoint/reslug.ts:22`. That narrowing landed today, after the wider match rewrote `holes: - rule` on twelve refusal templates during a domain rename and broke every one of their bodies against its shape.

Twenty-four properties are typed with a plain `slug` and are not enumerations. Reading their definitions, three of them name a page: `automation-page-type`, `page-query-page-type` and `view-page-type`, each at `pages/page-property-definition/<name>.page-property-definition.md:7`. The rest name a hole, a tag, a muscle, a key, a word or a code symbol, none of which any rename should touch.

Not measured: whether any page type has been renamed since these three were written, and so whether a value under them is already stale. Nothing was read in the code repository.
