---
id: 044e3383-5425-55f6-a6a5-f9f38b2e437b
page-type-slug: finding
title: "Resume notice comment false"
domain-slug: domain/global
---

# Claim

`tools/checks/resume-notices.ts` lines 82 to 85, and the test name at line 226, both say a renamed notice section answers `undefined` rather than failing and reaches a seat as a message with no words or a revive carrying nothing. Both halves are false: `supervisor-decide.ts` guards a missing key by hand and fails loudly, and `notices/resume.md` binds the opposite design for a revive. The refusal body they describe was repaired on 2026-08-12; these two were not.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/notice-on-row-absent.md` on 2026-08-12, which cut the same two clauses from the refusal and left these deliberately.

Why it left them: repairing them means saying what is true of the `editor-revive` caller, and that depends on whether `project-18768` lands. The editor extension currently holds the words as a hardcoded constant in `packages/agents/vscode-extension/src/features/agent-tree/toggles.ts` and never fetches the notice; the migration that would make it fetch is unlanded work in a worktree, where an absent and an empty body would both be refused. Its recommendation was to correct all three together once that branch settles rather than write a sentence that goes stale on someone else's merge.

Not measured: whether `project-18768` is live work or abandoned.
