---
id: 2c09041d-65a2-568f-864f-ddf99147bcad
page-type-slug: domain
title: "Pages system"
slug: pages-system
domain-parent-slug: domain/global
persona-champion-slug: astra
sequence-slugs:
  - domain/page-types-system
  - domain/page-queries-system
  - domain/page-writes-system
  - domain/repo-system
  - domain/collection-system
  - package/shared-pages-ui
settled: true
---

# Definition

- **Pages system** — how we keep track of things.

# Design

A page type's shape is data rather than code.

Page types and property definitions are themselves page types.

What makes a file a page is the page type its name carries.

A page type states where its pages are written.

A page carries no repository field. Its address is its repository, a colon, and its path inside that repository.

# Rules

## Answer Or Refuse

**Refuse where you cannot answer, rather than answering as though there were nothing.**

A true empty and a failure read alike, and only one of them is a fault.

Never read a missing source as an empty one.

Never let a failed write return like a done one.
