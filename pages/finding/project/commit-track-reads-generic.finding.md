---
id: 4778e69e-1642-5c42-8133-cb2fc81511ca
slug: commit-track-reads-generic
page-type-slug: finding
title: "Commit track reads generic"
domain-slug: barred-meaning/project
---

# Claim

The two `-commit` build tasks read as generic but their stages bind them to the instructions repository, so a lead choosing a project's track from what `live-on` plainly means will send a code-repo change to a seat whose procedure cannot carry it.

# Evidence

`domains/tasks/projects/build-singleton-commit.md` defines itself as "building one standalone project's change, live as each commit lands" — a statement about *when a change goes live*, which is what `live-on` records and what `define-project` stage 2 asks a lead to declare.

Its stages say something narrower. Stage 3 runs `ops instructions run-checks` and states "There is no branch, no branch CI and no deploy after you." Stage 1 starts no worktree. Nothing in the file names the instructions repository, and nothing in the definition warns that the choice is about *which repository the change lands in* rather than about when it is live.

`build-singleton-deploy` is the code-repo track: `ops project start` for a worktree and branch, per-package typecheck, `ops lint-verdict --repo-root`, `ops project check` for branch CI, `ops project deploy` through the merge queue, and a `documentation` stage that reaches the instructions repo separately.

Measured by making the mistake. Defining #17551 on 2026-08-06 — a Swift change to `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh`, which reaches Alan through an iOS install rather than through the web deploy — I read the two definitions, concluded the change was live at commit rather than at deploy, and wrote `live-on: commit` into #17551's document and `liveOn` to match on the row. Both were corrected before dispatch, but only because I read `build-singleton-commit`'s stages afterwards and found `ops instructions run-checks` where the code-repo pipeline should have been.

The reasoning that produced it is the one the definitions invite: a change reaching production without a web deploy is not "live on deploy" in any plain reading, so `commit` is what the words select. The track is decided by which repository the change writes into, and neither definition says so.

Filed rather than repaired: the fix is a wording change on task documents owned by `project`, and the same ambiguity may sit on the two `-child` variants, which this note did not read.
