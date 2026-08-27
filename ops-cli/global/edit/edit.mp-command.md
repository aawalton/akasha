---
id: 01a04044-3e10-7000-9f1a-2b7c5d0e9a41
page-type-slug: mp-command
title: "Edit"
slug: edit
path: edit
domain-parent-slug: mp-namespace/global
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Edit** — stated substitutions worked out into whole bodies, gated together and landed or refused as one.

# Design

Which repository a call addresses is read from the paths its substitutions name.

A substitution matching no times or more than once is refused before any check runs.

A body that is not text is refused.

A path that is not there is refused.

A path inside no repository is written where it lies, with no gate and no commit behind it.

A file that changes under a call, between its read and its write, refuses the whole call.
