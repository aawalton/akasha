---
id: 14f433ab-13d5-53d3-aa95-d8434b4059c2
page-type-slug: domain
title: "Object store"
slug: object-store
domain-parent-slug: domain/storage
---

# Definition

- **Object store** — the keyed store for opaque binaries.

# Design

Durability is a property of each bucket, and of each prefix where one bucket's prefixes differ.

What cannot be remade is copied where nothing deletes.

That copy is bounded by a declared size and carries no age rule.
