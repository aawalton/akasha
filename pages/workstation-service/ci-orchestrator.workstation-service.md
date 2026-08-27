---
id: 6bccda5e-041e-58a9-b065-3298f2d82cba
page-type-slug: workstation-service
title: "CI orchestrator"
slug: ci-orchestrator
domain-parent-slug: page-type/pipeline
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/ci-orchestrator.ts
enabled: false
restart-delay-seconds: 10
---

# Definition

- **CI orchestrator** — the service that answers a pipeline whose failure a later run cured.

# Design

The orchestrator reads and writes the pipeline, workflow and step pages as files, and holds no database connection.

A pipeline is owed a verdict while any workflow or step under it is unsettled, whatever the pipeline's own status says.

Answering a pipeline elsewhere carries to its failed and blocked workflows and steps, and to nothing else.

# Intent

The orchestrator runs.
