---
id: 73ede42a-ab95-5d69-bd6f-1689da7a0567
page-type-slug: mp-check
title: "Typecheck"
slug: typecheck
needs: tree
---

# Definition

- **Typecheck** — fails TypeScript that does not compile under the settings its project declares.

# Design

A diagnostic is reported against a file being checked, or one that reaches it through imports.

Nothing is reported against a file that imports outside this repository.

Every check of a project's files reads the declaration files that project claims.

# Intent

A file belongs to the nearest `tsconfig.json` above it, whether or not that file's paths name it.

Every file with no `tsconfig.json` above it belongs to the default project.

A `tsconfig.json` carrying another compiler's own key is that compiler's, and none of its files are judged here.

A file is rechecked when its own body or a type it reads has changed, and not otherwise.

A gate and an audit reach the same verdict on the same tree.
