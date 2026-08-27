---
id: 9d0ea567-81cc-45e8-9047-8ca1dcd9c47b
page-type-slug: domain
title: "Caching key"
slug: caching-key
domain-parent-slug: domain/caching
required-reading-slugs:
  - domain/caching-query
  - domain/caching-input
---

# Definition

- **Caching key** — what stands in for a query and its inputs.

# Design

A key costs less to work out than the answer it names.

A key may stand for more than the answer's inputs; it may never stand for less.

# Intent

Every key names the code that works out its answer.
