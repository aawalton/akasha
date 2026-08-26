---
page-type-slug: mp-check
title: "Inbound import resolves"
slug: inbound-import-resolves
needs: tree
---

# Definition

- **Inbound import resolves** — fails a change taking away a file that a repository outside akasha imports.

# Design

A repository outside akasha is judged here only for what it imports from here.

Nothing outside is looked at where the change takes no code file away.

An import already broken before the change is not this change's to answer for.
