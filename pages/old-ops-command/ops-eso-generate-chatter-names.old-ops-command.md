---
id: d8b57c15-3efb-5df0-831f-1bfab406d3db
page-type-slug: old-ops-command
title: "Ops eso generate chatter names"
slug: ops-eso-generate-chatter-names
domain-parent-slug: domain/ops-eso
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/eso/generate-chatter-names.ts
path: eso generate-chatter-names
irreversible: false
---

# Definition

- **Ops eso generate chatter names** — the quests addon's chatter and interaction constant-name registry, rebuilt from the ESO enums.

# Design

This reads the declarations the ESO typings command emits rather than the ESO UI source clone, so it answers on a workstation holding no clone.

A registry naming no constant of either kind fails the run rather than being written.

The emitted file carries a header naming this invocation.

# Help

Read the ESO enum declarations akasha carries, collect every chatter-option and
interaction constant name declared there, and write the two sorted registries the quests addon
reads at runtime.

The source is the declaration file the ESO typings generator emits, so the registry covers what
those typings opted into and nothing the game declares outside them. Regenerating the typings
first is what widens it.

The written file is a tracked artefact of akasha; this command is the rule it is
made by and stands here, where no deploy has to carry it. Both the file read and the file
written are taken from the checkout named, akasha by default, rather than from this file's own
location.
