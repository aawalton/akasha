---
id: 3581de1f-18df-5eb7-93de-d7605afc348b
page-type-slug: finding
title: "Memory paths cited from code"
domain-slug: repo/code-repo
---

# Claim

The code repository cites particular memory documents by path, and eighteen of those citations now name a file that has moved.

# Evidence

`folders/memory-repo.md` states One-Way Citation: never name a particular memory document from the instructions tree, because a glob or a template names a shape and survives where a named document rots. The rule is scoped to the instructions tree and says nothing about the code repository, which does the same thing.

Measured on 2026-08-04, after the rulings store was sorted into per-domain folders. `grep -rn "rulings/" --include=*.ts ~/code`, excluding `node_modules/` and `dist/`, returns 18 citations across 14 source files: nine of `rulings/domain-has-subtypes.md`, eight of `rulings/name-distinctness-is-the-exclusion.md`, one of `rulings/layout-is-asked-for-not-copied.md`. All three moved that day — to `rulings/identity/`, `rulings/identity/` and `rulings/agent-harness/` respectively — so every one of the eighteen now names a path that is not there. The built `dist/` copies carry more of the same.

Every citation sits in a doc comment. None is resolved, executed or tested against, so nothing failed and no instrument reported it; the cost is a reader following a citation to a file that is gone.

Two instructions-tree citations of the same ruling stood in `tools/owns.ts` and `tools/lib/owns-path.ts` and were removed the same day, the rule being explicit for that tree.

Not measured: whether any other memory path is cited from the code repository, `rulings/` being the only prefix searched, and whether the rule is meant to reach the third tree at all.
