---
id: 777bacdb-fd32-587f-9be2-df7b6e6d09d3
page-type-slug: page-property-definition
title: "File purpose ending"
defined-on-slug: page-type/file-purpose
key: ending
type: text
pattern: '^[a-z0-9]+(\.[a-z0-9]+)+$'
backstop: 30
required: true
slug: file-purpose-ending
domain-parent-slug: page-type/file-purpose
---

# Definition

- **File purpose ending** — the file name ending a file purpose claims.

# Design

A file purpose claims one ending, and no two claim the same one.

An ending carries a dot. A single word is an extension, and stands on a file kind instead.

A file carries an ending only where the dot before it stands too, so `latest.ts` does not carry `test.ts`.

An ending carries no repository, so a file purpose is required reading wherever a file it names stands.
