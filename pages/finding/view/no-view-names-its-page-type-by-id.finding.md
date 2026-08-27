---
id: 6843d650-348c-5824-8e8a-f94330a31fb5
slug: no-view-names-its-page-type-by-id
page-type-slug: finding
title: "No view names its page type by id any more, so that Design entry is no longer true of any view"
domain-slug: page-type/view
---

# Claim

The Design entry saying a view names its page type by id is no longer true of any view, and the
Intent entry saying it names it by slug has come true for that half. Counted 2026-08-20 over all
72 view files.

# Evidence

Of the 72 files at `instructions:views/*.md`:

- **65 state `page-type:` with a slug.** For instance `page-type: identity-statement`,
  `page-type: value`.
- **0 name a page type by id.** A search for `page-type-id` matches 28 files, and in every one
  it is an entry inside a `hidden-properties-order:` list -- the name of a property being
  ordered, not the view's own reference to its type.
- **7 state no page type at all.** Two, `home-favorites` and `home-recently-viewed`, carry
  `predicate:` instead, which is the cross-type case the entry at :28 already covers. The other
  five -- `archive-of-worlds-new-page-list`, `docs-all-pages`, `docs-claude-md`,
  `temper-new-page-list`, `workflow-steps-list` -- carry neither a page type nor a predicate.

So the first half of the Design entry at :22 is false today. Under `domain-intent`'s
`Resolve When Found` rule, the matching half of the Intent entry at :32 is true and is due to
move or go.

The property half of :22 -- "its properties by the key each property definition states" -- still
holds: the entries in `visible-properties`, `hidden-properties-order`, `sort-by` and `group-by`
are property keys.

**The entry at :24 needs a second reading rather than a verdict.** Counted: 31 files carry both
`visible-properties` and `hidden-properties-order`, 22 carry `visible-properties` alone, 19
carry neither, none carries a hidden order alone. Whether those 22 are a gap or simply views
that hide nothing is not something a file count settles.
