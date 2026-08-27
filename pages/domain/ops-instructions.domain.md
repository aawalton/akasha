---
id: 5d2fbaa4-659b-552c-92a8-657ce7a95faa
page-type-slug: domain
title: "Ops instructions"
slug: ops-instructions
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - repo/instructions-repo
---

# Definition

- **Ops instructions** — the commands that read and write the instructions repository and run the harness it holds.

# Design

A command here is a file directly under `tools/`, rather than under `tools/commands/`.
