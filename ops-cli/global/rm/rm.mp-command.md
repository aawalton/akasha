---
id: 10d1c97e-5dc0-5f82-b9df-a96c15c22923
page-type-slug: mp-command
title: "Rm"
slug: rm
path: rm
domain-parent-slug: domain/master-plan
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Rm** — named paths taken away, gated together and removed or refused as one.

# Design

Which repository a call addresses is read from the paths it names.

A path that is not there is refused.

A directory opens onto every tracked file under it.

A directory holding no tracked file is refused.

A page's sidecars go with it without being named.

A directory the removal leaves empty goes with it.

A path inside no repository is removed where it lies, with no gate and no commit behind it.
