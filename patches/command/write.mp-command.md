---
id: ad14fd98-d5d0-53ac-98d5-0ae25421bda1
page-type-slug: mp-command
title: "Write"
slug: write
path: write
domain-parent-slug: domain/master-plan
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Write** — whole file bodies carried in, turned into a patch and gated as one before they land.

# Design

Which repository a call addresses is read from the bodies it carries, not only from its flags.

A call addressing no akasha path is forwarded to `tools/write.ts`.

A body handed in as `--content-file -` cannot be patched, stdin being one stream the patch would drain.
