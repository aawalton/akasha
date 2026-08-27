---
id: 3f13bbcd-4370-52f0-93dc-e926cda02eb4
page-type-slug: finding
title: "Eso day wrong after spring forward"
domain-slug: domain/code-quality
---

# Claim

`getEsoDayStr` returns the day before last for the hour between 00:00 and 01:00 on the morning after spring-forward, so every consumer of the ESO logical day resolves that hour to the wrong date once a year.

# Evidence

`packages/shared/recurrence/src/reset-times.ts:115-128`. Before 06:00 New York local the function steps back a fixed `MS_PER_DAY` in UTC and recomputes the offset. Its own comment says this "handles transition days". It does not: the local day after spring-forward is 23 hours long, so subtracting 24 UTC hours from an instant early in it lands in the day before that.

Measured 2026-08-06 by calling the exported function directly. US spring-forward in 2026 is 2026-03-08.

- `2026-03-09T04:30:00Z`, which is 00:30 EDT on the 9th, returns `2026-03-07`. The ESO day containing that instant is `2026-03-08`.
- `2026-03-09T05:30:00Z`, 01:30 EDT, returns `2026-03-08`. Correct.
- `2026-03-09T10:30:00Z`, 06:30 EDT, returns `2026-03-09`. Correct.
- `2026-03-10T04:30:00Z`, 00:30 EDT the following day, returns `2026-03-09`. Correct.

So the defect is exactly one hour wide, once a year, and everything either side of it is right — which is why nothing has caught it. A reading taken in that hour is attributed to a day two back, and the day it belonged to gets nothing.

Routed here by #17551's developer rather than fixed, and re-measured here before filing rather than taken on the report. It reaches every consumer of the ESO logical day in the estate, which is why it is filed rather than repaired inside one project: the fix is a behaviour change to a shared function, and which consumers depend on the current behaviour was not established.

The Swift side is already correct. `EsoLogicalDay.day(_:offsetBy:)`, landed on main by #17551 at `90ec87e`, steps by calendar day rather than by a fixed interval, so the two implementations of one rule now disagree for that hour. That divergence is the second reason to hold this: `getEsoDayStr` is the shape the Swift was written to mirror, and it is the one that is wrong.

It did not affect #17551. Alan's automation fires at 4:05 Mountain, which is 06:05 New York, outside the window on both sides of the transition.
