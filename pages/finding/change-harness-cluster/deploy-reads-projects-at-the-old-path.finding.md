---
id: 01a02388-7b1c-7000-8e55-92c4f6d0a713
slug: deploy-reads-projects-at-the-old-path
page-type-slug: finding
title: "The deploy pipeline reads project documents at the path they left"
domain-slug: domain/change-harness-cluster
---

# Claim

`ops project deploy` loads its pipeline out of the code repository, and that repository still reads a project's document from `memory/projects/<seq>.md`. The documents moved to `memory/pages/project/`, and the old directory does not exist. Project 19446 refuses in under half a second with `--seq 19446 names no live project`, before any phase runs. Since `ops project finish` refuses a branch whose commits are not on main, a project that cannot deploy cannot be closed either.

# Evidence

Measured 2026-08-22. `packages/alanwalton/projects/core/src/lib/project-document.ts:6` declares `const PROJECTS_DIR = "projects"`, and line 43 builds `join(memoryRoot(), PROJECTS_DIR, `${seq}.md`)`. `ls ~/repos/memory/projects/` answers that no such directory exists; the eight live documents stand under `pages/project/`. `projectDocumentStands` at line 81 is that read, and `packages/infra/git/cli/src/lib/commit-target.ts:49` turns its false into the `no-document` observation that `project-tree-decide.ts:52` refuses on.

The instructions repository followed the move and the code repository did not. `tools/lib/project-status.ts` resolves the directory through `pageDirNameIn(memory, "project", PROJECTS_WAS)`, which probes for the migrated name, so `treeSeqFor(19446)` answers 19446 correctly in every context tried: a plain call, a call from inside the code worktree, and a call inside a `systemd-run --user --scope` unit. `tools/commands/project/deploy.ts:156` therefore passes, and the refusal arrives later from `runDeployPipeline` and `observeLandedForSeq`, both loaded from the code repository through `codeModule` in `tools/lib/project-deploy-code.ts`.

Two deploys, ten minutes apart, on unchanged resolution code — the last edit to it was 07:14, both runs later. 19446 at 08:29 refused at resolution. 19440 at 07:59 resolved, ran its phases, and failed at `deploy_queue_stalled` with the queue batched and no progress for 1504s. So the refusal is not uniform, and **what makes 19440 different is not established here.** Its document is not at the old path either, so a leftover file does not explain it.

Nothing in this is repaired. The repair is a code repository change, which lands through the deploy path that is broken, so the order it can be done in is itself a question this did not settle.

Found while closing project 19446, whose commit `7dba86857` stands on branch `project-19446` and has not landed.
