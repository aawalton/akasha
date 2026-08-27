---
id: ad75f172-9a5c-5e4d-837a-358f702fd038
page-type-slug: domain
title: "Rules engine field"
slug: rules-engine-field
domain-parent-slug: domain/rules-engine
---

# Definition

- **Rules engine field** — one property of the page a rule set applies to, that a condition can name.

# Design

A rule set declares its own fields; a condition naming one it did not declare is refused.

A field's type comes from a set the engine closes, never one the rule set invents.

A field's type decides which comparisons it takes.

One comparison spelled alike over two types is two comparisons.
