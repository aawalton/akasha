---
id: 1318a846-6215-5711-b3b9-2894217baecb
page-type-slug: finding
title: "Persona total points not monotonic"
domain-slug: domain/alanwalton-app
---

# Claim

Persona `totalPoints` is read as a monotonic counter and is not one. Since 2026-07-01, 1,682 of 5,872 writes to it move it backwards, and 1,543 of those cut it by more than half, across 11 personas.

The daily faucet scores a day as today's total minus yesterday's snapshot, floored at zero. So a collapse scores that day zero, and the rebound scores the whole recovery onto whichever day restores it. Both days show a plausible number and nothing raises an error.

# Evidence

Measured 2026-08-09 against the live database, while checking a separate question on #17556.

**The reader's assumption.** `packages/alanwalton/daily-tracking/src/persona-day-faucet-delta.ts` states its contract: write `faucetPoints` = this total minus the prior day's recorded total, floored at 0, and record `faucetTotalSnapshot` = `currentTotal` so the next day measures against it. `writePersonaDayPointsFromTotal` calls `computeFaucetDelta`, whose floor is the only defence against a decrease — it turns a collapse into a silent zero rather than an error.

**The counter is not monotonic.** Over `public.page_versions` where `page_type_slug = 'persona'`, `'totalPoints' = any(keys)`, `patch ? 'totalPoints'`, and `last_written_at >= '2026-07-01'`: 5,872 writes; 1,682 with new < old; 1,543 with new < old/2; 11 distinct personas going backwards.

Instances read off `old_values` and `patch` on single version rows: Athena 953 -> 16,505,006, and 16,523,330 -> 954 on another write. Astra 279 -> 10,823,325. Ember 285 -> 3,241,181, then back to 285. Awen 111 -> 2,700,776. Amy 144,461.9595 -> 106,886.9035. These are recomputations from a different basis, written over the old value in both directions.

**Why nothing reports it.** The floor turns every decrease into a legal-looking `faucetPoints: 0`, and the rebound into a legal-looking large delta later. `relationship-progress` rows carry no version history at all — `page_versions` holds zero rows for that page type — so there is no record of what the faucet wrote when.

**Not established.** How many days carry a wrong `faucetPoints`, and which write path produces the collapses. The figures above are the frequency of the backwards write, not a count of corrupted days.

**Against #17556.** That row covers scheduled rules resolving a day from their firing instant, and its instance 2 is this same faucet crossing the 06:00 New York reset. This is a different defect on the same code and does not wait on it.
