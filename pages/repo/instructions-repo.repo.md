---
id: 845376d7-4db7-5c23-a3b4-515a3bdb1615
page-type-slug: repo
title: "Instructions repo"
slug: instructions-repo
domain-parent-slug: page-type/repo
required-reading-slugs:
  - domain/agent-harness
---

# Definition

- **Instructions repo** — the repository holding the instructions and their tooling.

# Design

Every other repo is a sibling of this one.

# Condition

Every code-repository module this repository loads comes through `tools/lib/code-import.ts`.

# Intent

Every third-party package this repo uses is declared.

# Rules

## Read It Anyway

**Read a file through `ops read` before you change it, though no gate here asks any more.**

This repository is outside akasha, so a write onto a body you never read is taken, not refused.

Nothing but `ops read` records a reading.

A range read leaves the rest of it unread.
