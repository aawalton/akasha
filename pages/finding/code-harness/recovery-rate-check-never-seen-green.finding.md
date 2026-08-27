---
id: 8dd2a8cf-418b-53ba-966e-fc9e66523ec8
page-type-slug: finding
title: "Recovery rate check never seen green"
domain-slug: domain/global
---

# Claim

`check-recovery-rate-notes-coverage` has never been observed running green in CI, and the repair that was supposed to make it possible has already landed and closed.

# Evidence

#18905 gave CI the books corpus so this check could read Alan's recovery-rate notes instead of failing on an absence. Three of its four criteria were met and verified. The second was not, and could not be: the check fires only off three `watchNodes` in TypeScript files that #18905 did not touch, so it was correctly absent from every pipeline that project ran — 27907, 27909, 27911.

What was proved instead is adjacent rather than the thing: on pipeline 27911 `alanwalton-daily-tracking-recompute-points` read the corpus through `booksRoot()` inside a step pod with zero skip lines, running a `git log -p` scan over it. In a step pod `$HOME/books` cannot exist, so that resolved through `BOOKS_ROOT`. A harder read than the check's, but not the check.

#18824 edits one of those three watchNodes, which is how it met this defect in the first place, so its pipeline is the one that exercises the repair end to end. One condition on that: the preparation step comes from the pipeline's own checkout, so a branch predating `bac54c8791` gets `BOOKS_ROOT` naming a tree nothing acquired and fails on the same ENOENT. `ops project deploy` rebases at its sync phase; a bare `ops project check` on a stale branch does not.

#18905 was closed rather than held open, because a row waiting on another project's pipeline is read by nobody.
