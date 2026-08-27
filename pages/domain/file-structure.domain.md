---
id: 2d0b0576-b6ae-519b-8a8e-ce58c963de1c
page-type-slug: domain
title: "File structure"
slug: file-structure
domain-parent-slug: domain/craft-system
required-reading-slugs:
  - domain/file-arrangement
sequence-slugs:
  - domain/file-structure-definitions
  - domain/file-structure-purpose
  - domain/file-structure-cost
  - domain/file-naming
  - domain/file-arrangement
settled: true
---

# Definition

- **File structure** — how files and folders are named and arranged.

# Design

Which path words carry a file dimension changes nothing a search can find.

A file dimension is found without opening a file only where a path word carries it.

# Principles

## Search First

**Organize every file so an agent searching with ripgrep finds what it needs.**

An agent starts cold with no memory of the tree, so what search misses does not exist to it.

A hit's path alone must say what was found.

Never add structure no search will use.
