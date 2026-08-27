---
id: 7c6905b2-f597-55a7-8acd-ce46a95db401
page-type-slug: domain
title: "Ops temper inventory automation"
slug: ops-temper-inventory-automation
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper inventory automation** — the commands that read and set the toggles rules are derived from rather than written out.

# Design

A toggle set here becomes a rule standing ahead of every written rule, and no command edits that rule.

`set` clears a toggle but never the scope holding it, so a scope emptied this way stays as an empty entry.
