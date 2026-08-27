---
id: d7d6e02b-8e3f-527d-b4b0-6979fd164da4
page-type-slug: domain
title: "Rules engine field type"
slug: rules-engine-field-type
domain-parent-slug: domain/rules-engine-field
---

# Definition

- **Rules engine field type** — what a field holds, which decides how it can be compared.

# Design

The types are the engine's, and a rule set chooses among them rather than adding one.

A type names the comparisons it takes, and a condition pairing a field with any other is refused.

A type states how a rule set is proven to cover it.

There is no boolean type: a field with two values is an enum with two values.
