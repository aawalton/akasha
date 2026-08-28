---
id: 14bb9b61-d8d8-53d9-997f-3b01cc74bc44
slug: task-recurrence-rules-are-on-rows-and-on-no-file
page-type-slug: finding
title: "Temper task recurrence rules are on rows and on no file"
domain-slug: domain/temper
---

# Claim

`rrule` is carried by 21 live `temper-task` rows and by 1,369 `temper-completed-task` rows, and by no file and no property document. `temper-task` was soft-deleted at 14:52:55 on 2026-08-20. The value is not only a schedule: it is a JSON object carrying `anchorFromCompletion`, which decides whether the next occurrence counts from the due date or from when Alan actually finished. Once the rows are hard-deleted, 21 recurring tasks lose both their cadence and that flag, and nothing reports it.

# Evidence

Measured 2026-08-20 against `DATABASE_ADHOC_URL` and the live query service, after `temper-task` was retired mid-audit.

`page-types/temper-task.md` declares `files: memory:temper/tasks/*.md`. `grep -rl '^rrule:' memory/temper/` returns 0 files. `properties/temper-task-rrule.md` does not exist. Reading all 24 `temper-task` pages through the service returns no `rrule` key on any of them; 14 other row keys do survive on the files.

The same check on the four types retired alongside it clears them: `temper-account.completion` 1 row / 1 sidecar, `temper-character.completion` 24 / 24, `temper-inventory-chunk.data` 4 / 10, `temper-task.progress` 13 / 13 — all `large:` sidecars that the read path hides unless the query names the key, so they read as absent through a plain query and are in fact intact.

The 21 rules standing on rows at retirement:

- FREQ=DAILY — Cadwell's Almanac, Companion Quests, Crafting Writs, Dragonguard Daily Quests, Folium Discognitum Skill Points, Hireling Mails, Lorebooks, Shalidor's Library, Skill Morphs
- FREQ=DAILY;INTERVAL=1 — Companion Rapport, Dark Brotherhood Skill Line, Legerdemain Skill Line, Thieves Guild Skill Line, Undaunted Skill Line
- FREQ=WEEKLY — Antiquity Leads Legendary, Antiquity Lore
- FREQ=WEEKLY;BYDAY=TU — Antiquity Leads Motifs, Infinite Archive Weekly Leaderboard, Weekly Challenges
- FREQ=WEEKLY;BYDAY=MO — Manage Guild Sales
- FREQ=WEEKLY;INTERVAL=2 — Vateshran Hollows Weekly Leaderboard

All 21 carry `anchorFromCompletion: false`. On `temper-completed-task` the same key spans 1,369 rows, where 743 read FREQ=DAILY and 476 FREQ=DAILY;INTERVAL=1, and one row carries `anchorFromCompletion: true`.
