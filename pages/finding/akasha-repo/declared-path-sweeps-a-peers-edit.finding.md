---
id: 63c455af-2c59-5e67-8451-f56030c74dca
page-type-slug: finding
title: "Declared path sweeps a peers edit"
domain-slug: repo/akasha-repo
---

# Claim

Atomic Commit tells a seat to name the paths its commit is for, and its warrant names only what is already staged. Naming a path bounds the commit from outside and not from inside: the landing commit takes whatever the working tree holds at each named path, so a peer's uncommitted edit to a path the caller also wrote lands in the caller's commit under the caller's author. The commit is green and the file is right; what goes is the tie between a change and the seat that made it.

# Evidence

The rule stands at `pages/repo/akasha-repo.repo.md:31-39`. Its act (33) is "Stage and commit in one command, naming the paths that commit is for"; its warrant (35) is "A parent's worktree is shared by every child, so anything staged and not committed is swept up"; its two aids (37, 39) rule out `-a` and a directory that may grow. Every clause is about content already staged, or about the paths outside the named set.

The verb that stages by path today is `commitPaths` at `repo/git/git.ts:239-278`, reached through `commitNamed` at `repo/land/land.ts:140-142`, which is the default commit for every landing (`repo/land/land.ts:175`) and so for `ops write`, `ops edit`, `ops replace`, `ops rm` and `ops mv`. Line 264 runs `git commit --author=<author> -m <message>` with the named paths appended after `--` by `gitWritingPaths` (`repo/git/git.ts:170-187`). A pathspec commit takes the working tree at those paths, whoever wrote what is there.

What `commitPaths` inspects inside the named set is: whether each path exists (245), whether git ignores it (247), whether it is untracked and needs `--intent-to-add` (250-260), and whether the set differs from HEAD at all (261). Nothing compares what the caller wrote against what stands on disk, so no surface separates the caller's hunk from a peer's.

A peer's edit rides in as the base. `ops edit` reads the body off disk at `ops-cli/global/edit/edit.command.code.attachment.ts:75` (`readFileSync(absolute)`), so the caller's pairs apply on top of whatever a peer left there, and the two land together.

The sharing the warrant names is not hypothetical here. While I was reading this checkout on 2026-08-27, four commits landed in it that I did not make: `873b1b37e` at 14:20:19 and `1b07d9cde` at 14:23:03, with `b0e09f448` and `074baff9c` between them.

NOT MEASURED: I did not observe an absorbed hunk, only the shared checkout and the verb that would carry one. Nothing counts the class, because no surface distinguishes an absorbed hunk from an authored one.
