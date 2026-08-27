---
id: 79994c8b-83b1-52fa-b7fe-a5beb5e9c0de
page-type-slug: finding
title: "Landed test reads subjects not patches"
domain-slug: domain/global
---

# Claim

The deploy verb decides whether a branch's content reached main by matching commit subjects, which is right for a merge-queue land and wrong for a re-land, and it fails toward reporting finished work as unlanded.

# Evidence

`ops project deploy --help` states the reasoning for its `the-branch-content-on-main` verdict: reachability would false-negative because the merge queue rebases as it lands, "so containment is tested over commit messages, which survive the cherry-pick verbatim."

That holds for the route it names. It does not hold for a branch whose content reached main by any other route — a re-land, a squash, a hand-applied fix — because none of those preserves the subject.

Measured on 2026-08-05 against `project-17763`, a row parked at `deployment` for 24 hours with 81 commits ahead of main:

- Subject containment over main's last seven days: **0 of 81 present, 81 absent.**
- `git cherry origin/main HEAD`, which compares by patch-id: **all 81 return `-`** — an equivalent change is already upstream.

The branch was finished. Alan's account is that the backlog was resolved while bringing CI back up, and the patch-id reading agrees with him. The row had earned a green branch verdict at `67dcce8` (pipeline 26990) and then stopped, carrying no document, no seat and no recorded commit hashes.

The direction of the failure is what makes it worth filing. A reader who trusts subject containment concludes 81 commits of finished work are unlanded, and the correcting act is to land them again. The lead reading this row nearly did.

The instrument that settles it is already in the estate and already trusted for a decision of the same weight: `ops worktree remove` refuses to delete a branch until patch-id says its commits have equivalents upstream, and its refusal names the comparison outright — "Compared by patch-id, so a cherry-picked land already reads as landed." Two verbs answer the same question about the same branch by different means, and only one of them is right off the merge-queue path.
