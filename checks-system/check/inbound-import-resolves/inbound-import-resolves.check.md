---
id: 32ce2445-bcce-5582-9c6c-347b54b074b8
page-type-slug: check
title: "Inbound import resolves"
slug: inbound-import-resolves
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Inbound import resolves** — fails a change under which a repository outside akasha imports a file that is not here.

# Design

A repository outside akasha is judged here only for what it imports from here.

An import already broken before the change is refused with it, the change being answerable for the code it lands among.

Nothing outside is looked at where the change puts no code file in and takes none away.
