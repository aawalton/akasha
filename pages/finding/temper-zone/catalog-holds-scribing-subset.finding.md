---
id: d66980e0-6467-5ed6-a273-c47f83993a47
slug: catalog-holds-scribing-subset
page-type-slug: finding
title: "The zone catalog holds only the scribing-script zones"
domain-slug: page-type/temper-zone
---

# Claim

The `temper-zone` catalog holds 23 rows, all of them overland zones that drop scribing scripts, against a zone list ESO numbers in the hundreds.

# Evidence

Counted 23 files in `memory:pages/temper-zone/`. Every one carries `drops-scripts` — 22 true, Gold Coast alone false — which is the set the scribing generator needed, and `packages/temper/scripts/src/generate-addon-data/writes/scribing.ts` is the only consumer of `zonePages` besides the row-total log.

Measured against a table already in the repo. The 112 `temper-guild-trader` rows name 40 zones in their titles. Twenty of those have no zone row at all: Alik'r Desert, Auridon, Bal Foyen, Bangkorai, Betnikh, Bleakrock Isle, Coldharbour, Craglorn, Eastmarch, Fargrave, Glenumbra, Greenshade, Khenarthi's Roost, Malabal Tor, Reaper's March, Rivenspire, Shadowfen, Stonefalls, Stros M'Kai, The Rift. Three more differ only in spelling from rows that exist — "Galen and Y'ffelon" against Galen, "High Isle and Amenos" against High Isle, "The Gold Coast" against Gold Coast.

No instanced zone is present. Not one dungeon, trial or arena has a row, though the definition covers anything ESO gives a zone id.

Not measured: ESO's own zone list was never enumerated, from the game, its API or a capture. The 40 is only what the kiosk titles happen to name, so it is a lower bound on the gap and not its size. Whether the three spelling variants are the same zone under two names or a zone and its sub-area was not checked against the game either.
