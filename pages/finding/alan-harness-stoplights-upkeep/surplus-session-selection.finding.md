---
id: f3c3079c-d5a3-586d-baf6-a023cdb50246
slug: surplus-session-selection
page-type-slug: finding
title: "Which sessions the day's surplus counts is the query's selection, not the wake window's"
domain-slug: readout-group/upkeep
---

# Claim

The surplus reading now stands on one computation, and which sessions that computation counts is not the selection the code used to make: it takes the sessions carrying the day's slug, where the code took those whose start fell in the day's wake window. On three of the eight days anyone has measured the two selections give different hours, and on one of them a different colour.

# Evidence

Measured on 2026-08-21, running the code path beside the document path over eight days rather than reasoning about them. Two seats reached the same numbers independently.

```
2026-08-14  code -11.413394  document -13.996728  differ, both black
2026-08-15  code   2.409450  document   3.664678  differ, both green
2026-08-16  code   0.033333  document  -1.221894  differ, green against yellow
2026-08-17  code   5.083333  document   5.083333  match
2026-08-18  code   5.316667  document   5.316667  match
2026-08-19  code   3.983333  document   3.983333  match
2026-08-20  code   6.559764  document   6.559764  match
```

The four matching days were the whole of what anyone had checked before, which is why the difference read as four hundredths of an hour. On 2026-08-16 it moves the drawn circle.

Safety was measured the same way across the same eight days and the two paths agree on every one of them, so this belongs to surplus alone.

The code path is gone as of 32f85fed86 in the code repository, so nothing draws the wake-window selection any more and there is no disagreement standing. Re-measured 2026-08-27: the day-slug selection is the whole of what stands, in `readouts/query/surplus-hours-on-day.page-query.md`, which takes `daily-tracking` pages on `date: is: $date` and sums `surplus-hours`. What remains is the question of which selection is the right one. A day's slug is set when the session is filed; a wake window runs from waking to waking, beginning no earlier than 6am America/New_York. They part company for a session filed under one day that began inside another's window — a late night is the ordinary case.

Nobody has looked before 2026-08-14.
