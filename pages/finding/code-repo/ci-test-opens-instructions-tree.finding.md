---
id: 60f8b4a1-3ea8-52b8-8297-8dd41ef1ac8e
page-type-slug: finding
title: "A code-repo unit test opens the instructions tree, so its verdict moves with a diff the branch does not show"
domain-slug: repo/code-repo
---

# Claim

A unit test in the code repository opens the instructions tree on disk, so its verdict moves with a repository whose diff the failing branch does not show.

# Evidence

Measured on 2026-08-18 while checking whether `domains/repos/code-repo.md`'s intent "No check or test in the code repo reaches the instructions repo" holds.

`packages/shared/cli-core/src/ops-dispatcher.unit.test.ts:31` asserts `existsSync(opsDispatcherPath())` is true. `opsDispatcherPath()` resolves to `$INSTRUCTIONS_ROOT/tools/ops/cli.ts`, falling back to `$HOME/instructions/tools/ops/cli.ts`, and the two tests above it in the same file set and clear `INSTRUCTIONS_ROOT` around it without pinning it for this one. So the assertion reads whichever instructions checkout the run stands in: on the workstation the live one, and in CI the tree the run acquired, which `packages/infra/ci/orchestrator/src/ci-pod-dispatcher/pod-spec/trees.unit.test.ts` shows is set on every step pod. Moving or renaming `tools/ops/cli.ts` in the instructions repository fails this test on every code branch at once, with nothing in the code repository having moved.

It runs in CI: `packages/infra/checks/src/checks.workflow.ts` fires the `check` workflow on every push to a non-main branch, and `packages/infra/tests/run-workspace-tests.sh` runs `bun test` over every `*.unit.test.ts` under `packages/`.

The boundary is otherwise held. `packages/infra/checks/src/checks/check-instructions-citations.ts` is a CI check that reads only the code repository and reports any file there naming a path in the instructions repository — it enforces this boundary rather than crossing it. `packages/agents/shared/seat-defaults.unit.test.ts:34` sets `INSTRUCTIONS_ROOT` to `/nonexistent-instructions-root` before exercising the same shim, which is the shape that does not reach. The breach recorded in `pages/finding/agent-harness/code-test-pins-instructions-contract.finding.md` no longer stands in `packages/agents/shared/project-binding.unit.test.ts`.

This is the one live reach found, and it is a single assertion. `domains/repos/code-repo.md` states under Local Verdict that such a test is deleted rather than repaired.
