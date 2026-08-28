---
id: 87f74a77-2eba-518a-bdbc-99b562340aba
page-type-slug: finding
title: "Two composed-query fields have no caller"
domain-slug: domain/page-queries-system
---

# Claim

`count-by` and `offset` stand in `ComposedQuery` and nothing anywhere passes either. `count-by` is declared, allow-listed, parsed and covered by one test, and no production file and no page query names it. `offset` is declared and nothing names it at all — not one call site, not one of the ninety-two page queries. A declared field with no consumer reads exactly like a live one, so each is a capability a reader would build to and a reader would preserve. Neither should be built into the clean query core, and neither should be deleted on its own: both sit in the package being ablated and go with it.

# Evidence

Measured 2026-08-28 in akasha at `f4775605f` on `main`, by ripgrep over `*.ts` and `*.tsx` outside `node_modules` and outside built `dist/` trees, and over every `*.page-query.md`.

**`count-by` has no caller.** Ninety-two files mention `askComposed`. Searching those files for the exact field spelling `"count-by"` returns one hit, and it is the declaration itself: `shared/pages-query/src/ask.ts:37`. Across the whole repository the spelling appears four times — that declaration, the allow-list entry at `tools/lib/page-query-bind.ts:30`, the parse at `tools/lib/page-query-fields.ts:39`, and one HTTP case at `tools/tests/page-query-narrow.test.ts:81`. None of the ninety-two `*.page-query.md` pages carries a `count-by:` key.

A looser search for `count-by|countBy` reaches two further files, and both are false positives worth naming so the next reader does not count them: `temper/game-combat-addon/src/actions/engine/refine.ts:39` declares a local `countById` map, and `tools/commands/temper/community-addon/list.ts:44` declares a function `countByStatus`. Neither is a query.

**`offset` has no caller.** No `*.page-query.md` page carries an `offset:` key. Among the ninety-two files mentioning `askComposed`, the spelling appears twice and neither is a query field: `shared/pages-access/src/file-read.ts:440` names it inside `Omit<GetFilePagesArgs, "limit" | "offset" | "withCount">`, which is another package's argument type, and `smilingjenny/web/app/lib/db.server.ts:115` is a function parameter. The implementation honours it — `tools/lib/page-query.ts:165-166` slices by it — so the field works; nothing asks.

**What the other fields measure, for contrast**, over the same ninety-two files: `"sort-by"` twenty-seven occurrences across eighteen files, `descending` seventeen across thirteen. Over the ninety-two page queries: `keys` fifty, `where` twenty-four, `takes` twelve, `limit` nine, `sort-by` six, `function` and `target` five each, `descending` one, `count-by` none, `offset` none.

`limit` is not counted here. The pattern `limit:` catches unrelated APIs in the same files, and a count taken with it would not be a count of composed-query limits; what can be said is that of fifty numeric-literal `limit:` occurrences in those files, forty-one are `limit: 1`.

NOT MEASURED. Whether the four `count-by` sites and the implementation's `offset` slice can be removed before the package they sit in is ablated, which turns on nothing else reaching them through the HTTP shape rather than through the TypeScript type.
