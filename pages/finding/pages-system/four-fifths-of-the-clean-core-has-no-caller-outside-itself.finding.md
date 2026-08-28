---
id: d8c00168-cf90-5d6d-833f-abcfe29a36f0
page-type-slug: finding
title: "Four fifths of the clean core has no caller outside itself"
slug: four-fifths-of-the-clean-core-has-no-caller-outside-itself
domain-slug: domain/pages-system
---

# Claim

Four of the five things under `pages-system/` are reached by nothing outside it. Exactly 12 files outside `pages-system/` import from it, and all 12 import `pages-system/page-type/` alone; `store/`, `query/`, `formula/` and `name/` have zero external importers. So the clean core that callers are to be moved onto is, apart from one function, built and unconsumed — nothing to migrate, and no evidence yet that its surface is the right one.

# Evidence

Measured 2026-08-28 at `14f64d76a5`.

Every external import of `pages-system/` resolves to `page-type/`, 12 of 12:

`page/index/relation/relation.ts`, `page/page-types.ts`, `page/page-type/unsplittable.ts`, `page/property/registry.ts`, `page/required-reading/required-reading.ts`, `tools/audits/domain-edges.ts`, `tools/commands/page/suffix.ts`, `tools/lib/champions-asked.ts`, `tools/lib/champions-roster.ts`, `tools/lib/domain.ts`, `tools/lib/seat-page.ts`, `tools/lib/seat-vocabulary.ts`.

External importers by subdirectory: `page-type` 12, `store` 0, `query` 0, `formula` 0, `name` 0.

The imports are relative paths rather than a package specifier. `pages-system/` carries no `package.json`, and `pages-system/tsconfig.json` extends `../tsconfig.base.json` with no `paths`; it is a project reference from the root `tsconfig.json:160`.

`query/` is imported only from inside `pages-system/store/`, and every one of those is type-only: `store.ts:31`, `declared.ts:18-19` and `row-pages.ts:28`, beside three test files.

Three mentions that are not imports and do not change the count: `page/shape/mark.ts:17` and `page/property/type-cache.ts:31` hold the string `pages-system/page-type` in a pinned-root list, and `editor-extension/src/features/page-tree/harness.ts:61` names `pages-system/query/` in a comment saying nothing reaches it.

`pages/finding/pages-system/the-new-default-name-formula-is-wired-to-nothing.finding.md` is the `name/` case in particular, where the default formula is reached by zero page types.

Not measured: whether the unreached surfaces are the ones a caller would want.
