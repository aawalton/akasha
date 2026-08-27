---
id: 69be1b5e-e08b-58c9-a434-db74498a9945
page-type-slug: finding
title: "The tick reads every save, which the page type says never happens"
domain-slug: page-type/idle-game
---

# Claim

`pages/page-type/idle-game.md` says the save is read once when the game opens, and never read again. A second reader stands: the idle tick worker loads every save through `loadAllSavesServiceRole` on a fifteen-minute cadence, banks progress against each, and writes it back, whether or not any player has the game open. Three saves stand, and all three were rewritten within thirty seconds of each other yesterday afternoon.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`,
and against `/var/home/walton/repos/code` on main.

`packages/alanwalton/web/workers/idle-tick.worker.ts:32` sets `TICK_INTERVAL_MS = 900_000`. At
:103 the tick calls `loadAllSavesServiceRole(sb)`, which at
`app/idle/lib/idle-saves.server.ts:15` selects `user_id, save` across the whole table with no
filter, and at :110 it writes each one back through `upsertSave`. Nothing in that path consults
whether a browser has the game open. The other readers are `app/routes/api.load.ts:20` and
`app/routes/api.save.ts:53`, which are the per-session reads the line describes.

`public.idle_saves` held 3 rows when measured: user `9ba554f7-cb18-48bb-a709-ec935a895ca7`
(Alan) at 30 kB, and two others at 21 kB and 19 kB, created 2026-06-25, 2026-06-25 and
2026-07-06. Their `updated_at` values were 2026-08-23 15:53:01, 15:52:47 and 15:52:32 — a
twenty-nine second spread across all three, which is a sweep rather than three people playing.

Not measured: whether the line was written before the tick worker existed; whether the tick is
meant to be understood as part of the server's saved copy rather than a read; and whether any
of the three players has opened the game recently, which the timestamps cannot answer while the
tick rewrites them.
