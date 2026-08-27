---
id: 01a03515-58d3-7000-9df8-47f8f4d775cd
page-type-slug: old-ops-command
title: "Ops eso generate base game globals"
slug: ops-eso-generate-base-game-globals
domain-parent-slug: domain/ops-eso
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/eso/generate-base-game-globals.ts
path: eso generate-base-game-globals
irreversible: false
---

# Definition

- **Ops eso generate base game globals** — akasha's base-game global-name authority, rebuilt from the ESO UI source clone.

# Design

A string id is declared rather than assigned, so it is found by mention and not by the assignment scan.

A clone holding no global fails the run rather than writing an empty authority.

# Help

Scan every Lua file under the ESO UI source clone for the top-level global assignments that match
ESO's own naming convention, union every string id the source mentions, and write the result into
akasha as one sorted authority two addon gates read.

A string id is declared rather than assigned, so an assignment scan alone reaches only part of the
set and the mention scan is what finds the rest. Both go into the same authority, because both
gates are asking the same question of a name: does the base game provide this, or does the addon.

The written file is a tracked artefact of akasha; this command is the rule it is made
by and stands here, where no deploy has to carry it. The clone is read and never written, and a
clone holding no global fails the run rather than writing an empty authority, an empty set reading
to every consumer as a clean answer.
