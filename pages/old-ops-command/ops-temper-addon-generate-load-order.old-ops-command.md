---
id: 01a03531-6bf9-7000-b2b8-9a742b8b4432
page-type-slug: old-ops-command
title: "Ops temper addon generate load order"
slug: ops-temper-addon-generate-load-order
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/generate-load-order.ts
path: temper addon generate-load-order
irreversible: false
---

# Definition

- **Ops temper addon generate load order** — one addon's ESO load-order manifest and build-id stamp, written into an akasha checkout.

# Design

The catalog addon takes its API version from the pages system; every other takes it from its own manifest.

An addon declaring no Lua bundle is refused rather than given an empty manifest.

# Help

Read one addon's `addon.json` and `tsconfig.json` out of a checkout, and write `<name>.txt` — the manifest ESO reads to decide what to load and in what order — plus `build-id.lua` into that checkout's `temper/addons/dist/<name>/`.

Both written files are build output, untracked, and this is the rule they are made by; it stands here, where no deploy has to carry it. The checkout is taken as an argument rather than derived from this file's own location, so the output lands in the tree it belongs to whichever checkout this runs from.

`TemperCatalog` alone takes its `## APIVersion:` from the pages system rather than from its `addon.json`, as the lowest version any active catalog domain declares its generator last ran for.

The build id is the first eight hex digits of `CI_COMMIT_SHA` where the environment carries one, and of the addon's own checkout head otherwise.
