---
id: 25007281-6d3b-55cf-8fa8-9ed029cab50c
page-type-slug: command
title: "Bundle"
slug: bundle
path: editor-extension bundle
domain-parent-slug: domain/editor-extension
required-reading-slugs:
  - page-type/command
---

# Definition

- **Bundle** — the extension's source written out as the one file the editor loads.

# Design

A bundle carries every package the extension declares, and never `vscode`.

A bundle lands beside the source, where the symlink the editor follows already points.

A watch holds the terminal it was started in until it is interrupted.
