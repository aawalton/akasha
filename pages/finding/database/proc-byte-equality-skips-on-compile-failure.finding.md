---
id: f945065f-d379-57ff-abad-a2ff9452e660
slug: proc-byte-equality-skips-on-compile-failure
page-type-slug: finding
title: "Proc byte equality skips on compile failure"
domain-slug: domain/database
---

# Claim

The migration gate that requires a plpgsql function's SQL to match its TypeScript source stops applying to any procedure whose compile breaks, and says so only on stderr while exiting clean.

# Evidence

`no-raw-proc-mutation` is a pre-apply migration check. Its contract, from its own header: a `CREATE OR REPLACE FUNCTION public.<name>` whose name is TS-authored "must be byte-equal (CR/LF-normalized) to the compiler's emit of the current TS source", and a `DROP FUNCTION` is allowed only beside such a byte-equal CREATE. It is registered in `packages/shared/supabase/migrations/cli/src/lib/checks/registry.ts` and reached from `migration/check.ts:90` and `lib/apply-migration.ts:191`.

The comparison only happens for procs that compile. `lib/checks/no-raw-proc-mutation-io.ts:186-203` walks every proc source, and at lines 199-201 does:

    const expected = compileProcSource(ps, repoRoot)
    if (expected === null) continue
    entries.push({ procSource: ps, expectedCreateSql: expected })

`compileProcSource` returns null on any thrown error, after `process.stderr.write("[no-raw-proc-mutation] failed to compile <file> (proc=<name>): <msg>")` at lines 164-171. Nothing counts these, nothing reports them in the violation list, and the check's exit code does not move. A proc with no entry is simply not compared, so its migration may carry any SQL at all under that name.

This is reachable today and not hypothetical. `bun packages/shared/pages/proc-compiler/src/bin/compile.ts _apply_json_patch_op` exits 1 with `lowerArgsAccess: unsupported expression applyJsonPatchOpRaw(target, op)`, so `_apply_json_patch_op` and `_apply_json_patch` already stand outside the gate. That exemption is keyed on a compile failure rather than on a declared list, so any procedure that stops compiling for any reason joins them silently.

It compounds with the absence of `check-proc-subset` (filed separately): a forbidden construct is caught by no gate, breaks the compile, and the broken compile then removes the byte-equality gate too.

Found while ingesting `dirty/docs/ts-to-plpgsql.md`, which describes the skip as the mechanism sanctioning its two hand-mirrored helpers.
