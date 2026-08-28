---
id: 94f6644c-edd2-559c-98f4-84ed3bb0bcb9
page-type-slug: page-property-definition
title: "Page type owner slug"
defined-on-slug: page-type/page-type
key: owner-slug
type: lower-kebab-case
slug: page-type-owner-slug
domain-parent-slug: page-type/page-type
---

# Definition

- **Page type owner slug** — the key a page states its owner under, where that is not `owner`.

# Design

The key holds the same identity a read narrowed by user carries, so such a read is answered by testing it.

A page type takes only the key its own document states, never one an ancestor states.

A page type whose every page belongs to one person states none, and a read narrowed by user over it answers with the whole repository's pages.
