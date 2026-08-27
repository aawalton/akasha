---
id: b9cff7eb-ba6d-51e0-888c-8382e747fb1c
page-type-slug: mp-check
title: "Export declared here"
slug: export-declared-here
needs: file
cached: false
check-on-patch: false
check-on-worktree: false
---

# Definition

- **Export declared here** — fails a file exporting a name it did not declare.

# Design

A name imported and then exported under the same name is judged the same as one exported straight from its source.

A generated file is outside this check.
