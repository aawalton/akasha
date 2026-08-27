---
id: f4c1c8c7-ed19-5fe4-9c83-54a95abac099
page-type-slug: domain
title: "Ops temper inventory"
slug: ops-temper-inventory
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper inventory** — the commands that read what the inventory addon recorded and re-run its rule walk outside the game.

# Design

Every command here answers; the commands that change what the addon does stand in the namespaces below this one.

One item has two answers — the walk the addon recorded and the walk recomputed here from the same file — and they can disagree.

Fourteen of these read the addon's files on the workstation; `snapshot` alone rebuilds the same inventory out of the rows the web app stores.
