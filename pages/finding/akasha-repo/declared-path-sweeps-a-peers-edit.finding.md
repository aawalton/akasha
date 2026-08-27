---
id: 63c455af-2c59-5e67-8451-f56030c74dca
page-type-slug: finding
title: "Declared path sweeps a peers edit"
domain-slug: repo/code-repo
---

# Claim

`ops project commit --path` stages each declared path whole, so a peer's uncommitted edit to a file the caller also edited lands in the caller's commit under the caller's seq, and nothing reports it. The verb's leftovers stanza lists only paths OUTSIDE the declared set, and Atomic Commit on `domains/folders/code-repo.md` warns only of content already STAGED. Both commits are green and the file is right; what is destroyed is the association between the change and the row that owns it.

# Evidence

`ops project commit --help`, read 2026-08-07, in its own words: it stages "declared paths", and "after committing the command prints any other modified/deleted/untracked paths under 'Uncommitted in worktree, outside this commit' so the caller can review leftovers (another agent's work, hook artifacts, forgotten edits)". The stanza is scoped to paths outside the commit. Its pre-flight refusal is likewise scoped elsewhere: it "refuses to run when the git index already contains staged paths outside the declared set". Nothing in the verb inspects the diff inside a declared path.

The same help states the sharing that makes this reachable: "the commit is made in the worktree of the project TREE — the root's, shared by every child under it", so every child seat on one tree edits one working tree.

`domains/folders/code-repo.md` Atomic Commit is the live rule, and its warrant names the other route only: "another seat may stage into the same index at any moment and anything staged and not yet committed is swept into whoever commits next." A seat obeying it — staging and committing in one command, naming the paths that commit is for — still sweeps a peer's unstaged edit to a path it names.

One instance is in the log. `git show --stat --oneline b34dba19d9` in `~/code` returns `feat(#17322): role, domain and persona are defined once each in the repo glossary...`, one file, `CLAUDE.md | 7 ++++++-`, 6 insertions and 1 deletion. `dirty/skills/agent-harness/findings/claim-establishment-and-correction.md` recorded that this commit absorbed an uncommitted `~/code/CLAUDE.md` edit belonging to `worker-17324`, which had sequenced itself off three other shared files and lost a fourth it had not predicted.

NOT MEASURED: how often this happens. One instance is in the log and nothing counts the class, because no surface distinguishes an absorbed hunk from an authored one.
