---
id: fa2d9c44-b168-5d9e-b57a-996ba884bd68
page-type-slug: domain
title: "Ops memory"
slug: ops-memory
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops memory** — the commands that read the memory repository's files, and the commands that change them on a commit.

# Design

Every command but `work-tree` is one file serving several repositories.

The domain a finding names is checked against akasha whichever repository the finding lands in.
