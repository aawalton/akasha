---
id: 019f5141-c410-7cd1-b491-d017f10e568d
page-type-slug: page-type
title: "Mobile cut"
extends-slug: page
files: memory:**/*.mobile-cut.md
body-shape-slug: empty
slug: mobile-cut
plural-slug: mobile-cuts
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - repo/memory-repo
named-for: "{app-slug}-{build-number}"
---

# Definition

- **Mobile cut** — one build of an app, and the state of the tree it was built from.

# Design

A cut made before the build input tree hash was recorded carries none, and reads as a cut owed.

Which cut is newest is settled by its build number, never by when its file landed.
