---
id: 8e5a874e-23b4-51d1-8137-181b0f05d1f1
slug: whole-file-write-silently-reverts-a-project-status
page-type-slug: finding
title: "Whole file write silently reverts a project status"
domain-slug: barred-meaning/project
---

# Claim

A whole-file write to a project document can silently revert its status, because the write carries the entire frontmatter and nothing compares the `status:` it carries against the row. The author composes from a copy read before the row moved, edits a paragraph, and the write reverts the status as a side effect nobody intended and no gate reports. The document is the declaring carrier and the row projects it, so the reverted value is the one a later reader is meant to trust.

# Evidence

It happened twice on 2026-08-13, to #18923 and #18943, and both stood wrong for a day.

Each row was written to `done` — `completedAt` 14:20:18Z and 14:21:33Z. Six minutes later a `memory: write` landed on each document carrying an intended prose correction, and reverted `status: done` to `status: awaiting_lead_verification` alongside it. For #18923 the whole diff was three insertions and three deletions: one was the status line, the other two were the rewritten paragraph the author meant to change.

Both documents already carried a completed verdict at the time — `Verdict: every criterion met. Verified by amy, 2026-08-13` — with every objective box ticked. So the reverted frontmatter contradicted the body of its own document, and nothing read the two against each other.

`ops project census --state disagreeing-status` reports the class and found seven rows across 623 documents. It reports the disagreement and not its direction, so each has to be reconstructed from git history to learn which carrier moved.

A near-third instance was caught the same day only by an unrelated gate: a whole-file write to the document of project #18893 was refused by `read-before-write` for an unrecorded reading, and the re-read revealed the delivering seat had already rewritten the section. Had the reading been on record, the write would have landed and overwritten it.

`ops memory write` gates the text of what it lands. It does not compare the frontmatter it carries against the row that frontmatter projects.
