---
id: 506a75da-1190-53e4-a79e-356f3d17b964
slug: orphan-stoplights-formula-still-live
page-type-slug: finding
title: "Superseded stoplights formula still live"
domain-slug: domain/global
---

# Claim

A superseded `stoplights` formula is still live on the `daily-tracking` page-type — the file `pages/page-property-definition/daily-tracking-stoplights.page-property-definition.md` — computing a second copy of the six value circles. It was superseded by #13637, when the circles moved to `@shared/status-bar-access`. Two independent renderings of one ladder stand, and only one has a test, a reviewer or a package. It is not orphaned: a saved view draws the column.

# Evidence

Found 2026-08-07 from a 2026-07-28 reading. Corrected 2026-08-28.

The property stands at `pages/page-property-definition/daily-tracking-stoplights.page-property-definition.md`, id `b06cf496-89e1-5ff9-939e-254e7d870f60`, `key: stoplights`, `defined-on-slug: page-type/daily-tracking`. Its `expression:` concatenates six circle ladders over `prop(faith-level)` through `prop(wealth-level)`.

The claim that nothing reads it is false and is struck. No code reads it: the uuid appears in no file, and every `stoplights` hit in TypeScript is either the VSCode slot discriminator at `editor-extension/src/features/status-bar/slots.ts:75,86,97` or a points-source kind at `tools/lib/daily-tracking/points-source-engine.ts:75,129,261`. But a page reads it. `pages/view/tracking-value-points.view.md:21,30` lists `stoplights` under both `visible-properties` and `always-show-properties`, so that saved view draws it as a column, and draws it even where it is empty. `pages/view/tracking-value-levels.view.md:39` names it under `hidden-properties-order`.

Why the uuid search missed it, which is the part worth carrying: a view names a property by its **key**, never by its id. A search for a property definition uuid finds only code addressing it by id, and finds no view at all. Any search asking whether a property is read must look for the key too.

The second rendering is real: `shared/status-bar-access/src/stoplights.ts` re-exports `readouts/daily-stoplights.ts`, which computes the circles itself rather than reading this property.

The file stem still reads `orphan`, left alone because a finding is keyed by its stem.

Not measured: whether the two ladders currently agree.
