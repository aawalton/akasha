---
id: 8582d15a-6739-54c8-bcee-8fed2c328a95
slug: expressions-unevaluated-in-files
page-type-slug: finding
title: "Expressions are worked out only on the database side, so a file-backed type can carry no formula property"
domain-slug: domain/pages-system
---

# Claim

A property definition's `expression` is worked out only on the database side. On file-backed pages, computed properties are a hardcoded TypeScript map holding one entry, so a page type that has moved into files cannot carry a formula property at all.

# Evidence

`properties/page-property-definition-expression.md` declares the key, and formulas are in real use: `properties/collection-total-remaining-in-words.md` carries `expression: totalLengthInWords - totalProgressInWords`, and other collection properties carry conditionals of the form `(a > 0) && "x" || "y"`.

`tools/lib/page-computed.ts` is ten lines. Its `COMPUTED` map holds exactly one entry, `seat-presence`. `tools/lib/page-derive.ts` consults that map at line 313 and tests membership at line 203, and neither it nor `tools/lib/page-query.ts` mentions `expression` anywhere. The lexer, parser and evaluator stand in the code repository at `packages/shared/pages/core/src/formula/`, 24 files, which the instructions repository does not import from.

Every page type carrying a formula today declares `files: none`, so none is file-backed. That is why the gap has not been felt: the two sets have not overlapped until now.

Not measured: whether the code repository's evaluator would give the same answer as a second one written here, on any expression more involved than a comparison. Not measured: how many page types would want a formula once they could have one. The reading was taken by reading source, not by running either evaluator against the other.
