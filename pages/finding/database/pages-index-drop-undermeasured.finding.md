---
id: 56cbf46a-54ba-5e85-8384-13fcd7f64fb9
page-type-slug: finding
title: "Pages index drop undermeasured"
domain-slug: domain/database
---

# Claim

`#15679`'s justification for dropping an index on `public.pages` — a one-shot `pg_stat_user_indexes.idx_scan` reading over a 19-minute window with no `stats_since` cross-check — used a measurement pattern since shown unsound: cumulative stats are per-instance and do not survive a CNPG failover, `pg_stat_database.stats_reset` reads NULL through a genuine reset, and #16105 showed a 16 kB index registering one scan in 13.4 hours, well below a 19-minute floor.

# Evidence

Captured by aranya 2026-07-26 ~02:30Z; surfaced by #16105's worker while establishing a CNPG failover had voided aranya's own measurement window.

`#15679` dropped an index on `public.pages` (table every domain entity lives in). Justification (`packages/shared/status-bar-access/CLAUDE.md:37`): "a windowed `pg_stat_user_indexes.idx_scan` check showed zero probes in the ~19 min after #15675 fully deployed" — a one-shot read, 19-minute window, whichever instance was primary, no `stats_since` cross-check, no caveat recorded.

Why now rejected, three things established that same night: (1) cumulative stats are per-instance and do not survive a CNPG failover — a failover at 2026-07-25T12:39:21Z wiped a window aranya had measured 30 min earlier on both instances, so a failover/restart near #15679's 19 minutes would make its zero measure counter age, not index use. (2) `pg_stat_database.stats_reset` reads NULL through a genuine reset — entries drop and recreate zeroed rather than stamped, so the obvious check reassures wrongly; `pg_stat_bgwriter.stats_reset` is the honest one. (3) #16105 widened the control to all 25 `pages` indexes over 13.4 hours and found a 16 kB index register exactly ONE scan — 19 minutes is far below that floor.

Not wrong, just under-evidenced.

A re-check, not a revert. First read #15679/#15675's reasoning for a structural argument independent of the counter (closes cheaply if found). Only if the case rested on the zero: find the query shape and check `EXPLAIN` on it; check `pg_stat_bgwriter.stats_reset` per instance plus the CNPG operator log for a failover/restart near the window.

Earns a row because the pattern is known unsound and was applied once unnoticed; `.claude/docs/performance.md:41` still points agents at cumulative counters with no reset/instance caveat. #16105 fixes the instrument; this checks the decision made on the broken one.

Captured and never defined; moved off the row's retired `notes` attribute on 2026-08-15.
