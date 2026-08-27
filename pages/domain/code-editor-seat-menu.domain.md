---
id: 291ac857-e7e9-4c90-a8cb-5f754fab1a80
page-type-slug: domain
title: "Code editor seat menu"
slug: code-editor-seat-menu
domain-parent-slug: domain/code-editor
required-reading-slugs:
  - domain/alan-harness-seat-commands
sequence-slugs:
  - domain/code-editor-seat-menu-run-interactively
  - domain/code-editor-seat-menu-run-headless
  - domain/code-editor-seat-menu-stop
  - domain/code-editor-seat-menu-resume
  - domain/code-editor-seat-menu-reset
  - domain/code-editor-seat-menu-copy-seat-name
settled: true
---

# Definition

- **Code editor seat menu** — the acts Alan reaches by right-clicking a seat.

# Design

Every act on a seat runs `ops` directly, with no shell between.

A terminal the menu opens does nothing but attach to a seat.

Changing where a seat runs leaves the agent in it untouched.

Every act this domain names is offered in the menu.
