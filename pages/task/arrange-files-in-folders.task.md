---
id: 2363647d-6839-50d0-8876-518e4c0d10ca
page-type-slug: task
title: "Arrange files in folders"
slug: arrange-files-in-folders
domain-parent-slug: domain/file-arrangement
required-reading-slugs:
  - page-type/task
---

# Definition

- **Arrange files in folders** — settling which folder each file in one part of a repository sits in.

# Sequence

1. **The tree as it stands.**
   - **List** the section's tracked files with `ops file-structure list <section>`.

2. **Who uses what.**
   - **Map** what points at each file with `ops file-structure uses <section>`.

3. **The tree the uses give.**
   - **Group** the section by dominator with `ops file-structure dominance <section>`.
