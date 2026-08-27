---
id: 5629c356-ac34-5bb8-b9b0-eb9c845b987a
page-type-slug: domain
title: "Main pipeline"
slug: main-pipeline
domain-parent-slug: page-type/pipeline
---

# Definition

- **Main pipeline** — the pipeline each commit on main runs, and where a deploy happens.

# Design

A burst of requests mints one pipeline, at the newest of them.

The reconciler watching for a main commit no pipeline covers reports the drift and writes nothing.
