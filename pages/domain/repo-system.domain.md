---
id: 9e13a008-e9ca-5209-b661-db2314085ebe
page-type-slug: domain
title: "Repo system"
slug: repo-system
domain-parent-slug: domain/pages-system
settled: true
---

# Definition

- **Repo system** — how we keep track of changes to things.

# Design

A write is durable at its commit, and the push carrying it to the remote runs after the command has returned.

# Intent

Every commit reaches its remote, and one that has not stands as a reading somebody sees.
