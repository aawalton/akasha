---
id: 4d23653f-6df6-53d0-b31a-7235c5a99b57
page-type-slug: finding
title: "Checks stage has no escalation"
domain-slug: domain/global
---

# Claim

The `checks` stage has no escalation line, and it is the stage most likely to meet a red the seat did not cause — this seat works in the parent's shared worktree and runs a per-package typecheck that picks up a sibling's uncommitted edits.

# Evidence

Measured 2026-08-06 across `domains/tasks/projects/build-*.md`.

Four of the six carry an explicit `**Escalate**` bullet: `build-singleton-commit.md:28`, `build-singleton-deploy.md:31,45,51`, `build-parent-commit.md:20,35`, `build-parent-deploy.md:20,35,50,57`.

The two children carry none. `build-child-commit.md` carries the load on its second invariant instead — "The check across the instructions repo answers for every seat's work at once, and a red you did not cause is theirs to fix rather than yours to find."

`build-child-deploy.md` has it in neither place. Its stage 3 is `Move` and `Run` and stops, and its second invariant (line 43) governs not RUNNING tree-wide acts — "Branch CI, the deploy and the live verification each reach every sibling's work" — rather than what to do with a red that is not yours.

Why the case is likelier here than anywhere in the family, per the reading that raised it: stage 1 puts this seat in the parent's worktree, shared with every sibling, and stage 3 runs a per-package typecheck, so a sibling's uncommitted in-progress edits in the same package surface as a red on this seat's run. The one document with no line for a foreign red belongs to the seat most likely to meet one.

Filed rather than repaired because the remedy is a judgment about how the tree divides work — whether this seat escalates, returns, or reads past — and no instrument settles it. The reading declined to write one for that reason.

Related: `pages/finding/project/six-build-tasks-share-one-procedure.finding.md` measures what this family does share.
