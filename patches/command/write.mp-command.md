---
id: ad14fd98-d5d0-53ac-98d5-0ae25421bda1
page-type-slug: mp-command
title: "Mp write"
slug: mp-write
path: write
domain-parent-slug: domain/master-plan
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Mp write** — whole file bodies carried in, turned into a patch and gated as one before they land.

# Design

A call addressing no akasha path is forwarded to `tools/write.ts` unchanged.

A body reaching this on stdin cannot be patched, stdin being one stream the patch would drain.
