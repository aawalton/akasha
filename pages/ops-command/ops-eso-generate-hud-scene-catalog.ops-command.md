---
id: ba61b842-5e23-595e-bc2a-f6284b33265c
page-type-slug: ops-command
title: "Ops eso generate hud scene catalog"
slug: ops-eso-generate-hud-scene-catalog
domain-parent-slug: domain/ops-eso
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/eso/generate-hud-scene-catalog.ts
path: eso generate-hud-scene-catalog
irreversible: false
---

# Definition

- **Ops eso generate hud scene catalog** — the code repository's HUD scene component catalog, rebuilt from the ESO UI source clone.

# Design

What counts as a component and what shape a record takes stay in the code repository, and are loaded from the checkout this writes into.

A component ESO parents to GuiRoot and creates at runtime is outside a single-file source walk, and so outside this catalog.

A scene source naming no component fails the run rather than writing an empty catalog.

The emitted file carries a header naming this invocation.

# Help

Walk the ESO UI source file that declares the main gameplay scene, take one record for each
distinct UI component it names, and write them into the code repository as the catalog its
HUD packages read.

The rules for what counts as a component and what shape a record takes are domain logic a
deploy carries, so they stay in the code repository and are loaded from the checkout named
below. The catalog is therefore made by the rules of the tree it lands in.

The written file is a tracked artefact of the code repository; this command is the rule it is
made by and stands here, where no deploy has to carry it. The output path is taken from that
same checkout rather than from this file's own location.

Components ESO parents to GuiRoot and creates at runtime are outside a single-file source walk
and so outside this catalog.
