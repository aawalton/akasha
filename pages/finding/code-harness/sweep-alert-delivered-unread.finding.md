---
id: 2fc86b02-b6b5-5685-8124-dd9eaf28ead7
slug: sweep-alert-delivered-unread
page-type-slug: finding
title: "Sweep alert delivered unread"
domain-slug: domain/global
---

# Claim

The nightly slow-suite sweep detected this red main and delivered an urgent alert naming the file, and the break was still found by a blocked project's touched-file gate several hours later. The gap is between a delivered alert and someone acting on it, rather than anywhere in the detection.

# Evidence

Migration #5593 landed on main as `4ac9b722af`, committed 2026-08-14 06:23 UTC, turning three tests in `packages/shared/status-bar-access/src/get-status-bar-snapshot.database.test.ts` red on a clean checkout.

Branch CI cannot see a `.database` suite. `TEST_TYPES` in `packages/infra/checks/src/lib/test-step-paths.ts` is `unit`, `property` and `component`; the loader's glob admits only those, and `packages/infra/tests/run-workspace-tests.sh` refuses any other type outright. The merge queue's staging CI runs the same workflow object, so it is blind the same way.

The instrument covering this case is the `slow-suite-sweep` CronJob in namespace `ci`, scheduled `17 9 * * *` and not suspended. It clones main and runs every `integration`, `data`, `cli` or `database` suite.

It ran on schedule at 09:17 UTC on 2026-08-14, about two and a half hours after the break landed, and completed. Its logs name the failures at lines 115, 220 and 418 of that file — the same three. It reported `RED — 3 failing file(s)`, counted all three as having entered the red set, and recorded `told 'dalla' about 3 file(s)` and `sent one ledger message to 'dalla' (verdict=fail)`.

The repairing row was opened hours after that delivery, from behind #18824, which met the same failures at its workstation touched-file gate. That gate is scoped to a branch's diff and reached this file only because unrelated comment renames pulled the package into the branch's closure, so it could not have found a main break except by coincidence.

Two other files were red in the same sweep, unrelated to that migration: `packages/shared/cli-core/src/verdict-channel.cli.test.ts` and `packages/temper/watcher/cli/src/temper/watcher/logs.cli.test.ts`.

The sweep's own source records this failure mode already: a comment in `run-sweep-and-notify.ts` states the nightly ledger carried the whole red set and was ignored for eight consecutive nights, which is why the second change-only message exists. This run sent that second message and the outcome was the same.
