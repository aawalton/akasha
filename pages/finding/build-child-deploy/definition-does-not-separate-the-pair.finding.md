---
id: 3b9ee616-a584-5c16-a323-8b453e484dda
page-type-slug: finding
title: "Definition does not separate the pair"
domain-slug: domain/global
---

# Claim

`build-child-deploy`'s Definition does not separate it from its sibling. It reads "building one child project's change alongside its siblings", which is equally true of `build-child-commit` — those children also have siblings and share a tree — and the word the slug turns on, `deploy`, is absent. `domains/roles/developer.md` already draws the line correctly in its task guidance.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which did not land it: this document is a domain, Every Changed Line reserves a domain's Definition for Alan, and nothing released the rule for that work.

The wording it proposed, recorded here so the change can be judged rather than re-derived: "**Build child deploy** — building one child project's change, live when the parent deploys the tree." It reports that at 74 characters against the schema's SM, and notes it mirrors the sibling's "live as each commit lands" so the pair reads as one fork.

This is the fourth finding this run standing behind Every Changed Line with no escalation route open to the seat filing it. The others are `review-initiative/definition-misses-stage-five`, `project/one-invariant-on-six-documents`, and `define-definition/slug-narrower-than-the-task`.
