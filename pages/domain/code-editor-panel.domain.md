---
id: 07dde914-4f4c-5eac-8c02-bf54de350015
page-type-slug: domain
title: "Code editor panel"
slug: code-editor-panel
domain-parent-slug: domain/code-editor
sequence-slugs:
  - domain/code-editor-panel-agents
  - domain/code-editor-panel-domains
  - domain/code-editor-panel-work
  - domain/code-editor-panel-pages
---

# Definition

- **Code editor panel** — a view in the editor's sidebar drawing what the system holds.

# Design

A panel re-reads when the repository it draws is written, rather than on a timer.

A read that failed leaves the last good rows on screen.

A panel's count is of every row it drew, of every kind.

A panel drawing an agent's color follows that agent's turn state as it changes.

A turn state changing is drawn within 100ms of the file carrying it being written.

A color is read through the command's own file, never through the `ops` dispatcher.
