---
id: 8078feb4-7ecd-5673-972d-dbd3f245660a
slug: supervisor-seam-requires-out-of-the-tree
page-type-slug: finding
title: "Supervisor seam requires out of the tree"
domain-slug: domain/agent-harness
---

# Claim

`supervisor-decide-seam.ts` reads and `require`s decision modules straight out of the instructions tree, which is the third route `Command Or Row` rules out — and it is what the parent tree's second criterion measures, so that criterion cannot close while it stands.

# Evidence

Found 2026-08-11 by #18773 and verified by the manager against `/home/walton/worktrees/18768`. The file calls `createRequire(import.meta.url)` at line 70 and composes paths under `DECISION_DIR = "tools/lib"` off `findInstructionsRoot()`, so a decider is loaded as a module by absolute path rather than reached by a command or read off a row. Twelve files under `packages/` reach it, and those are the supervisor's own rule files rather than incidental callers.

It is older than the branch: on `main` at `717468313d`, 2026-08-10. Nobody introduced it during the move, which is why no child caught it — each was measuring what it had touched.

The parent's criterion reads "Nothing in the code repository reaches the instructions tree as files — no import of a module out of it and no read of its documents". This is both.

What makes it cheaper than it looks: the supervisor package carries `functionalType: local-service` and is delivered nowhere, so under the delivery boundary the whole package moves to the instructions repository. An instructions-repo file reading instructions-repo files directly is what `Reach Directly` prescribes, so the violation dissolves in that move rather than needing a command built for it. Cutting it as its own repair would buy a wire that the move then removes.
