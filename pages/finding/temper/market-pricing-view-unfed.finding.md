---
id: dbc3e5ed-52e5-5a50-87f6-9245f249f680
slug: market-pricing-view-unfed
page-type-slug: finding
title: "Temper's market pricing view lost its feed on 11 June and is going with its tables"
domain-slug: domain/temper
---

# Claim

Temper's inventory management showed a player ESO market pricing for their platform, server and price type, read from `temper_market_price_extracts` and fed by a watcher that uploaded pricing snapshots in chunks. Nothing has uploaded since 2026-06-11, so the view has shown nothing for ten weeks. With the four tables torn out, the three watcher upload endpoints answer 410 and a player has no market pricing anywhere in temper.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`,
and against the `change-19458` worktree of the code repository.

Four tables carried the pipeline. `temper_market_pricing_snapshots` held 15 rows, all
`PC`/`NA`, newest `data_timestamp` 2026-06-11 03:32 and newest upload 2026-06-11 04:50; it
measured 26 MB, of which 8 kB was the table and the rest TOAST holding chunked jsonb.
`temper_market_price_extracts` held 3 rows — `crown-consumables`, `currency-items`,
`companion-gear` — every one stamped 2026-06-11 04:50. `temper_market_listings` and
`temper_ttc_listing_cache` held no rows at all.

Nine places touched them: three `/api/watcher/upsert-*` routes, the reading hook at
`packages/temper/player/inventory-management/ui/src/hooks-inventory.ts:154`, the TTC cache
client and its CLI, a watcher extract module and two import scripts. On PC/NA the hook still
answers: the three extract rows match its three price types exactly, so a player on that
platform reads ten-week-old pricing rather than none. Stubbing the hook to `null` is a change
a player can see, not the no-op it looks like.

Not measured: why the watcher stopped on 2026-06-11, and whether it was retired or broke;
how many players ever saw a pricing reading; whether the 15 snapshots would still parse
against the current extract code; and whether anything outside these repositories posts to
the three upload endpoints.
