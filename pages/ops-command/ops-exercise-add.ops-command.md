---
id: 638723a2-c6de-5910-8c4b-6508b0d972da
page-type-slug: ops-command
title: "Ops exercise add"
slug: ops-exercise-add
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/exercise/add.ts
path: exercise add
---

# Definition

- **Ops exercise add** — creating one hand-authored catalog exercise with source aelwyn-custom, classified and slugged.

# Help

Add a custom exercise to the catalog — the ergonomic one-liner alternative to a raw page create for movements the free-exercise-db sync does not cover. Writes an `exercise` page with source="aelwyn-custom". Select / multi-select flags accept either the human label or the slug id (case-insensitive) and are validated against the catalog vocabulary. `--load-factor` (default 0) and `--implement-count` (default 1) are always written so the volume math never hits a silent default. `sync` never touches custom rows (no externalId).
