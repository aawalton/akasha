---
id: 80720213-5684-5c26-aa89-ba2d49b6d06e
page-type-slug: workstation-service
title: "Main pipeline creator"
slug: main-pipeline-creator
domain-parent-slug: page-type/pipeline
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/main-pipeline-creator.ts
enabled: false
restart-delay-seconds: 30
---

# Definition

- **Main pipeline creator** — the service that gives every commit landing on main its pipeline.
