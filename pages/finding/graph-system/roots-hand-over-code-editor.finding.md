---
page-type-slug: finding
title: "Roots hand over code-editor"
domain-slug: domain/graph-system
---

# Claim

No code-editor node enters the graph by Alan's ruling of 2026-08-26, and nothing in code refuses one.

`rootsHere()` answers a map holding `code-editor` alongside `akasha`. Every producer walks the roots it is handed, so the ruling holds only for as long as each caller passes the right repositories, and a caller that passes what `rootsHere()` gave it puts code-editor nodes in the graph without anything saying so.

# Evidence

Read 2026-08-27 in akasha at `26bbd3a72`. `repo/roots/roots.ts` exports `rootsHere()`, which includes `code-editor` in what it answers. `graph/ask.ts` takes `repos` as a parameter on every ask rather than reading the roots itself, so nothing at the ask surface filters them.

Not measured: whether any caller in production actually passes `rootsHere()` through unfiltered. The claim is about what nothing prevents, not about a node observed in the graph.
