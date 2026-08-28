---
id: b87bed36-0294-57c0-beed-a40c41a1a2c3
page-type-slug: finding
title: "No property reaches a file backed reader marked computed"
slug: no-property-reaches-a-file-backed-reader-marked-computed
domain-slug: domain/page-property-computed
---

# Claim

`definitionOf` at `shared/pages-access/src/file-property-defs.ts:88-99` builds a `config` holding only `options`, never `expression`, and `isComputed` at `shared/pages-core/src/formula/resolve.ts:33-34` reads exactly that key. So no property built on the file path is ever seen as computed, and the 74 property definitions carrying an `expression:` are invisible as computed to every reader on it.

# Evidence

Measured 2026-08-28 at `08d5363e90`.

74 property definition documents carry an `expression:` key.

The break is three links, and `expression` is gone two above `definitionOf`. `declarationOf` at `tools/lib/page-query-shape.ts:95-110` builds the nine fields of its `Declaration` at `:31-41` off row values that do carry the key; `DeclarationSchema` at `shared/pages-query/src/ask.ts:229-239` re-declares the same nine; `definitionOf` at `file-property-defs.ts:88-100` imports that type at `:1` and emits `id`, `key`, `title`, `type`, `pageId` and, where options exist, `config.options`. Repairing it alone changes nothing.

`isComputed` at `shared/pages-core/src/formula/resolve.ts:33-34` is `isExpressionConfig(definition.config)`, which at `:25-26` requires an `expression` key holding a string. It answers false for every definition this path builds.

Two consumers turn on it. `resolveComputedProperties` at `resolve.ts:52-53` filters the definitions by `isComputed` and returns the data untouched where that list is empty. `shared/pages-ui/src/components/use-live-now.ts:9` asks whether any definition is computed and live, so no file-backed page ever holds a live formula.

Nothing fails loudly. Values arrive already computed from the server side, so a column renders its number and only its computedness is lost.

Two halves of the reading this came from are stale and are not claimed here. Zero property definitions carry `type: formula` and only two markdown files in the repository mention `returnType`, so the `type: "formula"` branch at `shared/pages-core/src/schema/pages.ts:126-131` — whose `formulaConfigSchema` at `shared/pages-core/src/schema/property-config-schemas.ts:137-139` requires `expression` — is never taken, and no resolved type stays `formula`.

`pages/finding/pages-system/colour-rules-are-expressible-to-no-reader.finding.md` names the same function for a different dropped key.

Not measured: how many of the 74 have a reader on the file path at all.
