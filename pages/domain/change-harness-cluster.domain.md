---
id: 52a73f5a-f828-52b4-9a80-7aae1e60030d
page-type-slug: domain
title: "Change harness cluster"
slug: change-harness-cluster
domain-parent-slug: domain/change-harness
required-reading-slugs:
  - domain/live
  - domain/service
  - domain/build
  - page-type/cluster-check
  - domain/deploy
  - page-type/pipeline
settled: true
---

# Definition

- **Change harness cluster** — how a change is checked again, landed and put into production.

# Design

Outside akasha a change lands straight on main, with no branch, no check and no merge.

Branches landing together are merged first, and the checks that gate the land run on that merge.

What lands on main is merged and deployed by an agent, not by a queue.

The operator deploys main, and deploys only a service that has ported to akasha.

A change on main is not live until every place that runs it has it.
