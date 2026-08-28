---
id: 623b0a4a-f647-5381-a7f0-578d330f4204
page-type-slug: finding
title: "Two formula evaluators differ in call contract"
slug: two-formula-evaluators-differ-in-call-contract
domain-slug: domain/formula-language
---

# Claim

The two live formula evaluators differ in call contract, so even a rewritten corpus is not a call swap.

# Evidence

Measured 2026-08-28 at commit `37e0955be`. `evaluate(text, reads)` in `tools/lib/page-expression.ts` is lazy, and lets `tools/lib/page-derive.ts:271-279` recurse per key under its own `walking` cycle guard. `runFormula(checked, {now, properties})` in `pages-system/formula/` wants every value up front and catches cycles earlier, in `checkPageType`.
