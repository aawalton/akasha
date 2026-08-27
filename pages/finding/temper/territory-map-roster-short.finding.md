---
id: 9f520df4-8bdc-575e-a06a-f5d7bd9c8e09
slug: territory-map-roster-short
page-type-slug: finding
title: "Territory map roster short"
domain-slug: domain/946
---

# Claim

`tools/lib/check-workflow/territory-map.json` has fallen out of correspondence with the
addon roster it declares itself derived from. `TemperSales`
(`temper/shared-capture-sales-addon`) stands on the roster `bun ops temper
addon list` prints and has no node in the map, so it sits outside both ratchets the map
parameterises and nothing reports its absence.

# Evidence

The map's own `note` field states where its nodes come from: "Roster from `bun ops
temper addon list`."

Run on 2026-08-07 against `~/code` at `383bf60d35`, that command prints 49 addons. The
map holds 48 `"addon":` nodes. Sorting both name lists and diffing them leaves exactly
one line: `TemperSales`, on the roster and absent from the map. Its package directory
exists at `temper/shared-capture-sales-addon`, carrying `addon.json`,
`package.json`, `src` and `tsconfig.json`, so this is a live addon rather than a stale
roster row.

Every other node in the map reads `"state": "held"` — 48 of 48, with no `frontier` and
no `untouched` node — so `TemperSales` is not simply the next unclaimed territory; it
is the one addon the map does not mention at all.

Nothing enforces the correspondence. Grepping the code repo for readers of the map
returns `held-addon-structure.ts`, `ti-clean-source-zero.ts`, their two `check-*`
entries, and the two config shims under `tools/lib/check-workflow/`. Each of those
enumerates the map's own nodes and filters them — `check-held-addon-structure` over
`state: "held"`, `check-ti-clean-source-zero` over `tiClean: true`. Neither walks the
roster, so an addon with no node is not a violation of either; it is simply never
scanned. Both checks stay green while the addon they omit is held by nothing.
