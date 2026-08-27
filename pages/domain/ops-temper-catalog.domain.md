---
id: 95fb5d78-ac4b-5478-b6bb-7ffe6451eaae
page-type-slug: domain
title: "Ops temper catalog"
slug: ops-temper-catalog
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper catalog** — the commands that read what the catalog addon has collected and ask it to collect again.

# Design

Asking is all the ask can be. The request is a version written into a side file the addon reads on its next boot, and no command here sees whether it acted.

The domain keys these commands take and print are a copy of the addon's registry held in this repository, kept level with it by a drift check rather than read from it.
