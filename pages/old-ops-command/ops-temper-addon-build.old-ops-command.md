---
id: efb1963b-b0e3-4960-a4e3-4fc6de3ec851
page-type-slug: old-ops-command
title: "Ops temper addon build"
slug: ops-temper-addon-build
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/build.ts
path: temper addon build
irreversible: false
---

# Definition

- **Ops temper addon build** — a Temper addon compiled to Lua, given its metadata, and installed unless held back.

# Design

This command holds the only statement of where the compiler stands and which of its plugins an addon build applies, so no addon `tsconfig.json` names the compiler at all.

The whole run is bounded rather than each addon, so building the roster is held to the same ceiling as building one.

# Help

Compile one Temper addon, or every one of them, from TypeScript to Lua.

The compiler is a workspace package of the akasha repository, so this command holds the only statement of where it is and which of its plugins an addon build applies. Both plugin paths are handed to the compiler absolute, which is why no addon `tsconfig.json` names the compiler at all.

Each addon is built by emptying its `dist/` folder and every sibling folder its `addon.json` declares, running the compiler over the addon's own `tsconfig.json`, and then copying the metadata that is not compiled — the manifest, the assets and the additional Lua files. The addon is then installed into the live game folder unless --build-only holds it back; the install takes an exclusive lock, so several of these can run at once.

The whole run is bounded rather than each addon, so --all is held to the same ceiling as a single build and a run that stops making progress fails rather than hanging.
