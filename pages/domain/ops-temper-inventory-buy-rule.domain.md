---
id: a389f53f-69f7-57ed-8afd-a9cb6cf125d9
page-type-slug: domain
title: "Ops temper inventory buy-rule"
slug: ops-temper-inventory-buy-rule
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper inventory buy-rule** — the commands that write the rules holding one item's total up to a number by buying the shortfall.

# Design

A rule here names no action to take on an item; it names a total to reach and where to buy up to it.

`list` alone reaches the last inventory snapshot, to say how far each total stands from its target.

A rule these make is inactive, and stays so until somebody says otherwise.
