---
id: 9bd21de6-cbd2-566e-a6b6-7d6d7e3df5a0
page-type-slug: finding
slug: a-refused-relation-query-reads-as-a-missing-target-page
title: "A refused relation query reads as a missing target page"
domain-slug: domain/pages-system
---

# Claim

`file-relation.ts:101` reads a refused page query as the target page not existing, so relation validation turns on whether a service answered.

# Evidence

Measured 2026-08-27 in akasha at `4bffaf7a5`.

`shared/pages-access/src/file-relation.ts:101` is `return asked.ok && asked.answer.rows.length > 0`. It reads through `askPage`, which returns `{ok: false}` for a genuine absence and for an unreachable service alike, so a refused query reads as the target page not existing.

A second flattening in the same file at line 110 took the seven-way outcome `nameOfPageId` returns and collapsed all of it to `null`, so a refused lookup reached the write refusal as the value a read corpus produces, and the refusal advised the writer to rename a value nothing had looked up. That one is gone rather than repaired: `file-write-values.ts` now switches on the outcome, licensing the rename advice only on `absent` and `malformed` — the two that mean the corpus was read. Line 101 is left standing.

Controls at `shared/pages-access/src/file-write-refused-read.unit.test.ts`: an ask answered empty is `absent` and an ask refused is `unasked`; a genuine absence still advises naming the file; a refused lookup refuses the write and advises no rename. Reinstating the flattening at runtime — `nameOfPageId` stubbed to answer `absent` whatever happened, with a counter proving the stub was on the path — brings the rename advice back on a refused read.

`ops tests run pages-system` does not reach this code: it runs 17 files under `pages-system/`, a different tree; 1,084 pass, 0 fail, before and after. The tests covering `shared/pages-access` are run by naming them: 407 tests across 32 files, 401 pass and 6 fail. The 6 are all in `file-view-relation.unit.test.ts`, all connection failures to the same deleted in-cluster service, and none on the changed path — the change to `file-relation.ts` is deletions only, leaving `standsUnder` and `getFilePagesByRelation` byte-identical.
