---
id: 96041e23-7a34-52d9-a446-f1affe63701c
page-type-slug: mp-command
title: "Dominance"
slug: dominance
path: file-structure dominance
domain-parent-slug: mp-namespace/file-structure
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Dominance** — each file of one section, grouped by the deepest folder holding all that points at it.

# Design

A file nothing points at has no dominator, and is grouped apart rather than at the root.
