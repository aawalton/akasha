---
id: fe068aeb-f51d-5b1a-8738-263d6224cce5
page-type-slug: domain
title: "Ops complexity"
slug: ops-complexity
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/code-quality
---

# Definition

- **Ops complexity** — the commands that count a checkout's TypeScript into per-function and per-file figures they print.

# Design

The checkout measured is the one the working directory sits in, never one named on the command line.

A figure is printed and never judged: every run exits 0, and a threshold only drops rows from the printing.

Nothing is kept between runs. Each run lists and parses the whole checkout again, so what a run costs is what the checkout holds.
