---
id: 50ce6ff5-c1bf-53f6-bc25-11d6fffb4245
page-type-slug: finding
title: "Verdict depends on install state"
domain-slug: domain/global
---

# Claim

A check whose verdict depends on installed packages reads red in a worktree and green in the checkout of the same commit, and nothing in its output says which it measured. `check-unused-deps` credits a dependency for a bin command found under `node_modules`, so a worktree without one reports `@biomejs/biome` unused twice while main is green. Every seat auditing a check reaches for a worktree or a copy, so the false red is produced by the standard method rather than by a mistake.

# Evidence

Measured 2026-08-11 in `~/code`, settling a standing finding that reported this check red on an unchanged tree.

BOTH SIDES REPRODUCE AT ONE COMMIT. The real checkout prints "OK — zero unused npm deps [over 398 of 398 workspaces]". A worktree of that same commit, which carries no `node_modules`, prints `@biomejs/biome` twice.

THE MECHANISM IS A CREDIT CLAUSE READING OUTSIDE THE TREE. The root declares `@biomejs/biome` and uses it through the `"lint": "biome check ."` script. Crediting a script's bin invocation needs the dependency's `bin` field, which is read from the installed package under `node_modules`. Absent that directory the credit cannot be established and the dependency reads as declared-and-unused.

THE OUTPUT DOES NOT DISTINGUISH THE TWO RUNS. The red names the dependency and the workspace and says nothing about install state, so it reads as a repository defect. The standing finding it produced was filed in good faith and cost a later seat the work of settling it.

THE METHOD THAT PRODUCES IT IS THE RECOMMENDED ONE. `Read-Only Main` on `domains/folders/code-repo.md` forbids writing into `~/code`, so every negative control in this audit runs in a worktree, a reflink copy or a `git archive` extraction. Two of those three carry no `node_modules` unless the seat copies one in, and the copy is a step a reviewer has no reason to take for a check that never mentions installed packages.

NOT MEASURED. How many other registered checks read anything under `node_modules`, and whether any of them states its dependence. `check-unused-deps` was reached through one review rather than by sweeping for the property, so it is an instance rather than a census.
