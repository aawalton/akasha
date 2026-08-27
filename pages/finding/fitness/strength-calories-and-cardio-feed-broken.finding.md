---
id: 8e17cf83-b988-5f89-9c5a-30540d88d982
slug: strength-calories-and-cardio-feed-broken
page-type-slug: finding
title: "Strength calories and cardio feed broken"
domain-slug: domain/fitness
---

# Claim

Fitness has no strength-calorie computation anywhere in the exercise domain — `strengthPoints = strengthVolume / 7` is a decoy sitting where it would be — and its cardio-calorie HealthKit feed is broken by an unfloored rounding guard and a dead ingest relay. Alan authorized merging both into one active-calories ledger owned by `fitness`, since he wears no watch while lifting, making the two sources genuinely disjoint in the data.

# Evidence

Project #17350, domain `fitness`.

Alan's end state, 2026-07-30: (1) strength and cardio calories sum to active calories; (2) both the Aelwyn and Activity stoplights measure active calories; (3) cardio calories integrate automatically daily from HealthKit; (4) strength calories update when a set is added, not just at workout end.

His rulings: cross-domain and authorized — "part of the alan harness guiding me in whether to exercise" — `fitness`'s two ledgers (`pillarsOwnedBy("aelwyn")` = `strengthVolume`, `activeCalories`); coaching/programme/catalogue stay `fitness`'s. One strength-calorie scale everywhere. `strengthVolume` retained; only its energy-proxy use retires. Delivered whole, no early split — no value while broken.

Correction: "The cardio points does not include the strength points, I don't wear my watch while lifting" — HealthKit's active-energy figure is cardio-only, so summing is meaningful, not double-counting.

Ground truth, same date: zero energy calculations anywhere in the exercise domain. Decoy: `strengthPoints = strengthVolume / 7`, commented "calorie-equivalent at ~7 lb/cal", actually a re-denomination with no duration, intensity, rest or bodyweight term. Real-estimate inputs are captured (reps, weight, RPE, duration, activity type, session start/end, bodyweight, load factor), but duration is only printed, never stored.

Cardio feed: the App Intent's only minimum is `kcal >= 0.5`; server rounding has none of its own, so 0.5–1.49 stores 1, 1.5–2.49 stores 2. Observed: `activeCalories` = 1 on 07-27, 2 on 07-25, nothing since 07-02. The intent sums the ESO day in progress (06:00 NY to 06:00 next day), so firing near the boundary captures only its first minutes, and the later correcting firing never happens. Writers overwrite, so a tiny value destroys a day like a zero would. `cardio-ingest.timer` is active, 3x daily; `cardio-ingest.service` is failed, exit 3; every fire returned `nofile` — zero writes ever, a 22-day gap.
