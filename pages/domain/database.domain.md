---
id: df924a27-c2ca-5133-a8ec-d7b1247abdfd
page-type-slug: domain
title: "Database"
slug: database
domain-parent-slug: domain/storage
---

# Definition

- **Database** — the queryable store.

# Design

A GIN index sets a small pending-list bound rather than taking the default.

Every database-backed test boots its schema from the committed snapshot.

