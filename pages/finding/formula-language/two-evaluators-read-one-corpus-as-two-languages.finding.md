---
id: 01a047a5-3459-7d42-8f39-4e4be843b437
slug: two-evaluators-read-one-corpus-as-two-languages
page-type-slug: finding
title: "Two evaluators read one corpus as two languages"
domain-slug: domain/formula-language
---

# Claim

Two evaluators stand live over one corpus of 74 formulas and implement different languages rather than one language twice: `tools/lib/page-expression.ts` reads 59, `pages-system/formula/` reads 19, four are read by both, and measured agreement is zero out of 74.

# Evidence

Measured 2026-08-28 at commit `37e0955be`. The population is all 74 property definitions carrying an `expression`, taken through `declarationsIn(resolveRoots())`, the reader `tools/lib/page-derive.ts` uses. Each text was put through `parse` from `tools/lib/page-expression.ts` and `readFormula` from `pages-system/formula/read.ts`, and the four read by both were then run on values through `evaluate` and through `checkFormula`/`runFormula`.

- read by the old evaluator: 59
- read by `pages-system/formula/`: 19
- read by both: 4
- read by neither: 0
- agreeing in meaning: 0

The intersection is the only part that fails silently: outside it each evaluator refuses what it cannot read. The four both read are the fully double-quoted ones. The old tokenizer takes the whole text as a single literal and returns its characters; the new one fills each reference where it stands, at `pages-system/formula/tokens.ts:91-117`. Over the same values:

- `"{source-slug}-{date}"` — old answers `{source-slug}-{date}`, new answers `alan-2026-08-28`
- `"{persona-slug}-anchor"` — old answers `{persona-slug}-anchor`, new answers `astra-anchor`
- `"{person-slug}-{access-kind}-{target}"` — old answers the braces, new answers `alan-read-x`
- `"{source-slug}-{seat-name}-{date}"` — old answers the braces, new answers `alan-astra-2026-08-28`

The languages are disjoint by construction. `pages-system/formula/tokens.ts:55-69` refuses `|`, `!`, `'`, `.` and `[`, each with advice naming what to write instead, and the language has no `prop(`. Constructs used by the 55 that only the old evaluator reads: 15 use `||` as a truthiness cascade where `??` is absent-fallback only; 11 use `if(a,b,c)`; 9 multiply a boolean by a number; 9 compare against `null`; 6 use `parseInstant`; 5 use `containsText`; 5 concatenate text with `+`; 4 use single-quoted text. None uses `%` or `!`.
