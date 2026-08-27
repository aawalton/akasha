---
id: 54b16a0c-93d2-56ac-acad-af2092dfd50e
slug: cardio-relay-never-produced
page-type-slug: finding
title: "Cardio relay never produced"
domain-slug: domain/fitness
---

# Claim

The cardio pillar's Active Energy relay has never once produced a file, so `activeCalories` is blank on every day the journal covers, and the downstream arithmetic renders that blank as the zero a genuine rest day produces.

# Evidence

Measured 2026-08-07 on the workstation. A quarantined document reported this on 2026-07-29 against a two-week window; I re-ran it here rather than carrying its figures.

`cardio-ingest.timer` is enabled and firing — `systemctl --user list-timers` shows it next at 14:00 MDT, last at 08:00 MDT today. Its service is `failed`. Over the whole journal retention window, which begins 2026-07-24T08:45:54-06:00, `cardio-ingest.service` started 43 times and exited 3 on 40 of them. Filtering that journal for a write line naming a nonzero count returns nothing: there is no successful ingest on record in the window.

Every failure says the same thing, including this morning's:

    status        nofile
    path        /Users/walton/Library/Mobile Documents/com~apple~CloudDocs/HealthSync/active-energy.json
    cardio-ingest: wrote nothing — no relay file at /Users/walton/Library/Mobile Documents/com~apple~CloudDocs/HealthSync/active-energy.json

The consumer is healthy and reporting accurately. What is absent is the producer — whatever was to write `active-energy.json` into iCloud Drive on the macbook.

What makes the silence total is the pillar's arithmetic, a 1:1 read. `packages/alanwalton/daily-tracking/src/persona-day-points.ts:62` and `health-total-points.ts:21-22` both state `cardioPoints = activeCalories`, and `points` sums it as one additive term beside `sleepPoints`, `strengthPoints`, `nutritionPoints`, `taskPoints`, `breathingPoints` and `faucetPoints`. An absent source contributes 0 and the sum stays well-formed, so an unfed pillar and a day without cardio are the same figure everywhere downstream.

The failure is loud in one place nobody reads: systemd records a failed unit, the verb exits 3, and the message names the missing file precisely. None of that reaches a surface Alan looks at.

Not established: whether the relay ever worked before 2026-07-24, where retention starts, nor whether the producer was removed or never installed.
