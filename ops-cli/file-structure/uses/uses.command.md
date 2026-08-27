---
id: 5fbd0d0c-6c3a-5853-b0cb-4db48adc1fbc
page-type-slug: command
title: "Uses"
slug: uses
path: file-structure uses
domain-parent-slug: domain/ops-file-structure
required-reading-slugs:
  - page-type/command
---

# Definition

- **Uses** — every file under one section of a repository, with what points at it.

# Design

What points at a file is read from the graph rather than scanned again here.

A page beside its own code points at the code, rather than the code pointing at the page.

A file is judged against its own folder, so a folder answers for what it holds and never for what its subfolders expose.
