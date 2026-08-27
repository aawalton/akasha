---
id: f2befb6a-e3ab-547a-bcb6-571bd265a593
page-type-slug: domain
title: "Branch pipeline"
slug: branch-pipeline
domain-parent-slug: page-type/pipeline
---

# Definition

- **Branch pipeline** — one run of the checks a branch's commits need.

# Design

A branch pipeline is started by somebody asking for it, never by a push and never by a deploy.

Every failing suite is charged to the branch, whatever that suite does at any other ref.

Nothing it runs is run at a commit other than the branch's own head.

A run that did not account for itself yields no verdict, rather than a pass.

A run's checks are those the change from the branch's live commit to its head reaches.
