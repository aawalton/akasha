---
id: 87dbf82b-1023-5ce9-9efc-82695161153d
page-type-slug: finding
title: "Persona total points cannot be unwritten"
domain-slug: domain/persona-points
---

# Claim

`properties/persona-total-points.md` states as Intent that "Nothing writes a persona's total, so no two writers can disagree about it". Nothing on the file path can reach that state. The line wants replacing with one naming a single writer rather than none: a persona's total is written by one named writer, so no two can disagree about it.

# Evidence

Measured 2026-08-20, restoring the persona keys after the rows retired at 14:30:10Z.

The document stated `computed: true` and no `expression:`. `computed: true` makes `page-frontmatter.ts:299` refuse any file stating the key, and with no expression `page-derive.ts:288` computes nothing — unwritable and uncomputed at once. `standings.ts:46` and `resolve.ts:114` both `?? 0`, so every persona read level 1, stage "Initiating", with no error and no log. `loadPersonaContexts` run live gave 41 personas at level 1 before, and 16, 11, 10, 1, 3 across levels one to five after. Twenty-five of forty had been rendering below their standing; `abby`, `aine` and `mari` stand at 5 and read as 1.

No aggregate can replace the writers. `ARITY` in `page-expression-function.ts` offers `count`, `max`, `min` and `if`, nothing over a related-page list, and every formula in the corpus is same-page arithmetic. Nor would a sum reproduce the figures: summing `points` over 1,938 `persona-day` files matches the retired total for 22 of 40. `nova` reads 35,501,681 against 15,185,008 summed. Some personas carry `pointsSourceKind: external` and draw from bytes on disk.

Six writers stand: `totals.ts:51`, `engine-total-points.ts:75`, `health-total-points.ts:207`, `session-points-compute.ts:52`, `session-points-totals.ts:110`, `cluster-downtime-points.ts:205`. None is scheduled today.

The forty totals now on the files restore the rows' belief, not a proven truth: six read zero, `elaine` reads none, eighteen disagree with their own days.

Two expression-to-code disagreements, neither with a live instance: `levelForPoints` clamps `Math.max(totalPoints, 0)` where the expression does not, and `standings.ts:46` passes `greenDayPoints ?? undefined`, leaving a stored zero as a zero divisor where `|| 10000` reads it as the default.
