---
id: 87f74a77-2eba-518a-bdbc-99b562340aba
page-type-slug: finding
title: "Two composed-query fields have no caller"
domain-slug: domain/page-queries-system
---

# Claim

`count-by` and `offset` stand in `ComposedQuery` and nothing anywhere passes either. `count-by` is declared, allow-listed, parsed and covered by tests, and no production file and no page query names it. `offset` is declared and nothing names it at all — not one call site, not one of the ninety-two page queries.

# Evidence

Measured 2026-08-28 in akasha at `f4775605f` on `main`, by ripgrep over `*.ts` and `*.tsx` outside `node_modules` and built `dist/` trees, and over every `*.page-query.md` — 92 under `pages/` and 17 under `readouts/`, 109 in all. 92 files also mention `askComposed`, and they are not the same 92.

**`count-by` has no caller.** Searching the 92 `askComposed` files for the exact spelling `"count-by"` returns one hit, the declaration at `shared/pages-query/src/ask.ts:37`. Across the whole repository the spelling appears four times — that declaration, the allow-list entry at `tools/lib/page-query-bind.ts:30`, the parse at `tools/lib/page-query-fields.ts:39`, and one HTTP case at `tools/tests/page-query-narrow.test.ts:81`. No `*.page-query.md` page carries a `count-by:` key.

Five files name it without calling it: `tools/tests/page-query-narrow.test.ts:81` quoted, and beside it `page-query-reduce.test.ts:73,79`, `page-query-read.test.ts:35` and `page-derive.test.ts:172` as fixture text or test names, plus `tools/lib/page-query-answer.ts:28`, the refusal string listing every field a query may state. A looser `count-by|countBy` search adds only `countById` at `temper/game-combat-addon/src/actions/engine/refine.ts:39` and `countByStatus` at `tools/commands/temper/community-addon/list.ts:44`, neither a query.

**`offset` has no caller.** No `*.page-query.md` page carries an `offset:` key. Among the 92 `askComposed` files the spelling appears twice, neither a query field: `shared/pages-access/src/file-read.ts:440`, inside `Omit<GetFilePagesArgs, "limit" | "offset" | "withCount">`, and `smilingjenny/web/app/lib/db.server.ts:115`, a parameter. `tools/lib/page-query.ts:165-166` slices by it, so the field works; nothing asks.

Not measured: whether the four `count-by` sites and the `offset` slice can go before the package around them is ablated.
