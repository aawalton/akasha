---
id: 088443df-e909-5093-b7d5-115ff5571e5a
slug: eppie-value-disagrees-between-file-and-row
page-type-slug: finding
title: "Eppie's value disagrees between her file and her row"
domain-slug: page-type/persona
---

# Claim

Eppie stands under `learn` on her file and under `Fun` on her row, and the two have disagreed since before the file-backed migration touched either. Retiring the `persona` row destroys the only surviving witness that the file may be wrong, so which value she stands under has to be settled while both readings still exist. This is a fact about whose part of Alan's life Eppie personifies, not a technical reconciliation, and the evidence points at the row rather than the file.

# Evidence

Read on 2026-08-20 from `~/repos/instructions` on `main` and from the live database.

`domains/personas/eppie.md` states `id: 019ee19d-d6e5-7ed5-b1ad-27ffe6f34987`, `slug: eppie`, `value-slug: learn`, `championed-domain-slug: performance-arts`, `role-slug: companion`.

The row carries the same id, `019ee19d-d6e5-7ed5-b1ad-27ffe6f34987`, and `value: 019eb7d1-01be-7a20-b8e8-05008697aea9`, which is the `Fun` value page. `Learn` is `019eb7d1-0072-7909-a9a7-6fa76806f067`. The row world agrees with itself twice: `Fun`'s `personas` mirror also lists Eppie's id, so both halves of the mirrored relation say Fun. Only the file says learn, in one place.

The drift is older than the key rename and was not caused by it. `git show 27a509e3b -- domains/personas/eppie.md` is exactly `-value: learn` / `+value-slug: learn` — that commit, "page-property-type: persona-value takes the relation-slug suffix as value-slug" of 2026-08-16, renamed the key across 42 files and preserved every value. The file already said `learn` before it ran.

Three things point at Fun rather than learn. Eppie owns the `performance-arts` domain. Her points source, `domains/persona-points-sources/eppie-points-source.md`, is `kind: windowed` with `marker: song-listen`. And "Performance Arts" was itself a value page, `019f04f8-d3cb-7cf9-b2f1-92a8e26e9878`, now soft-deleted, which `Fun` still lists in its `childValues`.

Eppie is the only one of the 40 shared personas whose value disagrees. The other 39 match exactly, and all 40 match on id.

NOT ESTABLISHED: which reading Alan intends. `File First` formally gives it to the file, but that principle assumes an authored file rather than a mis-derived one, and nothing recovers when the row's two agreeing halves are gone.
