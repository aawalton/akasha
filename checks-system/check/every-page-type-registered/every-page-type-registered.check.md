---
id: 01a04b0b-c51e-7520-9e97-9821e0f41ada
page-type-slug: check
title: "Every page type registered"
slug: every-page-type-registered
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Every page type registered** — fails a page type the registry leaves out, and a registry entry no page type answers.

# Design

Only a file under the `akasha` folder is judged.

The tree this judges is the one the change would leave, never the one on disk.

A page type missing from the registry's object fails, though its file and its import are both there.

Which page type an entry means is in its import specifier, never the name bound to it.

An absent `akasha` folder is nothing to judge.

A tree with no registry fails this check.
