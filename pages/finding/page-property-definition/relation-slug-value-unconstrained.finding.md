---
id: 32a27c2b-9262-551e-83e8-cc7c84e0dc19
slug: relation-slug-value-unconstrained
page-type-slug: finding
title: "Relation slug value unconstrained"
domain-slug: page-type/page-property-definition
---

# Claim

A `relation-slug` property states no eligible value set, so one meant to name a small family of pages accepts any slug-shaped text. `priority-slug`, landed on `theme`, `initiative` and `project` on 2026-08-17, is meant to name one of the four domains under `priorities` and would accept `chess`. The form that does constrain, `select(slug)`, holds its set inline, so bounding the value means copying the four names away from the document that already orders them.

# Evidence

`tools/lib/page-value.ts:190` is the whole of the rule: `["relation-slug", scalarRule("the slug of the page it points at", (text) => checkScalar(text, { type: "slug" }) === null)]`. It tests slug shape and nothing else — not the page type pointed at, not a subtree, not that any page carries the slug at all.

`one-of` is not this mechanism. `properties/page-property-definition-one-of.md` defines it as "the choice a property belongs to, exactly one of whose keys a page states", which groups mutually exclusive keys on one page rather than bounding one key's values. `properties/alert-domain.md`, `alert-persona-slug.md` and `alert-person-slug.md` all carry `one-of: holder` and use it that way.

`properties/book-kind.md` shows the constrained form — `type: select(slug)` with `values: [written, read]` — and it restates its set inline, which is the cost.

The four priorities stand as domain pages under `domains/priorities.md`, ordered by its `sequence-slugs`: stability, throughput, functionality, polish. That document is the one authority on both the membership and the order, which is why the three new properties point at those pages rather than copying the names.

This is not new with `priority-slug`. `properties/theme-domain-slug.md` is `type: relation-slug` and `required: true`, and is equally unbounded — any slug-shaped text passes as the domain a theme works in.

Not measured: whether a gate outside the type rule refuses a relation naming no live page. Only `page-value.ts` was read; the gate set that ran on the three landings reported no relation check by name, but a pass is not evidence one is absent.
