---
id: fa8360b0-8bfb-5614-ba1f-cd286287c02d
page-type-slug: old-ops-command
title: "Ops temper addon-data generate"
slug: ops-temper-addon-data-generate
domain-parent-slug: domain/ops-temper-addon-data
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon-data/generate.ts
path: temper addon-data generate
irreversible: false
---

# Definition

- **Ops temper addon-data generate** — the data files Temper's packages and addons carry, emitted from the pages that hold their source.

# Help

Read every page type these generators are sourced from, emit the data files the Temper
packages and addons carry, and check the hand-written equipment mappings still agree.

The generators and the tree they write into are both akasha. What they emit is tracked
there, so a run changes akasha's working tree, to be read and committed there like any
other.

Game data these generators compare against stands in akasha and is reached through
`tools/lib/temper-addon-data/code-tree.ts`, so the checkout named below settles both
what is read and what is written.
