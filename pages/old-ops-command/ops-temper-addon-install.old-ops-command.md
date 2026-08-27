---
id: 01a03535-be18-7001-8e00-45ea19a38bf5
page-type-slug: old-ops-command
title: "Ops temper addon install"
slug: ops-temper-addon-install
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/install.ts
path: temper addon install
irreversible: true
---

# Definition

- **Ops temper addon install** — one built addon, put into this workstation's live ESO AddOns folder.

# Design

An addon folder carrying no build marker was installed by something other than Temper, and is never deleted to make room.

The extra Lua files a manifest names are written by the game, and are carried across the replacement rather than overwritten.

Nothing installed leaves this machine.

# Help

Replace one addon's folder — and each sibling folder its manifest declares — under this workstation's live ESO `AddOns/` directory with what stands in a checkout's `temper/addons/dist/`, then verify every installed file against its source by sha256, then run the saved-variables migrations the new build needs.

Nothing is packed and nothing is carried off this machine: the target is the game folder on this disk, so this is workstation tooling rather than anything a deploy carries.

A folder carrying no `build-id.lua` was installed by something other than Temper. It is left alone where it satisfies every version floor this fleet declares, and refused rather than deleted where it does not, or where its version cannot be read at all — refusing to destroy somebody else's addon on missing evidence.

The extra Lua files a manifest names are host or runtime files the game writes, so they are carried across the replacement rather than overwritten.
