---
id: d7870670-2d12-5f45-ad7e-c1196054fcce
page-type-slug: domain
title: "Page queries system"
slug: page-queries-system
domain-parent-slug: domain/pages-system
settled: true
---

# Definition

- **Page queries system** — how we ask about the things we keep track of.

# Design

A browser reaches a page query under `/api` on the app's own origin, never at a cluster name.

A row-write takes one pass over the file holding the rows, whether it carries one row or a batch.

A narrow the query cannot read is refused, never dropped.

Every key a query asks for stands on every page it answers, absent where the page holds nothing under it.

A query over a family reads each page type under its own declaration, never under the family head's.
