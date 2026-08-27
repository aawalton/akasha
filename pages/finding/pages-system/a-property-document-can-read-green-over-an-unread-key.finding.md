---
id: 3e7b78aa-3515-51c1-999d-131331cb93c5
page-type-slug: finding
title: "A property document can read green over a key no reader asks for"
domain-slug: domain/pages-system
---

# Claim

Two readers resolve a property document and each asks for a fixed, different key set. A document may state a key outside both, pass every gate, and carry nothing to any consumer — a third category beside Gap A and Gap B, where the document exists, the audit reads green, and the column is empty by construction. `properties/page-property-definition-max.md` is a standing instance. Establish which reader is meant to read a key before writing a document for it.

# Evidence

Measured 2026-08-20 by reading both readers.

`definedOn` (`code:packages/shared/pages/access/src/file-property-defs.ts:116-150`) asks for exactly `key`, `type`, `defined-on-slug`, `title`, `id`, `returnType`, `values`. It emits `id` as the camelized key, plus `key`, `title`, `type` and `pageId`; `config.returnType` only when `type` is `formula`; `config.options` from `values`, through `labelled()`, which keeps `label` and drops every other key on an option including `color`.

`declarationsIn` (`instructions:tools/lib/page-declared.ts:91-105`) reads `slug`, `defined-on-slug`, `key`, `type`, `returnType`, `target-slug`, `slug-property`, `from`, `back-from`, `default`, `expression`, `large`, `data`.

The union is sixteen keys. `expression` and `large` are read only by the second, which is why `properties/page-property-definition-expression.md` carries something real while a document for `format`, `decimals`, `round`, `badgeVariant`, `min`, `max`, `prefix`, `icon`, `units`, `colorRules` or `schema` would not.

`max` is read by neither, yet `properties/page-property-definition-max.md` stands. `code:packages/shared/pages/core/src/property-types/number.ts:105-106` does test `config.min` and `config.max`, but on a file-backed type that `config` only ever arrives from `definedOn`, which never sets either. So the validation is unreachable from files and the document reads green over it.
