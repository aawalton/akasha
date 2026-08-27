---
id: 66916e49-c4b1-5873-94a4-ec850fc272d3
page-type-slug: finding
title: "Serial dispatch makes precedent"
domain-slug: domain/global
---

# Claim

Serial dispatch lets a later reviewer infer authority from an earlier reviewer's commits. `review-documents` step 2 sends subjects sharing a governor one at a time, so each reviewer boots after its predecessors have pushed. One did exactly this: the seat on `domains/seat-attribute.md` settled whether Every Changed Line permitted its edit by reading the log — a reverted rewrite against two clause cuts that stood — and derived "a cut is admitted, a rewrite is Alan's" from the pattern.

# Evidence

Observed 2026-08-07 during a review-documents pass. The seat reported its reasoning in those terms, citing 5b34510d and its revert fec0404f against 27c052bc and bbd23cd9.

The conclusion it reached matches what `domains/role-responsibilities.md` actually spells out for its own section, so in this instance the inference landed on the right rule. That is what makes it worth recording rather than reassuring: the seat had no document granting it, and reached a defensible rule from four commits by seats with no more authority than its own.

Step 3 of the task tells the dispatcher to say nothing about what a reviewer should decide, which keeps the dispatcher out of it. Nothing keeps the git log out of it.

Not measured: how many of the other reviewers in this pass read the log before deciding. Only this one reported doing so. This is a property of serial dispatch, which the task requires wherever subjects share a governor — and in this corpus every subject shares one, so the whole pass is serial.
