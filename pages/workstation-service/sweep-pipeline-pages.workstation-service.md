---
id: 3a46396e-d9e8-50d2-9fbc-02b1cc1624fc
page-type-slug: workstation-service
title: "Sweep pipeline pages"
slug: sweep-pipeline-pages
domain-parent-slug: page-type/pipeline
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/sweep-pipeline-pages.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **Sweep pipeline pages** — the service that carries every unfinished pipeline, workflow and step to its next status.

# Design

One process sweeps every pipeline, rather than one process for each.

Nothing here chooses a workflow, creates one, or overtakes a pipeline.

A pipeline on main waits while an older pipeline of that branch is underway.

A step's verdict is read from its container, and the container reports nothing back.

A cluster read that fails moves no step off `launching` or `running` that tick.

A workflow's `deployed-commit` and `deployed-inputs-hash` are read here and written by a deploy.

# Intent

This runs.
