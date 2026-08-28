---
id: 65018340-d379-56ef-881c-570c49d12531
page-type-slug: finding
title: "Carrying the expression through replaces right values with errors"
slug: carrying-the-expression-through-replaces-right-values-with-errors
domain-slug: domain/page-property-computed
---

# Claim

The 80 `expression:` properties already compute for a file-backed reader, through `pages-system/formula/`. What no reader gets is the mark. Supplying it the way the record points at — carrying `expression` into `PropertyDefinition.config` — turns on `resolveComputedProperties`, whose parser refuses 75 of the 80, so each right value would be replaced by a parse error.

# Evidence

Measured 2026-08-28 at `f4a82fa9e3`.

`tools/lib/page-derive-formula.ts:89-109` checks each `expression:` with `checkFormula` and runs it with `runFormula`, both from `pages-system/formula/formula.ts`, and `tools/lib/page-derive.ts:101` calls it. Read through `fileShapeOf` and `getFilePages`, the collection `Time After Time` carries `ownLength` 2.804967, `unitWords` 250 and `ownLengthInWords` 701.24175; `daily-tracking` rows carry `health-level` 0, 2, 3 and 4 against `health-stoplight` ⚫, 🟡, 🟢 and 🔵.

`filePropertyDefinitions("collection")` returns 48 definitions and 0 computed. Two arrive carrying `config.options`: `status`, and `completion`, whose page holds both `values:` and `expression:` and keeps only the first. What is dropped is `expression` alone.

Injecting each collection expression into its definition's `config` and calling `resolveComputedProperties` over that same row makes 12 definitions computed and replaces `ownRemaining` 2.804967, `ownLengthInWords` 701.24175, `totalLengthInWords` 701.24175 and `completion` "not-started" each with `{"__formulaError":"Unexpected character '{' at position 1","code":"parse_error"}`.

Over the 80, `parseExpression` from `shared/pages-core/src/formula/parser.ts` reads 5 and refuses 75; `readFormula` from `pages-system/formula/read.ts` reads 80 and refuses 0.

The mark buys nothing today. `shared/pages-ui/src/property-types/property-badge.tsx:84` wants a formula error that never arrives, and `shared/pages-ui/src/components/use-live-now.ts:9` wants a `live:` no property definition carries. Computedness is already known where it is enforced: `computedOn` at `page/property/computed.ts:108`, read at `page/property/declarations.ts:130` and judged at `page/property/judge.ts:140`.
