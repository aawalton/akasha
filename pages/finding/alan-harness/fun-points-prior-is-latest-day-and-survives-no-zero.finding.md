---
id: b18374f0-d7eb-55c3-8009-f8cb7b8523e5
slug: fun-points-prior-is-latest-day-and-survives-no-zero
page-type-slug: finding
title: "Fun points takes its prior from the latest day and refuses only an absent one"
domain-slug: domain/alan-harness
---

# Claim

`priorSnapshotOf` in the `fun-points` reconciler takes its prior from the latest day that states one, and raises only when no day states one. It has no answer for a day stating zero, so one failed read written down as `completion-snapshot: 0` becomes the next day's baseline and books Alan roughly 448,000 fun points at the next genuine reading.

Nothing has detonated it: no such zero stands in his 121 daily-tracking files. It is filed because the same shape did detonate on the neighbouring key.

# Evidence

Measured on 2026-08-20 by running, in the code repository at commit `32ecc11489`.

`packages/alanwalton/fun-points/src/actions/reconcile-fun-points.ts:99-110`:

    export function priorSnapshotOf(days: readonly DailyDay[], dayStr: string): number {
      const priors = days
        .filter((one) => one.date < dayStr && one.completionSnapshot !== undefined)
        .sort((a, b) => a.date.localeCompare(b.date))
      const last = priors.at(-1)
      if (last?.completionSnapshot === undefined) {
        throw new Error(...)
      }
      return last.completionSnapshot
    }

The filter admits zero, `at(-1)` takes the latest rather than the highest, and the guard tests `undefined` rather than a value that cannot be a real reading. `computePointsSourceDelta` and `computeFunDelta` both then compute `Math.max(0, current - prior)`, so a prior of zero yields the whole cumulative total as one day's gain.

The neighbouring key is what makes this worth filing. `words-read-snapshot` carried a genuine zero on 2026-08-17, 08-18 and 08-19, written by a reader that could not reach its source. Measured against the repaired corpus, a latest-day rule on those three days would have booked 35,501,681 words read in a single day, while the high-water rule `priorHighWater` used by `nova-words-read` returned the correct 35,501,681 and zero points. The two reconcilers do the same arithmetic on different keys and disagree only in which prior they choose, and only one of them survived a zero.

Ran against Alan's live files: `grep -c "^completion-snapshot: 0$"` over `memory:daily-tracking/*.md` returns zero matches across 121 files; the absences are March and April days that predate the metric.

Whether the remedy is a high-water rule, a guard on zero, or a reader that refuses rather than writing one, is a decision this finding does not make. The nova cluster took the third at `packages/alanwalton/nova-words-read/src/aggregate.ts`.
