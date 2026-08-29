---
id: 31a3c7d5-db8f-503a-84f1-507a1432f370
page-type-slug: domain
title: "Code editor"
slug: code-editor
domain-parent-slug: domain/alan-harness-desktop
---

# Definition

- **Code editor** — a workbench of files, groups, panels and terminals.

# Design

The editor is a fork of openvscode-server that is never rebased onto it.

The editor runs as a desktop application, and is served to a browser only to drive its own checks.

Seats work in `code-editor`, a candidate in a worktree of it, and Alan runs an artefact under `~/.local/share`.

Only the editor's own `tools/promote.sh` writes the artefact Alan runs, so a change to the fork does not reach him until it is promoted.

The artefact's `extensions/ops` is a symlink to `editor-extension` in the akasha checkout, so a change to the extension reaches Alan without being promoted.

A change reaches Alan's window only when he reloads it.

# Intent

Alan works in the editor rather than in desktop VS Code.

Parts of the upstream fork that Alan will never use have been removed.

Any agent can arrange the editor's tabs, groups and panels.

The editor's build resolves everything it needs inside its own checkout, with no code repository beside it.

The editor stands in one clone.
