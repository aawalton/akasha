---
id: 94549073-6a79-54e3-b38f-28458e3d6128
page-type-slug: finding
title: "Stage two warrant doubles itself"
domain-slug: barred-meaning/project
---

# Claim

A stage 2 warrant on the build tasks says one thing twice: "Behaviour past what they demand is speculation" and "no criterion on the project asked for it" are one claim from two sides. It stands identically on four of the six `domains/tasks/projects/` documents, so trimming it on one buys a few words and pays in divergence. It is a horizontal change or nothing.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-child-commit.md` on 2026-08-07, which named the shape of the change and declined to make it from one subject.

Verified myself: `grep -c "Behaviour past what they demand is speculation" domains/tasks/projects/*.md` returns 1 on build-child-commit, build-child-deploy, build-singleton-commit and build-singleton-deploy, and 0 on build-parent-commit and build-parent-deploy. Four, not the three reported.

That the two parent documents do NOT carry it is the part worth weighing before any trim: whatever the parent tasks say in its place may already be the better wording, or may be a gap.
