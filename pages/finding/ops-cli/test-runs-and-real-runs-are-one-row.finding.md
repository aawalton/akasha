---
id: 01a02019-a025-7000-928b-2dd1dda8b8f1
slug: test-runs-and-real-runs-are-one-row
page-type-slug: finding
title: "A test run and a real run are one metric row, so ops run counts answer nothing"
domain-slug: domain/ops-cli
---

# Claim

`domains/ops-cli.md` states as Intent that how often each ops command runs can be answered from what is recorded. It cannot. Every `ops-*.on-demand.test.ts` spawns the real CLI, which emits a metric per invocation, and no label marks a test run, so a command's count measures how often its test file ran rather than how often anyone used it. A standing finding reads these counts as answering the question.

# Evidence

Measured 2026-08-20 with psql against public.metrics. Horizon 2026-07-16 to 2026-08-20, 1,742,682 rows of `ops.command.duration_ms`.

The mechanism was run, not inferred. `tools/tests/ops-page-type-property-defs.on-demand.test.ts:8` spawns `bun tools/ops/cli.ts page-type property-defs`. Running that one file put 8 tests through it and the command's row count went 6988 to 6996, exactly +8. `tools/ops/cli.ts:46` emits on every dispatch, whatever the caller.

The label keys, re-queried over 30 days rather than relayed, are branch, checkout, exit_code, namespace, retired_status, retired_status_agent, seq, success and the command name. None marks a test; none names a flag.

The signature is uniformity where meaning differs. Across page-type and property-definition: undelete 3278, hard-delete 3263, delete 3306, zero-rows 3273, rematerialize 2796, list 2776. Commands carrying no test file sit two orders lower: page complete 64, uncomplete 50, revert 56, reschedule 72, each 0 in the last three days.

Exit codes corroborate: `voice run` has 63,572 runs and 36 exit 0, so 99.9 percent non-zero; `agent compact` 99.4, `agent reset` 99.3, `page-type create` 97.2.

This corrects `command-parts-and-flag-record-still-short.md`, which states run counts are answerable today and cites `voice run` 63,572 among them. Its flag half stands; its run-count half does not.
