---
id: 06331cfd-5cca-5435-8ff6-cecbd6e4bdde
slug: child-seq-resolves-to-parent-worktree
page-type-slug: finding
title: "Child seq resolves to parent worktree"
domain-slug: domain/global
---

# Claim

A project created with `--parent-seq` resolves its worktree to the PARENT's tree and creates none of its own, so a seat that trusts the path it is handed writes into whatever tree the parent's holder is working in.

# Evidence

Measured 2026-08-14. `ops project start --title-file ... --parent-seq 19104` created row #19151 and printed `/home/walton/worktrees/19104` as its worktree — the parent's tree, held at that moment by the manager carrying #19104 to production. No `/home/walton/worktrees/19151` was created, and `git worktree list` showed only the parent's.

`ops worktree add --seq 19151` did not repair it: it printed the same parent path and exited 2, so the sanctioned second route reaches the same place.

What made a tree appear was clearing the parent — `ops project update --seq 19151 --properties-file` with `{"parent_seq": null}`, after which `ops worktree add --seq 19151` built `/home/walton/worktrees/19151` with its own `node_modules`. So the resolution keys on the parent relation rather than on the seq asked about.

Why it is worse than a missing directory. Nothing fails. The verb prints a path and exits 0, and that path is a real worktree with a real branch checked out, so a seat that does what it is handed edits, stages and commits into another agent's tree and branch. The two seats then share an index, which `domains/repos/code-repo.md` Atomic Commit names as the case where anything staged and not yet committed is swept into whoever commits next.

NOT ESTABLISHED: whether the same resolution runs for a child whose parent has no worktree, whether `ops project finish` or `ops worktree remove` on the child would take the parent's tree and branch with it (a hazard reported to me separately and not tested here, because testing it would destroy a live branch), and whether any seat has actually written into a parent's tree this way.
