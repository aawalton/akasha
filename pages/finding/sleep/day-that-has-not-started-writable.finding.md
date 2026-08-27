---
id: aa3604cc-c380-5eb4-a685-51143a60456d
slug: day-that-has-not-started-writable
page-type-slug: finding
title: "Day that has not started writable"
domain-slug: domain/sleep
---

# Claim

The sleep rollup's write path can create a persona-day row for a calendar day that has not started, carrying a sleep total no session supports, and the row stops being distinguishable from a real one once its date arrives.

# Evidence

`rollupSleepForDay` in `packages/alanwalton/daily-tracking/src/sleep-points.ts` takes a `dayStr` and passes it to `writeSleepPoints`, which forwards to `writePersonaDayPillarField` in `persona-day-points.ts` — whose docblock says it writes the field "on the persona-day row, creating the row when absent", with `createPage` at line 307. Read 2026-08-07: neither file compares the day against the current one. `rg -uuu -n -i "future|hasNotStarted|isFuture"` over both returns one line, a comment about rate changes needing no re-backfill. `rg -uuu -l -i "future-dated|futureDated|day that has not"` over `packages/infra/checks/` returns nothing, so no check reports the state.

The day comes from the session's `dailyTracking` relation rather than wall-clock — `sleep-session-subscriber.ts` says so deliberately, so an early wake lands on the correct day. Sleep is the one Health pillar attributing that way; the others use a fixed 06:00-NY window. That confines the exposure to sleep.

`dirty/skills/sleep/findings.md` recorded the instance, reported by `sophia` 2026-07-29: Ione's `relationship-progress` row dated 2026-07-30, created 2026-07-29 10:10:24Z, `sleepPoints: 1492` (24.9 hours), `greenDayFraction: 3.73`, whose `daily-tracking` parent (#254) had zero linked sessions. All 38 sleep sessions were closed and individually plausible, and 1,492 was the sum of no natural window.

That instance is no longer checkable by shape, which is the point: once the date arrives a phantom row differs from a legitimate one only in its number, and nothing re-derives the number. The detectable window is the interval between creation and the date claimed, so the count of past occurrences is unknown by inspection.
