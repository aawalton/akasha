---
id: 1de841d1-a10d-560e-99b1-db8097b59fc6
slug: four-row-types-have-no-reader
page-type-slug: finding
title: "Four persona row types have no reader"
domain-slug: page-type/persona
---

# Claim

In persona, four of the database-only page types hanging off a persona have no live writer and no live reader, and 127 live rows stand under them: `relationship-deposit` (8 rows, frozen 2026-07-02), `persona-reward-notification` (74 rows, writer deleted 2026-08-11), `persona-wallpaper-notification` (28 rows, its trigger hardcoded false since 2026-07-01), and `persona-points` (17 rows, last written 2026-07-25). A dead type warrants a deletion rather than a definition and a conversion to files.

# Evidence

Measured 2026-08-19 by read-only query and by grep across both repositories.

`relationship-deposit`, 8 rows: an act of care toward Jennifer, recorded by hand in the title. Its reader `daily-tracking/src/relationship-deposit-points.ts` was deleted at `f3f9740821`, which retargeted Ruby onto measured time with Jen. No writer ever existed as code. `updated_at = created_at` on all 8.

`persona-reward-notification`, 74 rows: a ledger recording that Alan was met by one persona at one rung on one day. Its writer `persona-reward-watcher/src/notification-marker.ts` was deleted at `4ddda64798`, when the daily reward became words rather than pictures. Grep returns one hit, a stale artifact under `dist`. Superseded by `persona-reward-crossing`, holding one row titled "verification, delete me".

`persona-wallpaper-notification`, 28 rows: a marker stopping a persona being told twice that a wallpaper is due. Its writer is reached only through `decideNotifications`, whose first statement returns early on `WALLPAPER_TRIGGER_ENABLED = false` (`persona-reward-watcher.worker.ts:41`, set at `16e744fb47` on the same day the last row landed). Its reader still runs hourly and feeds only that dead decider.

`persona-points`, 17 rows: a persona's own account of what she made in a day; Sophia wrote 15, Aine 2. The ritual stood in a skill file deleted at `2fcda6ac7d`; its only reader went at `a2b4c01d50`. Both carry `pointsSourceKind = manual`, which `parsePointsSourceRecipe` returns null for.

The slug `persona-points` also collides with the domain `domains/persona-points.md` declares.

Not settled: whether the rows are kept as history in files or dropped. `f3f9740821` ruled the deposit rows stay — "real history Alan recorded" — and nothing has ruled on the other three.

Alan ruled these out of the persona conversion on 2026-08-19: they get no page type and no initiative, and their rows are left standing rather than deleted.
