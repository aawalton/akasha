---
id: 5214cb9d-6a7f-51e5-97cf-d9317e55e713
page-type-slug: finding
title: "Getpages slug omission shape only"
domain-slug: domain/pages-system
---

# Claim

`getPages` lets a caller omit `page_type_slug` on the strength of a guard that tests only whether some `eq` or `in` is present, while the comment stating why that is safe names two index-served cases the predicate never checks — so an `eq` on any ordinary attribute passes it.

# Evidence

`packages/shared/pages/access/src/get.ts:302-303` is the guard: `if (args.pageTypeSlug == null && !whereHasEqNarrow(args.where)) throw new Error("getPages: pageTypeSlug required unless where carries an eq/in narrow")`.

`whereHasEqNarrow` at :297-299 is the whole test — `where?.some((c) => "eq" in c || "in" in c) ?? false`. It reads no `c.key`, so every `eq` and `in` satisfies it equally.

The comment above it, :293-296, is what the guard is trusted on: "True when `where` carries an `eq`/`in` condition — a relation containment or a promoted-column equality, both index-served — so the query is selective enough to run without a `page_type_slug` predicate. Mirrors `getPage`'s narrows-by-id guard, broadened to any containment narrow." The two cases it names are what justify the omission, and neither is tested.

The sibling shows this is a narrowing dropped rather than one never written. `getPage` at :61 guards the same omission with `(c) => ("eq" in c || "in" in c) && (c.key === "id" || c.key === "pageTypeId")` — shape AND key. The broadening kept the shape half and lost the key half.

What passes today that should not: `getPages(sb, { where: [{ key: "status", eq: "active" }] })` with no `pageTypeSlug`. The guard admits it and the read runs with no `page_type_slug` predicate, so the containment probe is unbucketed across the whole `pages` table instead of one type's slice.

That is the class the omission was introduced to escape. The comment at :284-288 records why `pageTypeSlug` was made optional: the relation-scoped descendant span "omits it so the query is keyed on the relation containment alone", avoiding "the broad `page_type_slug=<t>` posting-list read that scaled with the child-type corpus and tripped `statement_timeout` (#13507)". A non-selective attribute `eq` takes the omission without the selectivity that paid for it, and nothing reports it — the rows come back correct, only slowly.
