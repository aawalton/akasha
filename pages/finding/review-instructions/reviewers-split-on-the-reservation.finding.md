---
id: 0d5558d7-f15e-5127-aae9-a5fab68fa792
slug: reviewers-split-on-the-reservation
page-type-slug: finding
title: "Reviewers split on the reservation"
domain-slug: task/review-instructions
---

# Claim

Reviewers dispatched in one pass split on whether Every Changed Line lets them land anything. Four seats on 2026-08-07 read it as reserving the whole body of a domain document and landed only the frontmatter date; a fifth read the same rule and landed a Definition cut and a Rules cut unattended. Same rule, same day, same task, opposite acts — so the ambiguity is live rather than theoretical.

# Evidence

Observed by the dispatcher of a review-documents pass on 2026-08-07, across the first five readings.

The four: `domains/agent-governance.md` (commit e99b4d2e), `domains/alignment.md` (413df868), `domains/arousal.md` (929ee553) and `domains/file-kinds/tests.md` (259d463f) each landed one commit moving `reviewed-at` and nothing else. Three of the four stated the reasoning in their hand-backs, and two cited the contrast with Responsibility Change on `domains/role-responsibilities.md`, which carves out "a cut a dispatched review lands" where `domains/domain.md` carves out nothing.

The fifth: `domains/folders/all-about-alan.md` landed 5dd76e8 cutting a clause from the Definition bullet and 00d93d8 cutting a false clause from the Voice rule's warrant, then named the missing carve-out in its own hand-back as an adjacent observation — so it saw the same conflict and resolved it the other way.

Nothing released the rule for any of the five. I dispatched all five identically and said nothing to any of them about what to decide.

Not confined to this pass. The reviewer of `domains/global.md` reported an earlier run under its own seat name landing 7954b3bf on 2026-08-06 at 23:30, a cut to the Parsimony description — a Principles section — with `git show 4075f33f6` dating the rule's current wording to 06:42 that morning and a predecessor binding the same act before it. That run's report does not mention the rule.

`land-versus-show-alan.md` here and `changed-line-review-exception.md` on `domain` record the conflict. Neither carries what the split costs: the corpus is edited unevenly by seats with identical authority.

Not measured: whether the body cuts were good ones. I did not re-run the two git commands above; they are the reviewer's.
