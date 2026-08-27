---
id: 3e4ef04b-75f1-5bf3-b6b0-0a64e0f46287
slug: proc-byte-equality-skip-set-is-a-quarter
page-type-slug: finding
title: "Proc byte equality skip set is a quarter"
domain-slug: domain/database
---

# Claim

Twenty of the 84 proc sources under `packages/shared/pages/proc/src/` fail to lower, so each is silently outside the byte-equality comparison `no-raw-proc-mutation` is read as applying to all of them. The skip set is a quarter of the package rather than the handful previously named, and every proc named in an earlier report is a member of it.

# Evidence

MEASURED AT ~/code HEAD `47a2a573e4`. Every non-test `.ts` under `packages/shared/pages/proc/src/` — 91 files — pushed through `bun packages/shared/pages/proc-compiler/src/bin/compile.ts <basename>` and classified on stderr:

    64  compile clean
    20  fail on a lowering capability gap
     7  "no top-level exported function" — library files, not procs

So 20 of the 84 files that expose a proc produce no entry for the byte-comparison, and the check exits clean over all of them.

FOUR SHAPES ACCOUNT FOR ALL TWENTY. `lowerVariableDeclaration: unsupported binding` (9: page-attributes, _page_relation_props, pages-for-view-classify, -fast-path, -fast-path-filters, -lateral-path, -stored-clauses, _pages_project, parse-int). `lowerArgsAccess: unsupported expression` (6: _apply_json_patch_op, -jsonb-ops, no-touch-keys, _pages_emit_db_result, _pages_row_matches, _pages_split_properties). `lowerReturnStatement: unsupported return shape` (4: _extract_relation_ids, pages-for-view-relation-sort, _resolve_sort_value-aggregate-branch, -rollup-branch). `lowerForOf: no captured cursor` (1: _apply_json_patch).

EVERY EARLIER NAME IS INSIDE IT. `pages/finding/database/proc-byte-equality-skips-on-compile-failure.finding.md` names _apply_json_patch_op and _apply_json_patch and gives no denominator; a #16858 worker named five more off one suite's stderr. All seven are in the 20.

MY FIRST SWEEP LIED AND THIS IS THE RE-RUN. Passing snake_case proc names produced 65 "failures", every one ENOENT — the compiler resolves the source path from the name as given and the files are kebab-case. The figures above pass basenames unchanged.

NOT MEASURED. Whether each of the 20 has a deployed `CREATE OR REPLACE` the gate would otherwise compare — this measures the compiler, not the migration set. And whether any of the 20 has drifted from its committed SQL, which is the question the skip makes unanswerable.
