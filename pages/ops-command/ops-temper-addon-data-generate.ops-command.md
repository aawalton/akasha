---
id: fa8360b0-8bfb-5614-ba1f-cd286287c02d
page-type-slug: ops-command
title: "Ops temper addon-data generate"
slug: ops-temper-addon-data-generate
domain-parent-slug: domain/ops-temper-addon-data
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/addon-data/generate.ts
path: temper addon-data generate
irreversible: false
---

# Definition

- **Ops temper addon-data generate** — the data files Temper's packages and addons carry, emitted from the pages that hold their source.

# Design

The files this emits are untracked, and the checkout it writes them into is named rather than assumed.

# Help

Read every page type these generators are sourced from, emit the data files the Temper
packages and addons carry, and check the hand-written equipment mappings still agree.

The generators stand here; the tree they write into is the code repository's. Nothing
they emit is tracked by this repository, and a generated file is untracked, so what
reads a repository at a commit sees the producer rather than its output.

Game data these generators compare against stands only in the code repository and is
reached through `tools/lib/code-import.ts`, so the checkout named below settles both
what is read and what is written.
