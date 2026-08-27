---
id: 43947ba8-17db-5ef9-8a5a-13a48186e1e2
page-type-slug: domain
title: "Ops temper inventory rule"
slug: ops-temper-inventory-rule
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper inventory rule** — the commands that write the ordered rules matching whole item categories, one rule at a time.

# Design

Position in the list is priority, and `reorder` is the only command that changes it.

`list` and `show` answer for the rules the automation toggles derive as well, and no command here writes one.
