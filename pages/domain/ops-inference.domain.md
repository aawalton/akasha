---
id: 80ed491d-8635-5e67-b9ba-ab242ed9da74
page-type-slug: domain
title: "Ops inference"
slug: ops-inference
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/inference
---

# Definition

- **Ops inference** — the commands that put the model services on their host, pick which one is loaded, and run it.

# Design

A command that runs a model opens a row for the run before it starts and closes that row as completed or failed.

The two reconcile commands take akasha as their workspace, wherever they are run from.
