---
id: 361e035d-5c57-52b8-aeca-07ab86d7306a
slug: reference-row-lands-under-boon
page-type-slug: finding
title: "A reference row lands in the boon sidecar whatever parent it names"
domain-slug: domain/page-storage-rows
---

# Claim

`dataHomeFor` keys a sidecar home by target slug alone and keeps the first property it scans, discarding every later one. Thirteen properties target the page type `reference`, so twelve of its thirteen homes are thrown away and `write-row` for a `reference` under an `item`, `song` or `quest` parent lands in the `boon` sidecar instead, answering `ok: true` with nothing said.

# Evidence

Measured 2026-08-20 by running the code, not by reading it.

`tools/lib/page-data-write.ts:37` builds the home map with `if (target === null || on === null || homes.has(target)) continue`. The `homes.has(target)` clause is what discards the later properties, and the map is keyed by target alone, so a page type reachable from several parents collapses to one home.

Thirteen properties in `properties/*.md` declare `target-slug: reference`, defined on `boon`, `carried-memory`, `curse`, `enchantment`, `item`, `legacy`, `quest`, `recipe`, `religion`, `reputation`, `song`, `species` and `title`.

Called directly, `dataHomeFor(resolveRoots(), "reference")` returns `{"parentType":"boon","key":"references"}`. That is the only home the write path can reach.

113 rows of bare `reference` stand today, across seven parent kinds: 95 under `items`, 5 under `species`, 4 under `quests`, 3 under `enchantments`, 3 under `curses`, and 1 each under `titles`, `boons` and `recipes`. Only the single row under `boons` sits where `write-row` would put it.

The distinct `*-reference` page types are unaffected, because each is targeted by exactly one property. Run against `class-reference`, `condition-reference`, `spell-reference`, `skill-reference`, `miracle-reference` and `aspect-reference`, `dataHomeFor` returns the right parent for each.

The same collapse applies to `temper-metric-effect`, targeted by seven properties, and `temper-quality-value`, targeted by three.
