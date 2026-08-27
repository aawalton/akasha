---
page-type-slug: page-type
title: "Page type"
id: 019db533-f381-738c-ba1f-8088bf231d28
extends-slug: domain
files:
  - instructions:**/*.page-type.md
  - akasha:**/*.page-type.md
body-shape-slug: domain
slug: page-type
plural-slug: page-types
domain-parent-slug: domain/page-types-system
---

# Definition

- **Page type** — the specification for a kind of page.

# Design

The page type page type is checked against itself.

No two page types' globs match the same file.

A page type writes `none` where it has no parent and no files, rather than omitting the key.

# Intent

A page type and its property definitions live where their domain lives.
