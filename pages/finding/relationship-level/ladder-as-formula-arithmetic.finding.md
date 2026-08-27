---
id: 8f22f581-b7b7-5255-8228-1dbb0aac27e2
page-type-slug: finding
title: "Ladder as formula arithmetic"
domain-slug: domain/relationship-level
---

# Claim

The relationship-level ladder is spelled as arithmetic inside three live `persona` page-type formulas, in a different encoding from the one the code repository holds, and nothing compares the two.

# Evidence

Read off the live `persona` page-type row on 2026-08-12.

`greenDayTotal` is `totalPoints / (greenDayPoints || 10000)`.

`level` is `(totalPoints >= 769*(greenDayPoints||10000)) && 5 || (totalPoints >= 229*(greenDayPoints||10000)) && 4 || (totalPoints >= 49*(greenDayPoints||10000)) && 3 || (totalPoints >= 7*(greenDayPoints||10000)) && 2 || 1`.

`percentProgress` spells those same four thresholds and, beside them, the step widths 540, 180, 42 and 7.

`GREEN_BASELINE_DAYS` in `packages/alanwalton/personas/core/src/ladder.ts` is `[7, 42, 180, 540]`. Those are the STEPS. The formulas hold the RUNNING SUMS of the same ladder: 7, 49, 229, 769. So one ladder stands in two encodings, and neither is derivable from the other by reading — a reader checking whether they agree has to do the arithmetic by hand.

`DEFAULT_GREEN_DAY_POINTS` is `10_000` in the same file, and `10000` appears eighteen times across the three expression strings above.

A projection can carry four numbers into a row. It cannot carry a hand-written arithmetic expression, and generating those expression strings from a declaration would put a value Alan sets behind a code generator rather than in front of him.
