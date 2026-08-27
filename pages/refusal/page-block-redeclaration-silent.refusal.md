---
id: 4704ba57-02bc-56c2-ac08-5eb89a556eb8
page-type-slug: refusal
title: "Page block redeclaration silent"
holes:
  - path
  - key
  - above
  - side
---

# Refusal

`{path}` declares `blocks.{key}`, which `{above}` above it declares, and states no `narrows:`.

A redeclaration narrows what it redeclares and names the page type it narrows under `blocks.{key}.narrows:`, and the same rule bars a silent one for a property at `{side}`.
