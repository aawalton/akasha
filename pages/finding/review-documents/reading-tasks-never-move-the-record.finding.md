---
id: b36f77f9-4800-51c0-8dcc-952edd20d384
page-type-slug: finding
title: "Reading tasks never move the record"
domain-slug: domain/global
---

# Claim

The two archivist reading tasks never move `reviewed-at`, so a completed reading leaves its subject listed as owed. `review-documents.md` and `review-instructions.md` both say nothing about the key, and no tool writes it — across `tools/` it is only read by `stale-reviews.ts` and validated by the schema and gate. Exactly one task in the corpus instructs the write: `domains/tasks/lead/define-definition.md:70`, which lands the definition "`reviewed-at:` moved to the day you read the file" in one commit.

# Evidence

This replaces a finding I filed earlier in the same pass and had to withdraw. That one claimed nothing writes the key at all. It was wrong, and the way it was wrong is worth recording: I grepped `reviewed-at` across `domains/tasks/`, piped the result through `head`, saw only frontmatter lines, and concluded no task instructs the write. The truncated tail held `define-definition.md:70`. A seat on `domains/tasks/alan-harness/guided-close-read.md` found the line and reported it, which is how the error surfaced.

Re-run without truncation on 2026-08-07, the non-frontmatter hits across `domains/tasks/` are exactly one: `define-definition.md:70`. The tool half stands as originally checked — grepping `REVIEWED_AT|reviewed-at` across `tools/*.ts` returns only reads in `stale-reviews.ts` and validation in `document/schemas/domain.ts` and `gates/document-conforms.ts`.

The consequence still holds and is what matters: a seat running either archivist reading task to completion leaves its subject named by `stale-reviews.ts` with nothing outstanding. Fifteen reviewers in this pass moved the date anyway, each deriving it from the schema comment rather than from its task.

Not measured: whether binding the instruction once, and where, is better than repeating it per task.
