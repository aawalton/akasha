---
id: 01a040a4-fe4f-7000-94f2-97894136694f
page-type-slug: check
title: "Category rule acts"
slug: category-rule-acts
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Category rule acts** — fails a category rule carrying a part that can never act.

# Design

A stray line under `# Match` is not judged here.

An agent rule names no outcome, so only its conditions are judged.

A rule whose frontmatter this repository cannot account for is not judged.
