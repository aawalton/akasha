---
id: 1fa0fe8d-8194-5aca-8d7f-37a74c1bca38
page-type-slug: finding
title: "Worktree named off seq closes open"
domain-slug: domain/global
---

# Claim

`ops project finish` moves a project to a terminal status and exits 0 while its worktree and its branch both still stand, whenever that worktree is named anything other than the project's seq.

# Evidence

Measured on #19004, whose worktree stood at `~/worktrees/ops-declared-repos` rather than `~/worktrees/19004`.

`ops project finish --seq 19004 --discard-unlanded` printed `#19004 checks -> done` and `worktree_removed=true branch_deleted=false`, and exited 0. Afterwards `git worktree list` still showed that path holding `project-19004`, and `git branch --list` still showed the branch. The row was at `done`.

`cleanupWorktreeForProject` in `packages/infra/git/cli/src/lib/worktree-ops.ts:211` builds the path it acts on as `projectWorktreePath(WORKTREE_BASE, seq)`, and line 234 reports `worktreeRemoved: !existsSync(worktreeDir)` against that same built path. A worktree registered under any other name is absent from the path the command looks at, so removal is reported done with nothing removed.

The branch delete at line 225 then fails, git refusing to delete a branch checked out in a live worktree, and line 226 records that as `branch_deleted=false`. Nothing refuses on it: `cleanupOutcome` at line 152 keys `ok` on `worktreeRemoved` alone, so a false branch flag rides out on a success line.

`WORKTREE_DIR` does not reach here. `ops worktree remove --help` documents it as naming the worktree outright; it is read in `commit-target.ts:44` and `worktree.ts:25`, which resolve the calling seat's own tree. Setting it and re-running removed nothing, twice. Removing the worktree by hand and re-running printed `branch_deleted=true`, which is what closed #19004.

Of the 85 worktrees `git worktree list` registers in `~/code` today, 12 carry a name the seq would not build, among them `14571-eval`, `15906-worktree-b`, `cutover2`, `lin19011` and `sim175`. That is what stands now, and says nothing about how many projects have already closed this way.

This is the #15628 illusory-finish class, reached by a route its guard does not cover: that guard fires on a branch carrying unlanded commits, and this fires on a worktree the command never found.
