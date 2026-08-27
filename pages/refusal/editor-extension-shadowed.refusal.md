---
id: b638fbc3-b6b0-5381-bec1-678afe6bed40
slug: editor-extension-shadowed
page-type-slug: refusal
title: "Editor extension shadowed"
holes:
  - id
  - path
  - registry
  - commands
---

# Refusal

`{id}` is registered at `{path}` by `{registry}`, and it contributes `{commands}` — which the editor checkout's own built-in ops extension contributes too.

Both load, and whichever activates first takes those ids while the other dies on the collision. Which one that is decides whether Alan is running the editor repository's extension or a copy of it from somewhere else, and nothing on screen says which won.

The built-in needs no registration: a folder under `extensions/` is scanned from the checkout. So the entry is what goes, not the built-in.
