---
id: b9849735-0abc-5ff7-b7c5-3d47721a86d9
page-type-slug: finding
slug: min-is-expressible-to-no-file-reader
title: "Min is expressible to no file reader"
domain-slug: domain/pages-system
---

# Claim

`max` is read by a file reader and has a property document, while `min` is read by none and has none.

# Evidence

Checked 2026-08-27 at HEAD.

`declarationsIn` asks for `max` at `page/property/declarations.ts:143`, and `page/property/record.ts:16` carries it. `properties/page-property-definition-max.md` exists; `page-property-definition-min.md` does not.

`min` and `max` occur once each in the 53 `config` entries recorded by `number-presentation-config-reaches-no-file-reader`, on `temper-completed-task.priority`, as a pair. That finding held that neither was read, and that the document asymmetry was between two documents both carrying nothing to a reader rather than between an expressible key and an inexpressible one. That is inverted: the asymmetry is real.
