---
id: 48a4cfde-b271-5352-ad73-91960061dced
page-type-slug: domain
title: "Editor extension"
slug: editor-extension
domain-parent-slug: domain/code-editor
---

# Definition

- **Editor extension** — the harness's own surfaces inside the code editor.

# Design

The extension's files are in the akasha repository, and `code-editor/extensions/ops` is a symlink to them.

The editor supplies `vscode` at load.

Every tree carrying that symlink reads one bundle, the artefact Alan runs included.

A change here reaches Alan on a bundle and a window reload, without a promote.
