---
id: 1b9d3235-ab33-5b18-a8a8-ad56ee66769c
slug: worktree-remove-child-seq-takes-the-parent-tree
page-type-slug: finding
title: "Worktree remove child seq takes the parent tree"
domain-slug: domain/agent-harness
---

# Claim

`ops worktree remove --seq <child>` is reported to resolve a child's seq to its PARENT's worktree, so removing a finished child's tree would delete the tree every sibling is still committing to, and the branch with it. Reported by a child of #19104 that caught it before it fired. Not confirmed here: confirming it means running the delete against a live tree.

# Evidence

`ops` homes a child on its parent's worktree. On #19104 both `ops project start --seq 19109` and `ops worktree add --seq 19109` returned `/home/walton/worktrees/19104` on branch `project-19104`, through two separate verbs — that much is recorded in #19109's own document and is the ordinary behaviour rather than the fault.

The fault is the same resolution applied to `remove`. Six children of #19104 committed into that one shared tree, so a single child calling `ops worktree remove --seq <its own seq>` on finishing would have taken the tree and the branch holding every sibling's work. #19110 reported reaching that command and stopping before running it.

Why this is worth a finding rather than a fix in place: the asymmetry is what makes it dangerous. Homing a child on the parent's tree is correct and deliberate for `add` and `start`, and a verb that shares that resolution reads as consistent with them. A child cleaning up after itself is the tidiest-looking act available and is the one that destroys the shared tree — the same shape as the standing rule that clearing foreign state is both the tidier act and the one that destroys the evidence.

Nothing reports it afterwards either. The child that ran it would see its own work committed and pushed, and the loss would surface on whichever sibling next tried to write.

Worth deciding: whether `remove` should refuse a seq whose worktree it does not exclusively own, rather than resolving it the way `add` does.
