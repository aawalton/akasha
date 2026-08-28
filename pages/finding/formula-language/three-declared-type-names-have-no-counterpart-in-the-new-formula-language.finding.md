---
id: 7a170ba5-c28c-5bd4-a0e1-00c28e61e841
page-type-slug: finding
title: "Three declared type names have no counterpart in the new formula language"
slug: three-declared-type-names-have-no-counterpart-in-the-new-formula-language
domain-slug: domain/formula-language
---

# Claim

Three declared type names the formula corpus references have no counterpart in the new language's `DeclaredType`, so what 16 references become is unruled.

# Evidence

Measured 2026-08-28 at commit `37e0955be`, over the 74 property definitions carrying an `expression`. Every key those formulas reference resolves to a declared type through the extends chain. Three of the names reached have no counterpart in `DeclaredType` in `pages-system/formula/`: `uuid` at 6 references, `select(slug)` at 5, `relation-slug` at 5.
