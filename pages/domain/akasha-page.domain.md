---
page-type-slug: domain
title: "Akasha page"
slug: akasha-page
domain-parent-slug: domain/akasha-system
sequence-slugs:
  - domain/akasha-page-edge
required-reading-slugs:
  - domain/akasha-page-edge
---

# Definition

- **Akasha page** — all that is kept about one thing.

# Design

A page is one TypeScript file.

A page's identity is a uuid version 7, unchanged when its path, slug or title changes.

A page is one exported object, named for the page's slug.

A page has no body; every section is a property.

Some page properties have their own files.

Some page property files are not TypeScript files.
