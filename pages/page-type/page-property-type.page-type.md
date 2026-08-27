---
page-type-slug: page-type
title: "Page property type"
id: 019ffd33-446f-7000-bd62-f0427ee1af55
extends-slug: domain
files: akasha:**/*.page-property-type.md
body-shape-slug: domain
slug: page-property-type
domain-parent-slug: page-type/page-property-definition
---

# Definition

- **Page property type** — the kind of value a property holds.

# Design

A property type can be built from other property types.

# Intent

A page property type says what its values may be, rather than leaving that to code.

A page property type declares the keys a property definition may add when it names that type.

Only primitives are named in code.

A named value stands as a constant rather than in code.

The vocabulary holds no `region`.
