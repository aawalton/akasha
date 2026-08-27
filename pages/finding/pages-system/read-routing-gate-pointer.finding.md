---
id: cd2f8bc4-2740-502f-95ae-f556f3f28cff
slug: read-routing-gate-pointer
page-type-slug: finding
title: "Read routing gate pointer"
domain-slug: domain/pages-system
---

# Claim

A comment in `packages/shared/pages/access/src/routing-core.ts` sends a reader to a module that does not exist. Line 97 closes the composed-column routing invariants with "see the string-gate on `toReadColumn` consumers in `filters.ts`", and there is no `filters.ts` anywhere under `packages/shared/pages/access/src/`. The gate it names is real and stands at `filters-where.ts:36`.

# Evidence

`ls packages/shared/pages/access/src/ | grep -i filter` lists `filters-core.ts`, `filters-order.ts`, `filters-select.ts` and `filters-where.ts`, and no `filters.ts`. `grep -rn "toReadColumn" packages --include=*.ts` outside `dist/` finds consumers in `filters-where.ts` alone, at lines 36, 69 and 117.

The gate the comment points at is at `filters-where.ts:36`: `return typeof value === "string" ? (toReadColumn(key) ?? textRefForKey(key)) : refForKey(key)` — a non-string operand keeps to the type-preserving `attributes->key` jsonb path, which is exactly what the comment describes.

The pointer matters because the passage it closes is the one with no error attached. `routing-core.ts:88-97` states that `notIn`, negations, `isNull` and `isEmpty` must stay on the attribute path and that a timestamptz operand must be a parseable-timestamp string, and nothing refuses a violation of either — so a reader is being told to go read the enforcement, and the address is wrong.

Found while ingesting `dirty/knowledge/pages-value-placement.md`, whose own `code-path:` front matter named `filters-select.ts` for the same role. Both pointers are wrong in the same direction, which suggests the module was split and the comment was not repointed.
