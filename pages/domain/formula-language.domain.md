---
id: 01a044b8-1b44-7000-976d-dd6738450d4f
page-type-slug: domain
title: "Formula language"
slug: formula-language
domain-parent-slug: domain/page-property-computed
required-reading-slugs:
  - list/formula-values
  - list/formula-functions
  - list/formula-operators
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

A formula joins text by writing references into a text literal, and in no other way.

A formula's operators bind in this order, loosest first: `??`, `&&`, comparison, addition, multiplication.

A text literal is written between double quotes, and holds no quote of its own.

Only `true`, `false` and `absent` are words standing for a value.

A formula that names a key its page type does not declare is refused when the page type is checked.

A formula whose types do not meet is refused when the page type is checked.

A formula that passes its check answers a value or absent, and never fails.
