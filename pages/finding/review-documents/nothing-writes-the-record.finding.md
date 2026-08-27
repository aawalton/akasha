---
id: a785a3c5-0bb0-527e-8e67-7faca281fb76
slug: nothing-writes-the-record
page-type-slug: finding
title: "Nothing writes the record"
domain-slug: domain/global
---

# Claim

Nothing writes `reviewed-at:`, so the review sweep never clears its own queue. `review-documents` picks its subjects from `stale-reviews.ts`, which measures characters moved since the commit that wrote that key. Neither `review-documents.md` nor `review-instructions.md` instructs anyone to write it, and no tool does either: across `tools/` the key is only read by `stale-reviews.ts` and validated by the schema and gate. A reviewed document stays listed until an unrelated commit touches the line.

# Evidence

Raised by a review-instructions seat on `domains/instructions-harness.md`, which reported that its own 12-character commit added to the churn keeping its subject on the list.

I verified both halves myself. Grepping `reviewed-at` across `domains/tasks/` returns hits only in each document's own frontmatter — no task instructs writing it. Grepping `REVIEWED_AT|reviewed-at` across `tools/*.ts` returns only reads and validations: the constant's declaration and schema key in `document/schemas/domain.ts`, the refusal wording in `gates/document-conforms.ts`, and six sites in `stale-reviews.ts` that read the value and pickaxe for the commit that introduced it. No write path exists.

This compounds with `pages/finding/instructions-harness/second-review-same-day.finding.md`, which records that a second reading in one day is unrecordable because the record is a day. That finding is about the record being unwritable today; this one is about nothing ever being instructed to write it at all.

Not measured: whether reviewed-at dates have historically moved by hand, by sweep, or as a side effect of some verb I did not find.
