---
id: ecb40d33-ca0e-5a63-94f8-5c8fff7a4cea
page-type-slug: finding
title: "Progression target ignores set age"
domain-slug: domain/fitness
---

# Claim

The exercise digest's per-movement progression target is computed from the best set alone, with no term for how old that set is, so a 42-day-old personal best carries the same "beat best" instruction as one from three days ago.

# Evidence

Measured 2026-08-07. A quarantined document reported this on 2026-07-28 against a 32-day gap; I re-ran it here rather than carrying its figures.

`ops exercise digest --focus pull` today returns, among others:

    Bent Over Two-Dumbbell Row  last 30×17 (2026-06-26)  best 30×17 (2026-06-26)  target 30 × 18 (beat best 30×17)
    One-Arm Dumbbell Row        last 30×30 (2026-06-26)  best 30×30 (2026-06-26)  target 30 × 31 (beat best 30×30)
    Hammer Curls                last 15×12 (2026-06-26)  best 15×15 (2026-06-23)  target 15 × 16 (beat best 15×15)

Those sets are 42 and 45 days old. The same sheet reads `pull  2026-07-03` under `# last trained by focus`, and its `# last session` line shows that session was Cat Stretch, Pushups, Bodyweight Reverse Lunge, Single Leg Glute Bridge and Hamstring Stretch — no dumbbell pulling at all. So the true gap in the movements above is six weeks, and the instruction beside each is still "beat your best".

`progressionTarget` at `packages/collections/exercises/src/tracking/digest-model.ts:13-17` is the whole of it:

    export function progressionTarget(best: SetLine | null): string | null {
      if (best === null || best.weight === null) return null
      const reps = best.reps ?? 0
      return `${best.weight} × ${reps + 1} (beat best ${best.weight}×${reps})`
    }

It reads `best.weight` and `best.reps` and nothing else. This is not missing data: `SetLine` is declared at `packages/collections/exercises/src/tracking/history-core.ts:8` and carries `date`, which `history-core.unit.test.ts:5` shows in the field list. The field is present at the call site and unread. `grep -c "best.date" packages/collections/exercises/src/tracking/digest-model.ts` returns 0.

The date is printed on the same line, so a reader who checks it catches this. That is the shape of the problem: the correction rests on the reader noticing rather than on the instrument.

Not established: whether a staleness term was considered and rejected, nor what form a remedy should take.
