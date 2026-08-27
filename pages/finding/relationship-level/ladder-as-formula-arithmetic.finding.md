---
id: 8f22f581-b7b7-5255-8228-1dbb0aac27e2
slug: ladder-as-formula-arithmetic
page-type-slug: finding
title: "Ladder as formula arithmetic"
domain-slug: domain/relationship-level
---

# Claim

The relationship-level ladder is spelled as arithmetic inside three live `persona` page-type formulas, in a different encoding from the one the code repository holds, and nothing compares the two.

# Evidence

Read off the live `persona` page-type row on 2026-08-12.

The three formulas are files now, and each still carries the arithmetic below, re-spelled `prop(total-points)` and `prop(green-day-points)`: `pages/page-property-definition/persona-green-day-total.page-property-definition.md`, `persona-level.page-property-definition.md` and `persona-percent-progress.page-property-definition.md`.

`greenDayTotal` is `totalPoints / (greenDayPoints || 10000)`.

`level` is `(totalPoints >= 769*(greenDayPoints||10000)) && 5 || (totalPoints >= 229*(greenDayPoints||10000)) && 4 || (totalPoints >= 49*(greenDayPoints||10000)) && 3 || (totalPoints >= 7*(greenDayPoints||10000)) && 2 || 1`.

`percentProgress` spells those same four thresholds and, beside them, the step widths 540, 180, 42 and 7.

`GREEN_BASELINE_DAYS` in `packages/alanwalton/personas/core/src/ladder.ts` — today `alan/persona/closeness/closeness.ts:81` — is `[7, 42, 180, 540]`. Those are the STEPS. The formulas hold the RUNNING SUMS of the same ladder: 7, 49, 229, 769. So one ladder stands in two encodings, and neither is derivable from the other by reading — a reader checking whether they agree has to do the arithmetic by hand.

`DEFAULT_GREEN_DAY_POINTS` is `10_000` in the same file, and `10000` appears eighteen times across the three expression strings above. It is no longer in the same file: it stands at `readouts/ring/ladder/ladder.ts:17`, which `closeness.ts:1` imports. `10000` now appears 16 times across the three expressions — once in `green-day-total`, 4 times in `level`, 11 times in `percent-progress`.

A projection can carry four numbers into a row. It cannot carry a hand-written arithmetic expression, and generating those expression strings from a declaration would put a value Alan sets behind a code generator rather than in front of him.
