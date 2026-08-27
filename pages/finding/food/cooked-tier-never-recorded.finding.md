---
id: e45b46de-a11d-536c-ac7d-9b2df28b452d
page-type-slug: finding
title: "Cooked tier never recorded"
domain-slug: domain/global
---

# Claim

`domains/food.md` names how food is cooked as half its subject, and the field that would record it has never once been set to `cooked` — 0 of 68 food rows, with 47 blank. The `preparation` tier exists, permits `cooked`, and is optional on the only path that writes it, so the cooking half of the domain's definition has no observation behind it at all.

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/food/rulings.md`, which reported `preparation` blank on 82% of rows. I re-ran it rather than carrying that figure, and it has moved.

`domains/food.md:10` — "**Food** — what Alan eats and how it is cooked." Two halves, and the second is the one measured here.

The field exists and permits the value. `ops food log --help`: "`preparation` (ate / assembled / cooked) is optional logged EFFORT metadata", and the flag is `[--preparation]`. `packages/collections/food/src/page-types/seed-food.ts:9-11` says the same from the seed side — "`preparation` is the EFFORT tier that funds Natalie's bond (a `select` over `ate` / `assembled` / `cooked`)".

The tally, from `ops page list --type food --properties preparation --all` over all 68 rows:

    47  (blank)
    14  ate
     7  assembled
     0  cooked

So `cooked` is a live, seeded, selectable value that no row has ever carried, and 47 rows say nothing about effort at all. 69% blank today against the 82% the quarantined source recorded — the direction is improving, and the `cooked` count has not moved off zero.

Nothing here is inferred from the blanks. A blank row is silent rather than negative: it does not establish that he did not cook, only that the log does not say. That is the point — the domain's stated arc from eating to cooking has no instrument that has ever registered its far end, so nothing can report whether it has moved.

The two standing findings that quote this definition — `pages/finding/health/fitness-food-seam-in-conduct-only.finding.md` and `pages/finding/food/nutrition-pillar-contradicts-her-voice.finding.md` — both cite the "how it is cooked" half and neither measures it.

Not established: whether the tier should be required on the log path. The source recorded that as Alan's to decide and unasked, and I found nothing showing he has been asked since.
