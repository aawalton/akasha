---
id: 73ede42a-ab95-5d69-bd6f-1689da7a0567
page-type-slug: mp-check
title: "Typecheck"
slug: typecheck
needs: tree
---

# Definition

- **Typecheck** — fails TypeScript that does not compile under strict.

# Design

A diagnostic is reported against a file being checked, or one that reaches it through imports.

Nothing is reported for a module that is missing because it sits outside this repository.
