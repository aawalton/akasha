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

- **Write** — whole file bodies carried in, gated together and landed or refused as one.

# Design

Which repository a call addresses is read from the bodies it carries, not only from its flags.

A path inside no repository is written where it lies, with no gate and no commit behind it.

A body of bytes reaches this only as a file named at `--content-file`.

Which extensions carry bytes is read off the file kinds, and nothing here lists them again.

A gate that reads a body as text steps aside for a body of bytes rather than being handed one.

A body handed in as `--content-file -` cannot be patched, stdin being one stream the patch would drain.

# Intent

One command makes every write, in any repository or outside them all.
