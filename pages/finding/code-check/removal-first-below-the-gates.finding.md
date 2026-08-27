---
id: 763f8dc4-0aa8-5f6b-869d-a7caa60ceebf
page-type-slug: finding
title: "Removal first below the gates"
domain-slug: domain/global
---

# Claim

`Removal First` sits on `code-check`, and nothing in it is specific to the code repository. `gate` and `code-check` are siblings under `check`, so the thirteen gates never inherit it.

# Evidence

`domains/code-check.md:17` carries the principle `Removal First` — "No check is faster or more correct than one that is not there."

`domains/gate.md:3` declares `domain-parents: check`. `domains/code-check.md:3` declares its parents as a list, also under `check`. So the two are siblings and neither inherits from the other.

Nothing in the principle's wording is code-repo-specific.

Raising it to `domains/check.md` would reach the gates in `tools/gates/`. It would also grow what every reader of a Principles section under `check` pays at boot, which is the judgment no instrument settles.

Raised by the `review-instructions` reading of `domains/check.md` on 2026-08-06, as one of three forks that reading returned rather than settled.
