---
id: c3e23a76-ba7e-59f3-81a8-87a017c1fdd6
page-type-slug: domain
title: "Page storage rows part"
slug: page-storage-rows-part
domain-parent-slug: domain/page-storage-rows
---

# Definition

- **Page storage rows part** — one of the files a rows property stands in.

# Design

The first part is the rows file itself, and each one after it carries `.part<n>` before the suffix.

Rows carry on into a new part once the one holding them would pass its size bound.

A part's bound is set well under the smallest any store holding it allows, so headroom is what a part is written to keep.

A write touches only the part holding its row.

A part keeps its rows where they stand; nothing is rebalanced when a row goes.
