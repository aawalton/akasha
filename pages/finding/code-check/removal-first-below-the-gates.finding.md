---
id: 763f8dc4-0aa8-5f6b-869d-a7caa60ceebf
slug: removal-first-below-the-gates
page-type-slug: finding
title: "Removal first below the gates"
domain-slug: domain/global
---

# Claim

`Removal First` sits on `old-check`, and nothing in it is specific to that domain. `old-gate` and `old-check` are siblings under `instrument-kind`, so the gates never inherit it.

# Evidence

The domains moved into akasha and both took an `old-` prefix; re-measured there on 2026-08-27, on `main`.

`pages/domain/old-check.domain.md:39` carries the principle `Removal First`, whose warrant is "No check is faster or more correct than one that is not there, and a repair is always available."

`pages/page-type/old-gate.page-type.md:10` declares `domain-parent-slug: domain/instrument-kind`. `pages/domain/old-check.domain.md:6` declares the same parent. So the two are siblings and neither inherits from the other. Two gate pages stand under it, `pages/old-gate/relations-resolve.old-gate.md` and `pages/old-gate/typecheck.old-gate.md`.

Nothing in the principle's wording is specific to the check side of that pair.

Raising it to `pages/domain/instrument-kind.domain.md` would reach the gates. It would also grow what every reader of a Principles section under `instrument-kind` pays at boot, which is the judgment no instrument settles.

Raised by the `review-instructions` reading of `domains/check.md` on 2026-08-06, as one of three forks that reading returned rather than settled.
