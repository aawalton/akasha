---
id: 35d46126-8944-5220-8bdd-ee07c03ad226
page-type-slug: domain
title: "Ops temper addon"
slug: ops-temper-addon
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper addon** — the commands that work on the addons Temper writes, in akasha rather than in the game.

# Design

No command here takes a roster. Each walks the repository for the flat layout and the nested one alike, so an addon added to either is found without a list being edited.

What `list` and `resolve` answer with is the addon's canonical name and its repo-relative source directory, which is what the commands elsewhere in this tree join on.
