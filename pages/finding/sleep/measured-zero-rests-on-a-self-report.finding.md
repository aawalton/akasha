---
id: 2eb91436-7ba4-5c22-8b6f-3d674aa12d96
page-type-slug: finding
title: "Measured zero rests on a self report"
domain-slug: domain/sleep
---

# Claim

The sleep pillar's measured-zero discipline rests on a source that cannot support it. `loadDaySleepMinutes` writes an explicit `0` for a day with no linked Sleep block, and the code defends that as distinct from never-measured — but the only source is Amy's time-tracking, captured from what Alan says after waking. The record therefore depends on a man reporting, awake, on a period he was unconscious for, so an explicit `0` asserts a night that did not happen rather than a night nobody logged.

# Evidence

Re-measured 2026-08-07 while emptying `dirty/skills/sleep/findings.md`, which recorded the arrangement on 2026-07-27. That document is queued for removal and its counts are superseded by the ones below.

The convention is declared. `packages/alanwalton/daily-tracking/src/sleep-minutes.ts` says "A day whose row has no linked counting session reads `0` (measured-zero discipline — distinct from never-measured), matching how `loadDayVolume` treats a no-workout day". `sleep-points.ts` repeats it. So the code states the behaviour and defends it; what it does not state is that the analogy to a workout fails, a workout being observable and a night not.

The provenance is declared too, in a live instruction. `domains/tasks/alan-harness/capture-time-tracking.md` defines the task as "capturing Alan's day as named time blocks from what he says", and its Loop carries "Reconstruct a stretch he describes after the fact". Its step 4 already names three sleep cases the code cannot place — an evening nap finishing between 6pm and midnight, fragmented sleep straddling 6pm, and a night he never slept. Neither document joins the two facts.

The measurement, taken today over all 61 of Ione's `relationship-progress` rows, 2026-06-08 to 2026-08-07: sleep minutes above zero on 35 days, exactly zero on 16, no reading at all on 10. Mean of the 35 recorded nights 458 minutes (7.6 h). `~/books/all-about-alan/notes/sleep.md` gives the documented baseline as 9-10 h pre-Vyvanse at low stress and 8-9 h post-Vyvanse at low stress, with natural wake and no alarm — so the recorded mean sits below the lower floor.

It errs upward too. The maximum is 962 minutes, 16 hours, which no natural night reaches; whether that is one row or a legitimate nap-plus-night pair is not established here.
