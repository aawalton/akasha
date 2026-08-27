---
id: 63ad9e93-67ce-5046-805f-629b10289d47
slug: psql-sigpipe-notice-lost-under-load
page-type-slug: finding
title: "Psql sigpipe notice lost under load"
domain-slug: domain/database
---

# Claim

A consumer that closes early CAN take the exit code away from `ops db psql`, which is the one outcome `psql-outcome.ts` is built to prevent. Whether it does turns on machine load, so the suite guarding it fails only under a loaded shard and passes on every re-run.

# Evidence

`packages/shared/supabase/cli/src/db/psql-outcome.ts:96` maps a `signalled` termination whose signal is `SIGPIPE` to `exitCode: EXIT.OK` with a stderr notice reading "THIS IS NOT A COMPLETE RESULT", so a downstream `| head -3` truncates the answer without failing the command. `packages/shared/supabase/cli/src/db/psql.cli.test.ts:118` asserts exactly that, under the describe "a consumer that closes early gets no vote on the exit code".

Under the slow-suite gate on `project-19104` at `7de93fdc27`, shard 3 of 11 (420 tests across 53 files) failed that one test. Its stderr held no notice at all:

    could not print result table: Resource temporarily unavailable
    error: "ops" exited with code 1

That is psql's own EAGAIN text. psql never received `SIGPIPE`; it got a would-block on the closed pipe and exited 1 on its own, so `psql-outcome.ts` took the `exited` arm rather than the `signalled` one, and the truncation notice the arm exists to emit was never written. The consumer got its vote.

Run alone the same suite passes 16 of 16, three times consecutively. The parting variable is load: 53 suites sharing the shard against 1 on its own.

This is not the sweep. Every branch change under `packages/shared/supabase/cli/src/db` is a comment deletion — 297 lines removed, 0 added across 8 files, and no removed line was a pragma.

Two readings fit and the evidence here does not part them. Either the `exited` arm should carry the same truncation notice when the exit follows a closed consumer, in which case the code has a hole a loaded machine finds; or the notice is unreachable in that arm by design and the test is asserting a race it cannot hold, in which case what stands is a test that fails only when the fleet is busy. Both leave a suite that reds a gate it did not measure.
