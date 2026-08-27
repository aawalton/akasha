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

A page type states each repo and path its pages stand in, rather than that being read off what is on disk.

