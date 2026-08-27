---
id: 03fe95f9-0be5-5845-abf6-104e5ec4bf76
page-type-slug: domain
title: "Workspace package"
slug: workspace-package
domain-parent-slug: domain/package
required-reading-slugs:
  - domain/package-manifest
---

# Definition

- **Workspace package** — a package the repo's own package manifest names.

# Rules

## Earn The Manifest

**Make a folder a workspace package only when a tool must read what it needs.**

A manifest costs upkeep on every change and buys nothing until something reads it.

Importing it by name is not a tool reading it.

A boundary is a check's job, not a manifest's.
