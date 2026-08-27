---
id: 019ea7d8-5e16-7237-b2e0-4ce47633aa58
page-type-slug: page-type
title: "Inference run"
extends-slug: page
files: none
body-shape-slug: empty
slug: inference-run
domain-parent-slug: domain/inference
---

# Definition

- **Inference run** — one loading of a model to make something, and how it went.

# Design

A run is opened before the model starts and closed as completed or failed.

A run records where its output was written, never the output itself.
