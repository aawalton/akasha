---
id: 6b459bd9-4261-5321-a686-2d300bd4aafa
page-type-slug: refusal
title: "Page redeclaration silent"
holes:
  - key
  - at
  - side
---

# Refusal

`{key}` is declared at {at}, and neither states `narrows-slug:`, so nothing says which of them bounds the key.

A redeclaration narrows what it redeclares and names it under `narrows-slug:`, and the same rule bars a silent one for a `blocks.` key at `{side}`.
