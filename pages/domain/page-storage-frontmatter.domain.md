---
id: 5b89d3f4-f912-509b-96e6-46b168b9a06c
page-type-slug: domain
title: "Page storage frontmatter"
slug: page-storage-frontmatter
domain-parent-slug: domain/page-storage
---

# Definition

- **Page storage frontmatter** — the properties a page's own file carries.

# Design

Every key is spelled in kebab-case, whatever spelling whoever reads it hands the value back under.

A key standing bare is the only spelling of an empty value here; a key not there at all spells no value.

A mapping is carried as the JSON text of it.

A value is text until the type its property declares says otherwise.
