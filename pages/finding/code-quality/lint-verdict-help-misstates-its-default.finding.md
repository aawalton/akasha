---
id: 8b494e67-181f-5fae-819a-e20e24a95055
slug: lint-verdict-help-misstates-its-default
page-type-slug: finding
title: "Lint verdict help misstates its default"
domain-slug: domain/code-quality
---

# Claim

`ops lint-verdict --help` says `--repo-root` "defaults to git-discovered root". It does not: the default is fixed at `~/code` whatever the working directory. This is the more dangerous half of the trap it sits in, because a child linting from its worktree gets a green PASS about a checkout at `main` carrying none of its changes. The string lives in the code repo.

# Evidence

Found twice on 2026-08-07 by two review-instructions readings that did not see each other, both of which concluded the document was right and the help wrong.

Verified myself: `ops lint-verdict --help` carries the line "--repo-root <dir>  Override the repo root (defaults to git-discovered root)."

First measurement, from the `build-child-deploy` reading: a bare `ops lint-verdict --json .` returned an identical cohort — 13875 of 14535 files, PASS — from `~/instructions`, from `~/code`, and from the live worktree `~/worktrees/15965`, while `--repo-root ~/instructions` returned a different tree.

Second, from the `build-singleton-deploy` reading: run from `~/instructions` against `packages/infra/checks`, a path with no counterpart in that repo, it opened 910 files. It linted `~/code`.

I ran neither, and re-ran only the help.

Why it matters more than a wrong sentence: a child linting from its worktree gets a green PASS about a checkout at `main` carrying none of its changes. The second reading adds that a verdict taken from the help would have repaired a true line into a false one — which is what nearly happened, twice.

The repair is a string in the code repo and needs a project rather than a reading's commit.
