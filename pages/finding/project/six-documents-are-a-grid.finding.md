---
id: f2065d8e-e5ea-5f9f-aba9-7e459174d8f0
page-type-slug: finding
title: "Six documents are a grid"
domain-slug: barred-meaning/project
---

# Claim

The six project task documents are a grid rather than six authored files: parent, child and singleton against deploy and commit. `build-parent-deploy` shares stages with `build-parent-commit` on one axis and with `build-singleton-deploy` on the other, and one invariant stands word for word in all six. None of the copies is the original the others derive from, which is what Single Authority names. The repair is to hoist the shared claims onto `domains/project.md`, which all six readers inherit.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-parent-deploy.md` on 2026-08-07 as the largest thing that reading found, and independently measured by the `build-singleton-commit` reading the same day. Neither could land it: hoisting a claim onto `domains/project.md` is a changed line in a domain's Rules, which Every Changed Line reserves to Alan.

The sharing named: `Order`, `Dispatch`, `Verify`, `Build` and `Return` between the two parents; `Start`, `Run branch CI`, `Hold` and `Deploy` between the two deploy documents; `State` across both deploy siblings; and "The project may turn out not to need doing" in all six.

Three measurements, from three sources:

The singleton-commit reading counted exact sentence matches across `domains/**/*.md`. "A skewed belief reads exactly like a sound one" and "Your context is replaced without warning" stand in all six documents; "Behaviour past what they demand is speculation" in four. Exactly TWO sentences in that document appear nowhere else in the corpus, both in stage 3 — thirty-four of its thirty-six lines are the grid, two are the document.

Mine, on the parent pair: `comm -12` over sorted non-blank lines returns 26 shared, against 33 non-blank in build-parent-commit and 53 in build-parent-deploy.

And the cost, from the run itself: three readings had to land one repair at two or three sites at once — `546132d7` across both parents, and subject 54's three cross-sibling repairs.

Two narrower findings stand on pieces of this: `project/one-invariant-on-six-documents` and `project/stage-two-warrant-doubles-itself`.
