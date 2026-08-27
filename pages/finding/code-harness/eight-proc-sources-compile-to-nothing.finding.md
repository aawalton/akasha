---
id: e9a3f1fc-1edf-5e7b-af14-68372ae616c9
page-type-slug: finding
title: "Eight proc sources compile to nothing and no run reports it"
domain-slug: domain/global
---

# Claim

The proc compiler refuses 8 of the 70 sources that have a deployed counterpart. It throws on the first file attempted, so nothing accumulates a report, and no check runs it across the tree. The deployed routines those 8 name were written by another hand, so a seat sent to fix one edits TypeScript that has no path to the database and reports success having changed nothing.

# Evidence

Measured 2026-08-20 by running the compiler over all 70 sources, not by reading it.

The eight and where each throws: `_pages_row_matches`, `_pages_project`, `_page_relation_props`, `_pages_emit_db_result`, `_apply_json_patch_op`, `_pages_split_properties`, `_extract_relation_ids`, `_apply_json_patch` — at `lowering-args.ts:39`, `lowering-variables.ts:79`, `top-level.ts:65` and `lowering-for-of.ts:41`.

The deployed `_pages_row_matches` is hand-written plpgsql, not compiler output: it uses bare locals where the compiler emits `v_`-prefixed names, and carries a prose comment the compiler cannot emit. The TypeScript has around 20 `return true` sites; the live routine has 2. They are different implementations wearing one name. `_page_relation_props.ts` and `_pages_emit_db_result.ts` are not proc sources at all — they are async TypeScript clients taking a `PgClient` and issuing `SELECT ... FROM public._page_relation_props($1::uuid)`.

`_pages_row_matches.unit.test.ts` passes 8 tests against the twin that reaches no database.

A dead-code sweep of this tree is unsafe for the same reason the drift is invisible: `proc-compiler/src/compile.ts:26` does `readFileSync(sourcePath)`, consuming proc sources as text by path, so no import graph reaches them. A sweep flagged 18 files and 17 were live proc sources.
