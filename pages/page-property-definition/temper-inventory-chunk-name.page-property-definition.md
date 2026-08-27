---
id: 01a0458e-dfdc-7101-a953-8d75a4d05da0
page-type-slug: page-property-definition
title: "Temper inventory chunk name"
defined-on-slug: page-type/temper-inventory-chunk
key: name
type: formula
returnType: text
narrows-slug: page
expression: '"{inventory}-{text(chunk-index)}" ?? {slug} ?? {id}'
slug: temper-inventory-chunk-name
domain-parent-slug: page-type/temper-inventory-chunk
---

# Definition

- **Temper inventory chunk name** — the snapshot and the chunk index an inventory chunk is addressed by.
