---
id: 01a03515-58b3-7000-956e-6c9096825d6c
page-type-slug: old-ops-command
title: "Ops eso generate colon methods"
slug: ops-eso-generate-colon-methods
domain-parent-slug: domain/ops-eso
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/eso/generate-colon-methods.ts
path: eso generate-colon-methods
irreversible: false
---

# Definition

- **Ops eso generate colon methods** — akasha's base-game colon-method name authority, rebuilt from the ESO UI source clone.

# Design

A clone holding no colon-method fails the run rather than writing an empty authority.

# Help

Scan every Lua file under the ESO UI source clone for the methods it defines on a class, and write
the distinct names into akasha as one sorted authority.

The set is names rather than receivers, which is what the two gates reading it need: one flags a
declaration that drops its receiver where the name is a real base-game method, and the other keeps
such a name from being subtracted out of its reserved set by an addon-local shim.

The written file is a tracked artefact of akasha; this command is the rule it is made
by and stands here, where no deploy has to carry it. The clone is read and never written, and a
clone holding no such method fails the run rather than writing an empty authority, an empty set
reading to every consumer as a clean answer.
