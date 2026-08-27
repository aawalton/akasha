---
id: 7d333d9f-7265-5d3b-99b5-3c69ce7db338
slug: idle-poll-writes-a-row
page-type-slug: finding
title: "Idle poll writes a row"
domain-slug: domain/global
---

# Claim

The events subscriber poll loop writes a row on nearly every poll, whether or not there was work. In the 12:00Z hour on 2026-08-15, 39 subscribers — 37 of them idle — drove 301,855 event fetches and 238,198 UPDATEs of the 39-row `event_subscribers` table, against 16,453 events actually written. That is about eighteen polls and fourteen row writes per event produced.

# Evidence

Measured 2026-08-15 13:45Z, read-only, from `db_query_stats`, `event_subscribers` and `events`.

THE HOUR, from `db_query_stats` grouped by hour. Event fetches, subscriber writes, commits:

    09:00     62,552     44,441     136,940
    10:00     63,776     45,472     138,195
    11:00    165,298    116,684     341,273
    12:00    301,855    238,198     626,850

`public.events` took 5,773 rows in the 09:00 hour and 16,453 in the 12:00 hour. So a threefold rise in real work drew a fivefold rise in polling, and the ratio of writes to fetches held at about 0.79 throughout — the loop does not distinguish a poll that found something from one that did not.

THE SUBSCRIBERS. 39 rows: 37 `idle`, 2 `active`, none in `error`, and `error is not null` returns zero. So the write is not error reporting. The statement is `UPDATE public.event_subscribers SET updated_at = now(), error = $2 WHERE subscriber_name = ...`, and the table carries a `set_updated_at` trigger besides.

WHAT IT COSTS. Each poll is a BEGIN, three selects and an UPDATE, then a COMMIT: 626,850 commits in the 12:00 hour against 16,453 events. Every UPDATE is a new row version on a 39-row table, so that table is rewritten about 6,100 times over per hour at this rate, with the WAL and the vacuum load that implies.

WHAT IT DID. Commit rate rose from 97/s at 10:43Z to 804/s at 12:43Z, and twelve unrelated query fingerprints crossed the plan-drift threshold between 11:55Z and 13:18Z. `blks_read` stayed near zero and node CPU pressure was 0.059, so this is contention rather than resource exhaustion.

NOT ESTABLISHED. Whether the poll interval tightens under load or the worker population grew; only the subscriber rows were read, not the processes polling them. What tripled event production at 12:00. Whether the `error = $2` write is unconditional in the worker or only looks so at this granularity — the code was not read.
