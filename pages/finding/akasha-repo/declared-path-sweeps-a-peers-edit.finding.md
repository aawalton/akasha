---
id: 63c455af-2c59-5e67-8451-f56030c74dca
slug: declared-path-sweeps-a-peers-edit
page-type-slug: finding
title: "Declared path sweeps a peers edit"
domain-slug: repo/akasha-repo
---

# Claim

Atomic Commit tells a seat to name the paths its commit is for, and its warrant names only what is already staged. Naming a path bounds the commit from outside and not from inside: the landing commit takes whatever the working tree holds at each named path, so a peer's uncommitted edit to a path the caller also wrote lands in the caller's commit under the caller's author. The commit is green and the file is right; what goes is the tie between a change and the seat that made it.

# Evidence

The rule stands at `pages/repo/akasha-repo.repo.md:31-39`. Its act (33) is "Stage and commit in one command, naming the paths that commit is for"; its warrant (35) is "anything staged and not committed is swept up"; its aids (37, 39) rule out `-a` and a directory that may grow.

The verb is `commitPaths` (`repo/git/git.ts:271-310`), reached through `commitNamed` (`repo/land/land.ts:137-142`), the default commit for every landing (`repo/land/land.ts:172`) and so for `ops write`, `ops edit`, `ops replace`, `ops rm` and `ops mv`. Line 296 runs `git commit --author=<author> -m <message>` with the named paths appended after `--` by `gitWritingPaths` (`repo/git/git.ts:212-222`). A pathspec commit takes the working tree at those paths, whoever wrote what is there. What `commitPaths` inspects inside the set is whether each path is unknown to git (277), ignored (279), untracked and needing `--intent-to-add` (282-292), and whether the set differs from HEAD at all (293). Nothing compares what the caller wrote against what stands on disk.

`ops edit` reads the body off disk at `ops-cli/global/edit/edit.command.code.attachment.ts:75`, so the caller's pairs apply on top of whatever a peer left there, and the two land together.

Measured 2026-08-28, driving this same `commitPaths` over a scratch repository: a line no caller wrote, left uncommitted at a named path, landed in the caller's commit under the caller's author. Control: a peer's edit at a path the commit did not name stayed out, staged and unstaged alike. The sweep is the named paths' working tree, and only that.

The aid at 39 does not cover this. The path swept was a file, named exactly, and not a directory that grew.
