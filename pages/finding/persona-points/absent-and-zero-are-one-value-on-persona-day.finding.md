---
id: 6c88c218-73c9-5e7e-8bf9-a25f681ce494
page-type-slug: finding
title: "Absent and zero are one value on persona day"
slug: absent-and-zero-are-one-value-on-persona-day
domain-slug: domain/persona-points
---

# Claim

On `persona-day`, a value never recorded and a value recorded as zero are the same value. Of 2,032 pages, `strength-volume` is absent on 1,969, `active-calories` on 2,015 and `breathing-points` on 1,972. The deriver reads an absent number as 0 in arithmetic, so `points` answers 0 rather than nothing on 1,422 pages. Nothing tells a day with no strength training from a day nobody recorded.

# Evidence

Measured 2026-08-28 against the working tree, over all 2,032 `persona-day` pages, reading each stored key through `pages-system/store/held.ts` under the type its property definition declares.

How many pages hold nothing under each input to `points`: `strength-volume` 1,969; `sleep-points` 1,969; `cardio-points` 2,015; `nutrition-points` 1,971; `task-points` 1,956; `breathing-points` 1,972; `active-calories` 2,015. Every one of the seven is absent on more than 96 per cent of pages. `green-day-points` is absent on none.

The mechanism is the arithmetic of the old evaluator. `tools/lib/page-expression.ts` answers 0 for an absent operand: run over `a + b / 10` with `b` absent it answers the value of `a` alone, and over `a * b` it answers 0. So `prop(strength-volume) / 7` answers 0 where nothing is recorded, and the sum of seven such terms answers 0 rather than absent.

What the derived values then read: `strength-points` is 0 on 2,018 of 2,032 pages, `source-points` 0 on 1,438, and `points` 0 on 1,422. A reader of those numbers cannot recover which pages recorded a zero and which recorded nothing.

This is a state of the data rather than a consequence of any change. It was found while checking a rewrite of these formulas into the newer formula language, whose arithmetic answers absent for an absent operand. The rewrite carries the old meaning forward deliberately, spelling the coercion as `({strength-volume} ?? 0) / 7`, so that the cutover alters no value; that makes the coercion visible in the formula rather than removing it.

Not measured: whether any page recording a genuine zero exists that a reader needs to tell from an unrecorded one, and what a reader of `points` does with the difference.
