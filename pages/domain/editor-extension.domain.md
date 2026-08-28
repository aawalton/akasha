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

The editor loads the TypeScript source itself, and every tree carrying that symlink loads the same files, the artefact Alan runs included.

Every relative import names its `.ts` extension, and no file here carries a parameter property.

A change here reaches Alan on a window reload alone.
