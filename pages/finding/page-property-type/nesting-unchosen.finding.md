---
id: 4505ff7e-5237-5c4c-8a9c-b4b124e6464c
slug: nesting-unchosen
page-type-slug: finding
title: "Nesting unchosen"
domain-slug: page-type/page-property-type
---

# Claim

A type expression cannot nest, and nobody has decided whether it should — the limit is recorded as true rather than as chosen.

# Evidence

Measured 2026-08-14, when the Design line stating the limit was approved. Alan approved it as currently true while saying he was not sure it is correct.

`tools/lib/page-value.ts:45-46` writes the `list(` and `map(` patterns to capture a bare name — `([a-z][a-z0-9-]*)` — rather than a further expression, and `arms` at line 153 splits on `|` only at the top level. So `list(list(text))` and `list(slug | none)` are both refused, and no property in the repo attempts either.

What a decision would turn on: whether any property wants a list of unions or a map of lists, and what the grammar would cost to widen. Nothing measured here says one is wanted.
