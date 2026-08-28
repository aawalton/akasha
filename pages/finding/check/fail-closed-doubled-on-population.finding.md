---
id: 2b3796a9-7069-5b85-b10f-1ebdf96f0767
slug: fail-closed-doubled-on-population
page-type-slug: finding
title: "Fail Closed and Population both bind the could-not-look failure for checks"
domain-slug: domain/old-check
---

# Claim

`Fail Closed` on `domains/check.md` reads "Fail a check that could not run." `Population` on `domains/instrument.md` reads "State the population size where an instrument reports, and fail where it could not look at one." A check is a kind of instrument, so for any check that could not run, both directives bind the same failure from two documents. They are not identical — an instrument can run and still have no population — but the check case sits inside both, which is the shape `Single Authority` names.

# Evidence

Found on 2026-08-20 by a run converting the nine directives on `domains/check.md` to the four-line form, and confirmed afterwards by reading both acts as they now stand rather than taking the report for it. `domains/check.md` defines a check as an instrument run on a provisional change, so every check is an instrument and inherits what `domains/instrument.md` binds. The overlap is one-directional and partial: a check that could not run also could not look at a population, so `Population` already reaches it, while an instrument that ran but found nothing to look at is reached by `Population` alone and by no directive on `check.md`. The run reported this and deliberately changed nothing, because resolving it means editing a directive nobody dispatched. Both stand. Whoever rules on it is choosing which of the two documents should carry the could-not-look claim, not merely deleting a duplicate — dropping the clause from `Population` would leave the non-check case unbound, and dropping `Fail Closed` would leave checks relying on a directive written about instruments generally.
