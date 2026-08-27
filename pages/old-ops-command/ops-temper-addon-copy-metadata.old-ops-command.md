---
id: 01a03535-be18-7000-8913-01e15d7b5b6f
page-type-slug: old-ops-command
title: "Ops temper addon copy metadata"
slug: ops-temper-addon-copy-metadata
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/copy-metadata.ts
path: temper addon copy-metadata
irreversible: false
---

# Definition

- **Ops temper addon copy metadata** — one addon's non-Lua files, copied into an akasha checkout's addon dist tree.

# Design

An addon whose named XML file is absent gets an empty one, because the game reads a named file rather than an optional one.

A declared sibling folder that is not there is refused rather than skipped.

An XML file the manifest names with a `$(...)` token is left uncopied: the game expands the token as it loads, so no file of that name is on disk, and every file the token stands for is declared as an asset.

# Help

Write one addon's load order, then copy every non-Lua file it ships — its `<name>.xml` and `Bindings.xml`, the extra Lua files its manifest names, every directory under `metadata/`, its declared assets and bundle XML, and each sibling addon folder — into that checkout's `temper/addons/dist/`.

Everything written is build output, untracked, and this is the rule it is made by; it stands here, where no deploy has to carry it. The checkout is taken as an argument rather than derived from this file's own location, so the output lands in the tree it belongs to whichever checkout this runs from.

An addon whose `<name>.xml` or `Bindings.xml` is absent gets an empty one written, because ESO reads a named file rather than an optional one. A declared sibling folder that is not there is refused rather than skipped.
