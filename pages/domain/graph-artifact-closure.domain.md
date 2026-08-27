---
id: 01601aa2-aade-515e-b0de-bd9e5418c072
page-type-slug: domain
title: "Graph artifact closure"
slug: graph-artifact-closure
domain-parent-slug: domain/graph-artifact
required-reading-slugs:
  - domain/graph-artifact-derives
---

# Definition

- **Graph artifact closure** — everything an artifact derives from, and so on until nothing new appears.

# Design

Every closure ends in files.

A closure is unchanged while every file in it is.

A closure holds the code that ran, not the code a pending change would leave.
