---
id: e4694f47-cf75-586d-9916-5fbef6832bcd
slug: prose-reading-misses-false-claims
page-type-slug: finding
title: "Prose reading misses false claims"
domain-slug: task/review-instructions
---

# Claim

A reading that only re-reads prose misses the defects worth most. On `define-definition`, 4 of 13 line decisions were false claims rather than surplus prose, every one found by running the machinery the line described, and 3 of the 4 would have read as true to a careful prose-only reading. A line that describes a tool goes false when the tool changes, and nothing about the sentence shows it.

# Evidence

Reported by the review-instructions reading of `domains/tasks/lead/define-definition.md` on 2026-08-07, which listed 60 lines, judged all 60, and landed 15 commits taking the file from 14713 to 14046 bytes.

Two of the four I verified myself rather than taking on report:

`ops instructions governs --file-path domains/tasks/lead/define-definition.md` ends with `tools/document/schemas/task.ts` and `tools/document/schemas/domain.ts`, so the standing claim that the schema set is one "which `governs` never lists" was false against the tool. The reviewer reports commit 3def371d, earlier the same day, fixed that identical false claim in stage 1 and left this copy standing — so the document contradicted both itself and the tool.

`ls domains/roles/*.md | wc -l` returns 13, and `grep -c "the role answerable for"` over those files returns zero non-zero counts. The line had said "fourteen role lines opening 'the role answerable for'".

Not verified by me: the two claims the reviewer settled by dispatching a delegate into a subagent — that `hook-liveness` passes there and names no remedy, and that a subagent does not inherit the seat's read record.

This is an observation about how a reading finds things, filed against the task rather than against any document it read.
