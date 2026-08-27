---
id: 4c7263b2-d427-5d59-8954-f0be63be4579
page-type-slug: domain
title: "Deploy"
slug: deploy
domain-parent-slug: domain/change-harness-cluster
---

# Definition

- **Deploy** — a landed change becoming what production runs.

# Design

A commit is assumed live if its deploy finished with no failures.

What gates the land is the pipeline over the merged result, never the pipeline the change branch ran.

A change whose main pipeline goes red stays landed on main, and nothing reverts it.

A commit is deployed only where it is the branch's passed commit.
