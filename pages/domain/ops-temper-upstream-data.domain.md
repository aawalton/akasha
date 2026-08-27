---
id: 92a03ce2-f185-525c-b295-08d412ebd445
page-type-slug: domain
title: "Ops temper upstream data"
slug: ops-temper-upstream-data
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops temper upstream data** — the commands that hold Temper's copy of an upstream ESO library's data true to upstream.

# Design

The upstream Lua these read stands in the live ESO install on this workstation, outside every repository.

An absent upstream file stops the command there: nothing is emitted, and nothing is ruled on.

A carried file is tracked by akasha and the command that wrote it is not.
