---
id: 783c0ec7-3262-5f28-a537-a9909d85d65b
page-type-slug: finding
title: "Tree undeclared and contested"
domain-slug: barred-meaning/jargon
---

# Claim

`tree` is used as a defined thing — a parent project and its children taken as one object — and no domain defines it. `project-track` names `singleton`, `child` and `parent` and stops there. Three competing senses are already live here: a git tree-sha, the merge queue's bisection-tree, and the directory tree `code-quality.md` writes about. A word whose plain sense competes with the one being declared is written plainly instead, so the repair is the plain phrase rather than a new domain.

# Evidence

Found on 2026-08-10 running `build-parent-deploy` over a 55-child parent project, which is the task that leans on the word hardest.

Counted in `domains/tasks/projects/`: `build-parent-deploy.md` uses `tree` 14 times, `build-parent-commit.md` 7, `build-child-deploy.md` and `build-singleton-deploy.md` twice each, the two commit-track singleton and child tasks not at all. The first use is in `build-parent-deploy.md`'s own Definition — "carrying one parent project's tree to production" — so a reader meets the word in the sentence that is supposed to tell them what the task is.

Swept `domains/` for a declaring document: no `domain-slug: tree`, no file named for it. `domains/project-track.md` carries the nearest concept, defining the track a project sits on as `singleton`, `child` or `parent` derived from its links, with no Design section. `domains/project-path.md` above it speaks of "a parent project" and "its child projects" in the plain phrase throughout, and never says `tree` — so the plain wording is already in use one document up, which is what makes this a substitution rather than a rewrite.

The three competing senses were all met inside one session without looking for them: `ops merge-queue batch show` prints a `bisection-tree` section and the entries carry a `--tree-sha` flag, and `domains/code-quality.md:35` writes "this tree" for the repository's directory layout.

NOT ESTABLISHED. Whether the plain phrase reads well at every one of the 25 sites — several are possessive, such as "the tree's objective" and "your tree's own commits", and those need rewording rather than substitution. Whether any code, CLI output or database column spells `tree` for this same concept, which would make Ubiquitous Naming pull the other way and is the one measurement that could overturn the recommendation. Whether `project-track` or `project-path` is the right home if the decision goes the other way and the word is declared instead.
