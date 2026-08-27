---
id: 03f49066-b6bd-5051-8532-7d8ba40aef79
slug: idle-persona-card-write-spike
page-type-slug: finding
title: "Idle persona card write spike"
domain-slug: page-type/idle-game
---

# Claim

The fleet page-write rate for `idle-persona-card` stepped from under 200/hr to ~7,000/hr (35x) at 07-24 10:00Z and had not returned to baseline 26 hours later, unexplained by any code landing (nothing landed on main 06:00-11:12Z that day) or by CI resuming (which only explains a co-occurring `step` rise), each write costing 25 index updates on the shared `public.pages` table since it runs 0% HOT updates.

# Evidence

Project #16114, domain `idle-game`, no objective written; text below is its capture, moved off its retired `notes` attribute 2026-08-15.

Hourly `public.events` writes on `table_name='pages'` were flat 8,894-9,806/hr all of 07-23 (`created` 2-5/hr). Then 07-24 09:00Z 9,286 (baseline) -> 10:00Z 11,113 (departure) -> 11:00Z 17,861 -> 12:00Z 20,015 -> 07-25 11:00Z 115,296 (never below ~13,000 since); `created`/hr goes to 500-3,800 sustained.

Attribution at the 10:00Z departure (11,113 total, vs 9,094 baseline): `idle-persona-card` 7,080 (was under 200/hr), `agent` 1,504, `claude-account` 1,175. By 07-25 11:00Z (115,296): `temper-mined-item` 79,000 (mining, elsewhere-owned), `step` 19,237, `idle-persona-card` 6,888, `agent` 5,529.

Ruled out: NOT the cause of the 07-24 estate latency step (root-caused separately as a CNPG failover; see #16117/#16152 findings) — 12 days of `db_query_stats` show 46% more volume at 4.2x better latency on 07-16/17. `step` at 19,237/hr is mostly legitimate: CI resumed 07-24 after a 5-weekday lull.

The defect: `idle-persona-card`'s 35x step, holding 26 hours, is unexplained by CI or any code landing. `public.pages` runs 0% HOT updates (722,617 updates, `n_tup_hot_upd=0`), maintaining all 25 indexes on every write, including a 771MB GIN index (`idx_scan=0`, never scanned); 22x WAL amplification on the mining path; index bytes (2,902MB) exceed heap (1,731MB).

Work items: (1) find what writes `idle-persona-card` and at what cadence; (2) same for `agent` (5,529/hr) and `claude-account` (~1,000/hr); (3) check whether the writes change anything, given #16092 found a `minedAt: Date.now()` pattern defeating the page proc's no-op suppression; (4) only then decide whether cadence or the write is wrong.

Measured by the filer against `public.events`/`db_query_stats`, admin role, 07-25 ~12:10-12:25Z, during #16058. The 0%-HOT/25-index/771MB-GIN figures and the `stats_reset IS NULL` check (`idx_scan=0` means never) are ember's, independently taken.
