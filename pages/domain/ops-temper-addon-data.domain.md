---
id: 40de19b7-4c46-531e-865c-171ca81d97b8
page-type-slug: domain
title: "Ops temper addon data"
slug: ops-temper-addon-data
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops temper addon data** — the commands that turn Temper's page data into the data files its addons and packages carry.

# Design

The mined-item catalogue stands as one file of about a hundred and fifty thousand items, and the whole of it is read before anything is matched.

A composed query takes one test per key.

A large property is carried only where a read names it, so a generator parsing one names it in `select`.

A selected page carries `null` where the source states no value, never `undefined`.
