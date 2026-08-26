---
id: 32ce2445-bcce-5582-9c6c-347b54b074b8
page-type-slug: mp-check
title: "Inbound import resolves"
slug: inbound-import-resolves
needs: tree
---

# Definition

- **Inbound import resolves** — fails a change leaving a file outside akasha importing one that is no longer here.

# Design

A repository outside akasha is judged here only for what it imports from here.

An import already broken before the change is refused alongside the change that did not break it.
