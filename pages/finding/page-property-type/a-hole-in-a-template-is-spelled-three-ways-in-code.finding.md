---
page-type-slug: finding
id: 80bf3ddb-fc81-4c76-a7b3-450b2d2df2ed
title: "A hole in a template is spelled three ways in code"
slug: a-hole-in-a-template-is-spelled-three-ways-in-code
domain-slug: page-type/page-property-type
---

# Claim

Three files each carry their own expression for what a hole in a template is, and they do not agree. Two of them refuse `{page-type.slug}`, which is what `unique-key` defaults to and what the rename help documents. One concept, three implementations, and the corpus holds a value two of them read as fixed words rather than as a hole.

# Evidence

`named-for/named-for.ts:9` states `HOLE` as `/\{([a-z0-9-]+)\}/g`. `page/document/template.ts:5` states `HOLE` as `/\{([a-z][a-z0-9-]*)\}/g`, and `:7` states `ONE_HOLE` for the whole-string form. `page/property/template.ts:4` states `HOLE` as `/\{([^{}]*)\}/g`, deliberately not bounding the name, because bounding it would refuse a value the corpus holds.

`pages/page-property-definition/page-type-unique-key.page-property-definition.md:8` states `default: "{page-type.slug}/{slug}"`, and `tools/lib/rename-property-help.ts:12` documents `unique-key: "{page-type.slug}/{defined-on.slug}/{key}"`. Neither of the first two expressions matches a hole with a dot in it, so `filledBy` at `named-for/named-for.ts:40` leaves `{page-type.slug}` in place as literal text and `holesIn` never reports it.

Nothing renders `unique-key` in this repository: the `uniqueKey` in `shared/pages-access` and `shared/pages-core` is a page's promoted column, not the page type's rule. So the dotted spelling has a documented meaning and no implementation, while the two implementations that exist disagree with each other on the undotted one.

`pages/page-property-type/template.page-property-type.md:17` states only that a hole is marked `{name}`, and does not say what a name may be.
