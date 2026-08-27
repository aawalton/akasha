---
id: a747b669-1a45-5b24-aff5-01a65bf04247
page-type-slug: finding
title: "Pglite harness cannot supply a retired definition"
domain-slug: domain/global
---

# Claim

The pglite test harness never installs soft-deleted property definitions, so any guard arm matching on a RETIRED definition is unreachable in every `.database.test.ts` in the estate. The arm does not fail — it passes vacuously, and the green is produced by the absence of the input rather than by the logic being right.

# Evidence

THE PREDICATE, READ TODAY. `packages/shared/supabase/test-harness/src/install-from-live.ts:109` filters `.is("deleted_at", null)` when installing live property definitions into pglite. A soft-deleted definition therefore does not exist in any database test's fixture, and no test can drive an arm that matches one.

WHY IT IS WORSE THAN AN ORDINARY COVERAGE GAP. It is silent and inverted. A missing test is absent and countable; this arm is present, exercised by the suite, and passing — on an input the harness cannot supply. A suite reports green over logic no test can reach, and the greenness is a property of the fixture rather than of the code.

THE REMEDY IS ESTATE-WIDE, WHICH IS WHY IT HAS NOT BEEN TAKEN. One predicate in `install-from-live.ts` closes it, and the same edit changes the fixture baseline for every `.database.test.ts` at once, since each would begin seeing rows it has never seen. So the cheap fix is unmeasurable at the end of any single project. The correct local move is hand-seeding a soft-deleted row into the affected fixture, which is what one suite already does — a workaround per site rather than a closure.

WHAT WAS OBSERVED. #16461's declared-key guard, roughly a quarter of whose match logic keys on the retired case, reachable only by hand-seeding.

NOT MEASURED, AND THIS IS THE NUMBER THAT DECIDES IT. How many database tests change behaviour under the corrected predicate. That number is unknown rather than zero, and until someone takes it the estate cannot tell whether the one-line fix is cheap or a sweep.
