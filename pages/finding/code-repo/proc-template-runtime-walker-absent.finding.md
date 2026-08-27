---
id: bbdbef70-08b7-5d67-adbc-ed03d3a1ccfc
page-type-slug: finding
title: "Proc template runtime walker absent"
domain-slug: repo/code-repo
---

# Claim

`@shared/proc-template` tells its readers it has a runtime walker, and the package has none.

# Evidence

`packages/shared/proc-template/src/sql.ts:7-9` reads "the compile path emits the body verbatim with `${arg}` references resolved to the parameter name; the runtime path replaces them with bind positions", and line 21 reads "all the work lives in the compile / runtime walkers". `src/types.ts` says it twice more, at `ArgRef` and at `SqlTemplate`.

There is no runtime walker. `src/` holds `compile.ts`, `compile.unit.test.ts`, `index.ts`, `sql.ts` and `types.ts`, and `compile.ts` is the only walker. `index.ts` exports `compileUnknown`, `defineProc`, `sql` and four types, so `isArgRef` — the predicate any runtime walker needs to spot an interpolated arg — is off the public surface, and nothing outside `packages/shared/proc-template/src/` imports it.

The repo says elsewhere that the arm was removed rather than never built. `packages/shared/pages/proc-compiler/src/page-hard-delete-by-ids.equiv.database.test.ts:5-6` reads "the runtime arm is gone (SQL-template procs have no TS-runtime impl)". Five more SQL-template procs' tests agree in their headers: `_affected-page-types.equiv.database.test.ts:5-7`, `_enforce_content_storage.unit.test.ts:8`, `awen-back-update-window-beat.unit.test.ts:8`, `_assert_rows_match_schema.unit.test.ts:9` and `_enforce_page_schema.unit.test.ts:7`.

What makes this durable rather than a comment nobody reads: the sentence correcting it used to stand in the package's own head document, which is now quarantined in the instructions repo at `dirty/code/packages-shared-proc-template-claude.md` and is absent from `packages/shared/proc-template/CLAUDE.md`. The correction left the code repo and the stale comments stayed, so an author opening the package today meets only the false account.

Found while ingesting `dirty/docs/ts-to-plpgsql-sql-template.md`, whose whole distinguishing claim rested on the same missing arm; that source is now emptied and removed.
