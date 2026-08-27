---
page-type-slug: page-type
title: "Agent"
id: 54dc842e-b44e-5cfa-9d12-f15d89f02a16
extends-slug: page
files: none
body-shape-slug: empty
slug: agent
domain-parent-slug: domain/agent-definitions
settled: true
---

# Definition

- **Agent** — a model working from one continuous memory.

# Design

An agent is not a process.

A resume or a compaction leaves the same agent; a reset, a clear or a fork makes a new one.

An agent is not resumed for having stopped unexpectedly; it is resumed when something new needs it.
