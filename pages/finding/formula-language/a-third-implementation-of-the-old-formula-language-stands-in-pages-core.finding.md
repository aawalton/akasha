---
id: e4472a06-50a9-5ee9-9058-729404230513
page-type-slug: finding
title: "A third implementation of the old formula language stands in pages-core"
slug: a-third-implementation-of-the-old-formula-language-stands-in-pages-core
domain-slug: domain/formula-language
---

# Claim

A third implementation of the old formula language stands at `shared/pages-core/src/formula/`, carrying functions `tools/lib/page-expression.ts` does not have.

# Evidence

Measured 2026-08-28 at commit `37e0955be`. `shared/pages-core/src/formula/` is 24 files, entered at `parser.ts:294`. It carries `count`, `toCalendarDate`, `parseCalendarDate` and `timeOfDay`; `tools/lib/page-expression.ts` has none of the four.
