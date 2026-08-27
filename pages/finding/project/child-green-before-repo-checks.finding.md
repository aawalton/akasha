---
id: 4925f339-e364-5c92-a27d-fd1c958726eb
slug: child-green-before-repo-checks
page-type-slug: finding
title: "Child green before repo checks"
domain-slug: barred-meaning/project
---

# Claim

A child hands back green having run only its touched packages' own scripts, while repo-wide checks its change reddened stay unrun until the parent's branch CI.

# Evidence

Measured on 2026-08-13 across the three children of #18969.

`build-child-deploy`'s `checks` stage names three things: each touched package's own `typecheck`, `ops lint-verdict`, and `ops tests run` — per package, and for a stated reason, a repo-wide run reporting every other package's errors beside yours. Nothing in it reaches the checks under `packages/infra/checks`, which judge the whole tree.

All three children ran that stage, passed it honestly, and handed back. Each was then verified against its own criteria and passed those too, by instruments run a second time by the manager. Branch CI over the assembled tree then failed on five steps, and every failure was this tree's own work rather than something inherited: `check-syntax-bundle` and `check-predicate-derivation` on `widget-sites.ts`, which #18970 authored; `check-file-length`, `check-ast-unused` and `check-mock-module-leak` on three paths #18973 wrote. The branch was zero commits behind `origin/main`, so none of it came from elsewhere.

None of the three could have caught any of it by following its task. The word green therefore means something different at a child's hand-back than at the parent's CI, and nothing at the hand-back says so.

The cost is not the CI run, which the parent owes once whatever happens. It is that two seats had already been verified, moved to `awaiting_manager_deployment`, and stopped, and both had to be brought back and re-verified for defects that were on disk before either handed back.

Running the whole check suite per child is what the stage already refuses, and `Landing Together` says a parent runs CI once for the set. What is unexamined is the middle: the checks whose named population includes a path the child actually changed, which is a much smaller set than all of them and is knowable from the child's own declared paths.

What settles it: a tree whose children each ran the repo-wide checks reaching their own changed paths, and whose branch CI then finds nothing those checks would have found.
