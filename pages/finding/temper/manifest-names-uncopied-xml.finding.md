---
id: 0a3a5b9a-fe7b-55d8-abd3-b0af623a2f10
slug: manifest-names-uncopied-xml
page-type-slug: finding
title: "Manifest names uncopied xml"
domain-slug: domain/temper
---

# Claim

The built `TemperCollections` addon ships a manifest naming an XML file the package does not contain: `Browser.xml` is listed in `TemperCollections.txt`, but no `Browser.xml` is written into `dist/TemperCollections/`.

# Evidence

Observed in worktree `/home/walton/worktrees/18484` against a built `packages/temper/addons/dist`, while verifying project #18397.

- `packages/temper/game/collections/addon/addon.json` line 31 declares `"afterBundle": ["LoreBooks.xml", "LostTreasure.xml", "Browser.xml"]`.
- `Browser.xml` is absent from that file's `assets` list, so the build copies it nowhere.
- The built `packages/temper/addons/dist/TemperCollections/TemperCollections.txt` names `Browser.xml` at line 15.
- `packages/temper/addons/dist/TemperCollections/` contains `LoreBooks.xml` and `LostTreasure.xml` and no `Browser.xml`.

The two sibling XML files declared beside it are both present, so the manifest half of the declaration is honoured and the copy half is not.

A side effect, rather than the defect: three `SI_ITEMBROWSER_*` string ids consumed by that missing XML sit outside the population `addon-sandbox-load` judges, since the gate reads the XML the build emitted. The bundle registers all three at top level, so nothing is unregistered today.

Filed rather than repaired: it was found while rendering a verdict on #18397, whose criteria do not reach addon packaging, and repairing it there would have been the verifying seat doing the work it was judging.
