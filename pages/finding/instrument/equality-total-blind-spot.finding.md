---
id: 61aae0ba-a29b-549c-810b-7ccc474ff597
slug: equality-total-blind-spot
page-type-slug: finding
title: "Equality total blind spot"
domain-slug: domain/instrument
---

# Claim

Whole-repo equality-held totals fail silently and by construction: an instrument comparing a transcribed constant, or a numerator computed against a denominator that has already dropped its own failures, reports a clean 100% while the defect it exists to catch goes undetected.

# Evidence

Project #17169 (status someday_maybe, live-on deploy, domain `code-check`); notes captured 2026-08-15, no objective written.

Class: a whole-repo equality-held total fails silently and by construction wherever the instrument compares a transcribed constant against the true count, or computes a numerator against a denominator that has already dropped its own failures — either shape reports a clean 100% while the defect it exists to catch goes undetected, because the comparison never sees the gap.

A RULING is owed to #17095 and #17108, both prior instances of this shape. Evidence carried from #17095: a transcribed constant drifted from the true count without the check noticing, since the check compared the transcription to itself rather than to a fresh count. Evidence from #17109: a numerator/denominator pair where the denominator had already excluded its own failures, so the ratio read 100% regardless of how many were actually failing.

Bound found: `DECLARED_FAMILY_FLOOR` — a floor value substituted for a live count, carrying the same defect shape: a bound that can go stale in the same direction as the constant in #17095, silently, since nothing re-derives it from the current repo state.

Remedy direction (not yet decided): the fix is not another equality check on top of the existing one, since that repeats the shape; it is deriving both sides of any such comparison fresh from the same walk of the repo, so a gap in one arm cannot be masked by the other arm inheriting it.
