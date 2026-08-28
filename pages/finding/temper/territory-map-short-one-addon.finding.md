---
id: edc1ddba-584e-5be3-9fba-e3cde8e1325b
slug: territory-map-short-one-addon
page-type-slug: finding
title: "Territory map short one addon"
domain-slug: domain/temper
---

# Claim

`packages/temper/addons/territory.map.json` holds 48 nodes where the roster its own note names as its source prints 49. `TemperSales`, at `packages/temper/shared/capture/sales/addon`, has no node. Both ratchets built on the map enumerate from the map, so that addon is outside both instruments rather than failing either, and neither prints anything about a manifest it never enumerated.

# Evidence

Measured in `~/code` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

The map's `addons` array holds 48 entries. `git ls-files 'packages/temper/**/addon.json'` counts 49, and `bun ops temper addon list` prints 49 rows, among them `TemperSales  packages/temper/shared/capture/sales/addon`. No node in the map mentions sales. `packages/temper/shared/capture/sales/addon/addon.json` declares `"name": "TemperSales"`, and the root `package.json#workspaces` declares both `packages/temper/shared/capture/sales/core` and `.../addon`, so the addon is a declared workspace member rather than scratch.

The map's own `note` says `Roster from \`bun ops temper addon list\``. Nothing compares the two: every reader of the file enumerates from it. `check-held-addon-structure.ts:35` and `check-ti-clean-source-zero.ts:37` each open it as `MAP_PATH`, the first filtering to `state: "held"` and the second to `tiClean: true`, and `check-configs-addons-held-territory.ts:35` and `check-configs-addons-ti-clean.ts:37` watch it as `json-file:` dispatch input. An addon with no node is filtered out before either predicate applies.

All 48 nodes carry `state: "held"`; no `frontier` or `untouched` node is left, so the map's shape reads as a captured territory and an addon that never entered it is indistinguishable from one captured and cleaned. 43 of the 48 also carry `tiClean: true`. The drift runs one way only — every node points at a live addon directory — so the correspondence a reader would spot-check by sampling the map passes.
