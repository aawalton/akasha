---
page-type-slug: finding
title: "The code-loaded-by property is typed by nothing"
domain-slug: domain/page-types-system
---

# Claim

The `code-loaded-by` property is declared `type: string`, and no page-property-type defines `string`.

`pages/page-property-definition/page-type-code-loaded-by.page-property-definition.md` carries `type: string`. The 48 declared property types include `text`, `path`, `file` and the whole `relation-*` family, and none of them is `string`.

Two things follow from a type nothing defines. The property draws no relation edge, because what makes a value a relation is the declared type saying so, and it earns no required-reading warrant either. Both read as the property simply not pointing anywhere, rather than as a declaration nothing could resolve.

# Evidence

Read 2026-08-27 in akasha at `f27350787`. `pages/page-property-definition/page-type-code-loaded-by.page-property-definition.md:7` reads `type: string`.

Every tracked `pages/page-property-type/*.page-property-type.md` was listed: 48 types, `block-bound boolean calendar-date choice-bound color container-resources dispatch-target file instant json list map node none number option page-query-test pages path process range rank reading region relation-address relation-id relation-name relation-seq relation-slug run-cost-band run-kind secret-mount size-2xl size-3xl size-lg size-md size-sm size-xl size-xs size slot-bound slug step-definition temper-grimoire-script temper-metric-effect temper-quality-values template text type url uuid`. There is no `string`.

`code-loaded-by` has exactly one reader in the repository, the graph's `loader` edge producer, which reaches the value directly rather than through the declared type, so nothing observably fails today.

Not measured: whether other property definitions name a type nothing defines. Only this one was checked, and only against akasha.
