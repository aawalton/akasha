---
id: 921f485f-7c10-56c8-aef4-66c2a8310027
slug: new-exports-carry-no-editor-pragma
page-type-slug: finding
title: "New status-bar exports carry no keep pragma, so one the code editor reads reports as unreached"
domain-slug: domain/unused-code
---

# Claim

The `ast-unused` keep-pragma exempts only the symbol on the line after it, and the export blocks #19387 added to `@shared/status-bar-access` carry none — so `foldProjectProgress`, which the code editor reads, now reports as an export nothing reaches.

# Evidence

Measured on 2026-08-18 verifying #19376. `ops audit ast-unused` weighed 36,010 exports over 13,515 files at complete coverage and named 29, seven of them re-exports from `packages/shared/status-bar-access/src/index.ts`: `DoneByColumn`, `ProjectCountGroup`, `foldProjectProgress`, `FinishedSince`, `ProjectLineageRow`, `PAGE_QUERY_SERVICE_URL` and `PAGE_QUERY_TIMEOUT_MS`.

`foldProjectProgress` is reached. `extensions/ops/src/features/status-bar/readers.ts:27` returns `foldProjectProgress(s)[column][bucket]`, which is the status bar's ten project numbers, and `slots.ts` reads it too. The audit's entry set is `tools/` in the instructions repository plus this repository's own source; the editor's tree is in neither, so the edge is invisible by construction.

That much `pages/finding/code-editor/editor-contract-unmeasured.finding.md` already records. What is new is that the pragma protecting against it is PER-SYMBOL, not per-block. In that same file the comment sits between `DoneByColumn` and `ProjectCountColumn`, and the audit reports `DoneByColumn` and skips `ProjectCountColumn` — so the exemption reaches one line down and no further. Every block #19387 added carries no pragma at all.

The cost is that the reading which decides `unused-code` now carries a live false positive, and deleting what it names would blank Alan's status bar the same way #19387's original brief would have. Nothing distinguishes the false one from the twenty-eight others in the output.
