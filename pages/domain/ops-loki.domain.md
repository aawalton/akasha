---
id: 8779f734-ed10-5e0d-a536-62fb8ff34e6d
page-type-slug: domain
title: "Ops loki"
slug: ops-loki
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - cluster-service/loki
---

# Definition

- **Ops loki** — the command that answers from the cluster's captured logs.

# Design

Nothing here ships a log; every command reads what a collector already put in the store.

Every answer carries what bounded it — the window it was counted over, and whether anything clipped it.
