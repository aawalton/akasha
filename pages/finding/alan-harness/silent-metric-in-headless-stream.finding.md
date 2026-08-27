---
id: cdaf5e3f-c334-520d-a8ca-0f85690a0efc
slug: silent-metric-in-headless-stream
page-type-slug: finding
title: "Silent metric in headless stream"
domain-slug: domain/alan-harness
---

# Claim

A headless Shortcuts run that streams several metrics reports a per-metric failure to nobody, so one metric going permanently silent is indistinguishable from that metric having nothing to send. Nothing in the estate reports the difference, and the store reads clean.

# Evidence

`StreamHealthSamplesIntent` streams `activeEnergy` and `stepCount` independently and returns one line per metric — `could not be read from Health`, `nothing new to send`, or `Sent N samples in M batches`. Those three phrasings are the only thing that parts a failed HealthKit read from a genuinely empty one, because HealthKit hides read-authorization state on purpose. A Shortcuts automation returns that line to nobody.

On 2026-08-09 Alan's run posted 192 `stepCount` samples and zero `activeEnergy` samples. Apple Health held 3.6, 515 and 1.8 kcal for 08-07, 08-08 and 08-09, and Health > Sharing > Apps grants both metrics, so the calories existed and were readable and did not arrive. `public.health_samples` records this as an absence, which is exactly what a quiet day looks like.

Nothing reported it. It surfaced because Alan said he had been active the day before and asked whether the calories had come in. Two wrong readings were argued from the same clean-looking store first — an unworn Watch, then a refused permission — and both were retired only by figures he read off his phone by hand.

#18148 was opened on this failure: "a headless Shortcuts run returns its result to nobody, which is how six days of silent failure went unnoticed" on #17551. The row was cut to end that class and reproduces it one layer down — the run recovers its DATA through an anchor, and reports its DIAGNOSIS nowhere.
