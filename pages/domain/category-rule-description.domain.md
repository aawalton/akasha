---
id: d50aae93-e5aa-5b63-88d4-e4524100e69b
page-type-slug: domain
title: "Category rule description"
slug: category-rule-description
domain-parent-slug: rules-engine-rule-set/category-rule
required-reading-slugs:
  - domain/rules-engine-field-text
---

# Definition

- **Category rule description** — the words a transaction carries.

# Design

Monarch's title for a transaction and the bank's own text are one field here.

The two are joined so that no value can span the boundary between them.

These words are a normalizer's subject rather than a condition's, and the merchant it names is what a rule matches.
