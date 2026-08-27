---
id: cfed4032-327c-53d0-ab49-0e2e9c15459f
page-type-slug: domain
title: "Code audit ast unused"
slug: code-audit-ast-unused
domain-parent-slug: domain/unused-code
required-reading-slugs:
  - domain/audit
---

# Definition

- **Code audit ast unused** — the audit reading the code repository against what the instructions repository reaches into it.

# Design

The curation stands as a root file naming its parts, one per package family, and is read by merging the root with each part it names.

A part the tree does not hold refuses the read rather than being passed over.

A workspace the curation does not name takes default entry globs, not none.

What the curation names as entry globs is what reachability is computed from, so a change to it moves what reads as reached.
