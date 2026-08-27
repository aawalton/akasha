---
id: a4dc29ca-7b5c-59e6-ade6-42e3afa17024
page-type-slug: finding
title: "Editor revive section unread"
domain-slug: page-type/notice
---

# Claim

Nothing in the fleet reads `## editor-revive` from `notices/resume.md`. The editor extension holds the words as a byte copy in a `RESUME_PROMPT` constant and never fetches the notice, so editing that section changes nothing that reaches a seat. Two checks and one refusal are written as though a caller reads it.

# Evidence

Traced independently by the two dispatched `review-instructions` seats reading `refusals/notice-on-row-absent.md` and `refusals/notice-on-row-stamped.md` on 2026-08-12, each from the committed code repository rather than a worktree. The constant is at `packages/agents/vscode-extension/src/features/agent-tree/toggles.ts`, word for word identical to the section.

The migration that would make it fetch is unlanded work on branch `project-18768`.

Not measured: whether that branch is live or abandoned, and whether the section has drifted from the constant since the copy was taken.
