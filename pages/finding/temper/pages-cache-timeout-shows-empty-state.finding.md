---
id: 6b8bb7eb-caba-58c7-aec2-caf26cb7c8c9
slug: pages-cache-timeout-shows-empty-state
page-type-slug: finding
title: "Pages cache timeout shows empty state"
domain-slug: domain/temper
---

# Claim

On tempereso.com, when a pages-cache slug's readiness check overruns its 4000ms budget the surface degrades to the empty state rather than an error or loading state, and this reproduces on a cold single-route visit for `/inventory` (which fans out into per-chunk caches and misses the deadline up to 16 times in one load), showing a populated account (167.5k rows) as though it holds nothing.

# Evidence

From project #16192 (domain: temper). Found by the #16055 route sweep against https://tempereso.com (read-only live owner identity).

WHAT THE APP REPORTED: navigating completion surfaces, the app POSTed to its own `/api/errors` endpoint: `[pages-cache] slug 'temper-account' readiness overran 4000ms — degrading to the empty state`, same for `temper-character`. This is the app's own denoised judgement, observed at the network layer, so no DOM-absence mechanism can hide it.

WHY IT MATTERS: when the deadline is missed the surface degrades to the empty state. The account in question holds roughly 167.5k rows. The user sees no error and no spinner — they see the interface for having no data: nothing on screen tells them the number they read is false.

INITIAL SCOPING (later corrected): first reproduced only under navigation contention, not from a cold single-route visit to `/completion/u/<uid>` (two cold visits passed clean).

CORRECTION — it reproduces cold, on `/inventory`: three cold single-route samples, err 18 | err 19 | err 18 (fail every time); matched control `/catalog` err 0 cold. The 19 reports name their caches: `temper-inventory-chunk` (x16), `temper-character` (x2), `temper-account` (x1). Rendered result: rootText 216ch across rootEls 9260 — page builds its full structure then fills from caches already degraded to empty. `/inventory` is worst because it fans into per-chunk caches: one 4000ms deadline is missed 16 times in a single load.

REPRODUCE: `bun ops browser-test sweep --url https://tempereso.com --routes-module packages/temper/web/app/routes.ts --only '/inventory'`

WHERE TO LOOK: the `[pages-cache]` readiness path and its 4000ms budget; slugs `temper-account`, `temper-character`, `temper-inventory-chunk`.

The project's title still said "though not from a cold visit" after the correction landed; deliberately left uncorrected on a row already handed over.

NOT FIXED HERE — #16055's product is finding, not repair.
