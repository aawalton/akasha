---
id: c11025f6-2fa3-51b2-b66b-f9673499faf2
slug: estate-load-nonlinear-event-subscriber
page-type-slug: finding
title: "Estate load nonlinear event subscriber"
domain-slug: domain/database
---

# Claim

On 2026-07-25 the database estate ran above its trailing-7d p99 for roughly 90 minutes, driven mostly by event-subscriber traffic and, within that, disproportionately by one query fingerprint whose per-call buffer cost was growing rather than merely its call volume; this was a sustained load level rather than an incident, and the mechanism was not fully established.

# Evidence

Source: project #16058 (domain: `database`), `someday_maybe`, `live-on: deploy`. No objective — captured, never defined; from capture notes, retired from `notes` 2026-08-15. Captured by aranya 2026-07-25 ~10:35Z from three simultaneous query alerts sharing one cause; owned vera (throughput), alert-infra half stayed aranya on #14741.

**Measured.** Estate above trailing-7d p99 (1,272,084 calls/10-min) for ~90 min: 09:00 1,056,753/0.781ms; 09:40 1,227,291/**1.346ms**; 10:20 1,429,208/1.454ms. Across the 09:40 knee calls rose ~15%, mean rose ~85% — non-linear.

Trailing 60 min: 8,132,917 calls, 39.7% (a floor) matching event-subscriber traffic, ~3.2M/hour; all 12 non-idle backends sampled at 10:31Z were event-subscriber, mostly idle-in-transaction.

The lag-probe fingerprint (`-471781220136581281`) did genuinely more work: buffers/call over 12h rose from single digits to 2,597, mean 0.06ms -> 26.89ms, `shared_blks_read = 0` throughout — a cached CPU scan, growing row count, not I/O.

**Inferred, not established:** the probe is a ratchet costing more as the table grows (no EXPLAIN run); event-subscriber load caused the step, not merely its largest part (one-sample). **Not known:** whether this continues the estate step open from 2026-07-24 (37.2M -> 71.4M calls/day); an 8-day aggregate hit `statement_timeout`, untried.

**Why it matters:** three alerts fired at one 10:29:31Z snapshot from this cause — pages `SELECT *` (drift 6.6x, buffers flat), temper `INSERT` (waiting not working), the lag probe (drift 13.6x, buffers grew 3.3x, the only one doing more work). Two of three were false alarms — a ratio threshold under shared latency fires on whichever cheap fingerprint crosses (#14741).

**Not an incident:** 1.45ms/call healthy, no blocking, no degradation. **Addendum (10:38Z):** onset correlates with ember's M1 fleet land event at 09:41:13Z vs onset ~09:40Z, called correlation not cause; re-confirmed from `db_query_stats` — the knee is real and non-linear.
