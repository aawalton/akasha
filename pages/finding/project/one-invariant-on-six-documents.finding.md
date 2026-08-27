---
id: 7b359acf-9ee6-5f1c-bd80-44140d15a454
page-type-slug: finding
title: "One invariant on six documents"
domain-slug: barred-meaning/project
---

# Claim

One invariant stands near word-for-word on all six `domains/tasks/projects/` documents: "The project may turn out not to need doing." The one place it would stand singly is `domains/project.md`, which all six inherit — and moving it there is a change to a domain's Rules, which Every Changed Line reserves to Alan. Cutting it from any one document alone would strip the claim from that task while five siblings keep it.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-child-commit.md` on 2026-08-07, which kept the line for exactly that reason.

Verified myself, and my count corrects the report's: `grep -c "may turn out not to need doing" domains/tasks/projects/*.md` returns 1 on each of SIX files — build-child-commit, build-child-deploy, build-parent-commit, build-parent-deploy, build-singleton-commit and build-singleton-deploy. The reviewer said four.

So the consolidation is worth more than reported and the obstacle is the same: it is a Rules change on a domain, and no dispatched reading can land one.

This is the third finding this run standing behind Every Changed Line with no escalation route open to the seat filing it.
