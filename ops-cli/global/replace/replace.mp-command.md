---
id: 01a0407c-f7a9-7760-9fda-1725b372edd9
page-type-slug: mp-command
title: "Replace"
slug: replace
path: replace
domain-parent-slug: mp-namespace/global
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Replace** — one stated substitution across every file carrying it, gated together and landed or refused as one.

# Design

Which repository a call addresses is read from the paths it names.

A path is where the search starts, not what is rewritten.

A string standing in nothing under those paths is refused.

A file that is not text is passed over rather than decoded.

A path inside no repository is written where it lies, with no gate and no commit behind it.

A file that changes under a call, between its read and its write, refuses the whole call.
