---
id: b775313d-23b8-5279-b810-fa9e3d9edcb7
page-type-slug: old-graph-edge
title: "Graph edge pipeline workflow runs step"
slug: graph-edge-pipeline-workflow-runs-step
domain-parent-slug: domain/graph-edge-pipeline
code-type: workflow-runs-step
---

# Definition

- **Graph edge pipeline workflow runs step** — the edge from a workflow to a step it runs.

# Design

Every other edge on a step points away from it, so a step is reached only through this one.

A workflow's steps are what the workflow runs, so a deploy that carries the workflow carries them.
