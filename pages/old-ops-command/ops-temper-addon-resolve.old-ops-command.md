---
id: 5dcd5844-0a3e-51a4-8082-bcb822ab4fe0
page-type-slug: old-ops-command
title: "Ops temper addon resolve"
slug: ops-temper-addon-resolve
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/resolve.ts
path: temper addon resolve
---

# Definition

- **Ops temper addon resolve** — one addon's source directory and canonical name, found by any of the three names it goes by.

# Help

Resolve a single addon by name to its source dir and canonical addon.json#name.

Accepts a canonical name (e.g. `TemperInventory`), the flat-layout dir leaf (e.g. `companions`), or, for nested addons, the parent domain name (e.g. `inventory`). Prints the matched AddonInfo as JSON. Exits 2 (data error) when the name matches no discovered addon.
