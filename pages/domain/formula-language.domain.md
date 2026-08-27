---
id: 01a044b8-1b44-7000-976d-dd6738450d4f
page-type-slug: domain
title: "Formula language"
slug: formula-language
domain-parent-slug: domain/page-property-computed
required-reading-slugs:
  - list/formula-values
  - domain/formula-absent-value
  - domain/language-power
  - domain/language-syntax
  - domain/language-type-system
  - domain/language-failure
  - domain/language-conformance
  - domain/language-evolution
---

# Definition

- **Formula language** — what a formula may say.

# Intent

A formula names a property by putting its key between braces.

A reference inside a text literal is filled where it stands.

A formula chooses between values with a case, and with nothing else.

Every case ends with an `otherwise` row.

A case works out only the value of the row whose test passed.

A formula names a computed property exactly as it names a stored one.

A formula gives no value a name of its own.

A cycle among a page type's formulas is refused when the page type is checked.
