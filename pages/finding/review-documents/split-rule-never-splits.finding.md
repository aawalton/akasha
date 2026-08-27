---
id: a169018b-0f0b-5332-b177-2cfa6b48756f
page-type-slug: finding
title: "Split rule never splits"
domain-slug: domain/global
---

# Claim

`tasks/archivist/review-perimeter.md` tells its seat to serialise the subjects sharing a governor and dispatch the rest together. No two perimeter documents fail to share one, so the second half names an empty set on every pass and the whole owed set serialises.

# Evidence

`domains/global.md` carries `instructions-path: "**"` and `folders/instructions-repo.md` governs the whole checkout, so both stand over every document in the tree. `ops instructions governs --file-path <p>` asked of each of the 48 subjects owed a reading on 2026-08-04 returned `domains/global.md`, `domains/agent-harness.md` and `folders/instructions-repo.md` in all 48 answers.

Every pair of subjects therefore shares at least three governors, and the pass dispatched all 48 one at a time. The `governs` call the stage opens with decides nothing either: its answer is the same for any two paths in the tree, so no reading of it can send two subjects out together.
