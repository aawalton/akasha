---
id: 7cce444f-30ef-57d1-be1f-a0067e61c40c
page-type-slug: domain
title: "Container registry"
slug: container-registry
domain-parent-slug: domain/storage
---

# Definition

- **Container registry** — the store container images live in.

# Design

The registry serves plain HTTP.

A node reaches the registry at an address rather than by name, because it cannot resolve names inside the cluster.

Only the newest images of each family are kept, and the rest are deleted.
