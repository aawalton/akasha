---
id: 679aa56d-97ae-5fe5-b02e-53ec2c15eac0
page-type-slug: domain
title: "Ops pipeline"
slug: ops-pipeline
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - page-type/pipeline
---

# Definition

- **Ops pipeline** — the commands that read one pipeline's pages and set by hand what the orchestrator otherwise sets.

# Design

Every write to a pipeline, workflow or step page here is guarded on the status the command just read, so a page that moved first is reported back as a no-op rather than overwritten.

Retrying a run clears the failed subtree on the pages that recorded it, so what went red is read from the step logs in Loki rather than from the run.
