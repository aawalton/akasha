---
id: 3fb189a9-7c42-58ea-9d2f-44de4a46d764
page-type-slug: page-type
title: "Idle save"
extends-slug: page
files: memory:**/*.idle-save.md
body-shape-slug: empty
slug: idle-save
plural-slug: idle-saves
domain-parent-slug: page-type/idle-game
required-reading-slugs:
  - repo/memory-repo
---

# Definition

- **Idle save** — where one player's idle game stands.

# Design

A player has one save, replaced whole on every write.

The tick banks every save on its own cadence, whether or not the player is present.
