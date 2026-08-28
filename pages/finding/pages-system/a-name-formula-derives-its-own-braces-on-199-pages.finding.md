---
id: 01a047a5-3459-75eb-866d-d5d37cc5358a
slug: a-name-formula-derives-its-own-braces-on-199-pages
page-type-slug: finding
title: "A name formula derives its own braces on 199 pages"
domain-slug: domain/pages-system
---

# Claim

199 pages carry a name that is their name formula's own text, braces and all, with no fault raised.

# Evidence

Measured 2026-08-28 at commit `37e0955be` by running the real deriver over the working tree — `deriver(resolveRoots()).rows(pageType)` — and reading the rows and `faults()` it returned. Observed, not reasoned from the code.

The population is all 74 property definitions carrying an `expression`, taken through `declarationsIn(resolveRoots())`, the reader `tools/lib/page-derive.ts` itself uses. Nineteen of the 74 are written in the `{key}` reference language, every one filling `name`. `tools/lib/page-expression.ts` is the only evaluator on this path — imported at `page-derive.ts:22` and called at `page-derive.ts:271` — and it has no `{`: `tokenize` falls through to `refuseCharacter` at `page-expression.ts:136`.

Fifteen of the nineteen therefore fault and derive `name = null`. Verbatim for `calendar-event-source-name`, and the same for `error-name`, `gm-doctrine-pack-name`, `notification-feed-name` and eleven more, differing only in the name:

```
`calendar-event-source-name` states an `expression` this evaluator refuses: the character `{` at position 0 is not implemented
```

The other four are wrapped in double quotes, so the tokenizer reads the whole text as one literal at `page-expression.ts:75-88` and hands its characters back unchanged. Nothing is parsed as a reference, so nothing refuses. Rows walked at HEAD:

- `person-access` — 15 rows, every one named `{person-slug}-{access-kind}-{target}`
- `persona-anchor-image` — 38 rows, every one named `{persona-slug}-anchor`
- `seat-log-day` — 146 rows, every one named `{source-slug}-{seat-name}-{date}`
- `log-day` and `pipeline` carry the same shape and have 0 rows today, so they are latent rather than live

199 pages, and within each page type the whole population shares one name. This stands on the file path, through the deriver, independent of any query or browser path.
