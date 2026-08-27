---
id: 30be9cbb-35a2-55e0-9ccc-d9d045e56a26
page-type-slug: finding
title: "Reconcile watch comment contradicts callee"
domain-slug: domain/supervisor
---

# Claim

`reconcile.ts:8,40` asserts workers reload via `bun --watch` grandchildren, while the function it calls, `spawn-worker-process.ts:6,19,155`, explicitly forbids `--watch` on the grandchild citing a production incident (#10211); a live kubectl check confirms the callee is correct (no `--watch` in the running process), and the wrong comment already produced a false mechanism claim in a post-deploy verification report (#16242).

# Evidence

Project #16339 (domain: supervisor, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

Contradiction, same directory: `reconcile.ts:8,40` (`packages/infra/ci/orchestrator/src/dispatcher/`) asserts `bun --watch` grandchildren (reload wipes JS heap); its callee `spawn-worker-process.ts:6,19,155` forbids `--watch` on the grandchild, citing incident #10211.

Settled by observation: `kubectl get deploy -n workers worker-supervisor` container command → `["bun","/app/repo/packages/shared/worker-supervisor/src/main.ts"]`, no `--watch`; `ps -eo args | grep -c -- --watch` → 0. The callee is correct, reconcile.ts wrong — new code reaches a running system by child respawn off git-synced `/app/repo`, not watch reload or pod roll.

Cost: produced a false mechanism claim in post-deploy verification report #16242, from an agent that spent the evening catching this class — its own diagnosis: "I took it from the docblock of the file I was editing instead of from the running process." Two agents gave opposite, verified accounts of the same pod within an hour.

Why filed not fixed inline: worker-16242 found and verified but didn't fix it; its claim on #16242 was released, and every tracked-file change must connect to a project.

Instance seven of that evening's class (right when written, later stale): ci-class pin (1 member when written, 4 since #14409); `WORKTREE_CONFIG_LOAD_CAP_MS` (moved into a child by #15625); supervisor's 4-core request (drawing 6.5); a `timings` object passed to nobody; a PSI tripwire naming an unscrapeable metric; `graph-build-memo.ts:11-13` asserting cache-miss steady state vs measured 77.6% HIT.

Verification: fix is a comment correction, checkable by reading; `--watch` prohibition is greppable and explicit.

Search widths: both files grepped complete for `watch` (5 cited lines, all occurrences); runtime absence confirmed by container spec + process count. Did not survey other callers of `spawn-worker-process.ts`.
