---
id: 22932ad0-df03-5101-bde4-f50122360337
page-type-slug: finding
title: "Per source max drops watch day"
domain-slug: domain/alan-harness
---

# Claim

The activity circle's per-source maximum rule discards a whole day of Watch samples whenever Fitbod writes one larger workout lump for the same day, and Fitbod rather than Alan's iPhone is the second live active-energy source. Both project documents in the tree that built the rule record it as unexercised in production against two sources; it has in fact been exercising against Fitbod on many days.

# Evidence

`activeCaloriesFromSamples` sums per `source_name` and returns the maximum across sources, never the total. Its own comment states the cost as a partially worn Watch, where the phone's coverage of the unworn hours is discarded. The case measured below is that arithmetic with a different and larger shape.

Run against the live database on 2026-08-09 over Alan's wake day, with the stored-scalar fallback pinned to null so every figure comes from `public.health_samples`:

- 2026-04-11: Watch 1122.250 kcal over 535 rows, Fitbod 208.778 over 1 row. The read returns 1122.250. A naive total would be 1331.0.
- 2026-03-23: Watch 210.479 kcal over 280 rows, Fitbod 539.651 over 1 row. The read returns 539.651. A naive total would be 750.1.
- 2026-03-24: Watch 504.421 kcal over 159 rows, Fitbod 242.834 over 1 row. The read returns 504.421. A naive total would be 747.3.

The rule picks the larger source correctly in both directions, and on each day it prevents an inflation of between 208 and 243 kcal. That much is the rule working.

2026-03-23 is the case worth looking at. Fitbod writes ONE sample for a workout, and that single lump of 539.651 kcal beats the Watch's 280 samples spread across the whole day totalling 210.479. Taking the maximum therefore drops every minute of Watch activity outside that workout. The two sources are not measuring the same span at all: one covers a workout, the other covers the day. The undercount is not a partially worn Watch, which is the case the code names; it is a single-workout app eclipsing a full day of continuous recording.

A query for days carrying more than one active-energy source returns Fitbod alongside the Watch on 2026-03-17, 03-18, 03-19, 03-23, 03-24, 03-30, 04-09 and 04-11, so this is a recurring shape rather than one day.

`#18149`'s own note says the rule is "worth refining once real rows show how far the sources diverge". These are those rows. Nothing here judges what the refinement should be.
