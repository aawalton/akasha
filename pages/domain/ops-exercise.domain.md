---
id: 93efb71a-45b5-5222-899a-2bae869629fa
page-type-slug: domain
title: "Ops exercise"
slug: ops-exercise
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/fitness
---

# Definition

- **Ops exercise** — the commands that write Alan's training record and read it back as the next session's plan.

# Design

A flag naming a movement, a workout template or a session takes an id, an exact title, or a substring matching exactly one row.

A write reaches its page type through that page type's create or patch core, and the command supplies the flags, the vocabulary check, the title and the derived numbering.

The catalog a command picks movements from is synced from somebody else's dataset, and the rows Alan wrote by hand are marked so the sync leaves them alone.
