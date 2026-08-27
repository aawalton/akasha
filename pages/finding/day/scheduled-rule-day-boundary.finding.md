---
id: 528d0e62-28dd-595b-97f7-856b0ee412a3
slug: scheduled-rule-day-boundary
page-type-slug: finding
title: "Scheduled rule day boundary"
domain-slug: domain/day
---

# Claim

A scheduled rule that resolves "the day" from the instant it fires, rather than covering both sides of the 06:00 America/New_York reset, is correct only on one side of that boundary. The persona delta-faucet is a confirmed live instance: on 12 of 39 measured days a persona's points moved within the day's final hour and were credited to the wrong day. A separate, far larger backwards-totalPoints defect shares the same code path but is not this instance.

# Evidence

Project #17556, domain `day`. Parked at someday_maybe by Alan on 2026-08-09: he read the check below and ruled the estate-wide pass it implies is not what he wants next. Nothing retracted, waiting. Never defined: it carried only a capture, moved here from the row's retired `notes` attribute on 2026-08-15.

The shape: a scheduled rule resolves a day from the instant it fires, correct only on one side of the 06:00 America/New_York reset. The firing instant moves on its own, with DST, travel, or a supervisor restart. Filed 2026-08-02 out of #17551's review; full detail in #17551's Q10 note.

Prior art: `daily-tracking/src/run-commit-points.ts:79` scans `SCAN_DAY_OFFSETS = [-1, 0]` to cover both the ESO day and the prior day. Re-verified 2026-08-09.

Instances, ranked: 1. `inbox-tracking-poll.timer` (`*:0/5` MT ticks exactly at the NY roll, no jitter). 2. Ten persona delta-faucet workers. 3. `alanwalton-daily-tracking.worker.ts` resolves the day three times in one run. 4. `automation-scheduler.worker.ts` exposed at both 06:00 NY and 06:00 Denver. 5. `ts-timezone-violations.ts:33-36` concedes it misses `.split("T")[0]`.

Instance 2 confirmed fired, measured 2026-08-09 over 39 days: faucet ticks land near-stable minutes past the hour, last tick ~45 minutes short of the roll as a standing gap. On 12 of 39 days a persona's `totalPoints` moved inside the day's final hour; on 2026-08-06 five personas moved at 05:51 NY, nine minutes before the roll, credited to the next day. `relationship-progress` rows are not versioned, so the leak is established but not billed to an exact count.

A larger, separately filed defect on the same code path: since 2026-07-01, 1,682 of 5,872 writes to persona `totalPoints` move it backwards, 1,543 cutting it by more than half, across 11 personas; `computeFaucetDelta` floors at zero. NOT this row's scope.

Home: owned by `amy`; re-homing to a code domain's owner is the first act on unpark.
