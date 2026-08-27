---
id: 749aba18-d0ac-4c4a-96df-ca689d0e7aad
slug: health-personas-filter-a-key-no-page-carries
page-type-slug: finding
title: "Health personas filter a key no page carries"
domain-slug: page-type/daily-tracking
---

# Claim

`healthPersonaPopulation` selects personas by a `value` key that no persona page carries, so it matches none of them and the health total throws rather than returning a number.

# Evidence

`packages/alanwalton/daily-tracking/src/health-total-population.ts` filters `p.value === healthValueId`, and `PersonaRowSchema` in `health-total-points.ts` declares `value` optional. Persona pages carry `value-slug` holding a slug: `pages/persona/aine.md` reads `value-slug: wealth` and carries no `value` key. So `p.value` is undefined on every row, the filter returns empty, and `cardioOwner` is undefined where the code goes on to read it. Read on 2026-08-21; the throw is reported rather than run.

This is not only a rename. `resolveValueIdByTitle` hands back a value's uuid, and the field it is compared against now holds a slug, so whatever reads it must resolve "Health" to a slug instead. `engine-total-points` and `totals-report` reach it; the step dalla was repairing does not, which is why `080697e899` fixed the same class in `commit-points` and left this standing. Neither she nor I know what this pass is for, and a blind repair to code computing Alan's points is worse than a named gap.

`resolveValueSlugByTitle` already stands in `value-resolution.ts` at `080697e899` and is the shape a repair wants, so whoever takes this need not write the resolver, only settle what that persona pass is for.
