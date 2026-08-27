---
id: 72e1b839-734b-4f8c-9c45-df0eeadfa0c0
page-type-slug: page-property-definition
title: "File kind name pattern"
defined-on-slug: page-type/file-kind-domain
key: name-pattern
type: text
slug: file-kind-name-pattern
domain-parent-slug: page-type/file-kind-domain
---

# Definition

- **File kind name pattern** — the file name a file kind claims.

# Design

A pattern is a whole file name, or a `*` and the tail it claims.

A file is of the kind whose matching pattern is the longest.

A file kind claims one pattern, and no two claim the same one.

Where two patterns name one thing, each has a page, and the one that is not canonical names the one that is as required reading.
