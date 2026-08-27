---
id: 1c16c079-4efb-5ed4-8a34-99b2730e8692
page-type-slug: finding
title: "Sweep months figure unsupported"
domain-slug: domain/global
---

# Claim

The "rotted unseen for months" figure justifying the nightly slow-suite-sweep CronJob is contradicted by the repo's own commit dates, which put the reorg that staled the paths and the fix that repaired them one day apart.

# Evidence

Found while emptying `dirty/docs/test-lanes-and-capabilities.md`, which echoed the figure and was removed in this run. The figure is live code, so removing the document does not remove the claim.

`packages/infra/tests/src/run-slow-suite-sweep.ts:10-15` reads: "#15367's mega-reorg moved 15 `.cli.test.ts` files and staled their deep-relative `CLI_PATH` spawn paths (invisible to the import graph — a spawn edge, not an import edge) → 88 failures that rotted unseen on the CI-excluded lane until #15432 tripped over them months later." `packages/infra/ci/slow-suite-sweep/k8s/synth.ts:14` repeats "rotted unseen for months".

The dates:

- The move is `be500e63de`, "refactor(#15394): move @temper/inventory-cli (packages/temper/inventory/cli) → @temper/player-inventory-management-cli (packages/temper/player/inventory-management/cli)", dated **2026-07-14**.
- The fix is `b963adf27f`, "fix(#15432): correct ops CLI_PATH depth in inventory .cli.test.ts (reorg fallout)", dated **2026-07-15**.

One day, not months.

Two things are unresolved and are stated rather than settled. The comments attribute the reorg to #15367 and the move commit I found is #15394; `git log --follow` on the moved files showed no earlier move, but I did not exhaust the possibility that an earlier #15367 change staled a different set. And the 88 failures may have been introduced before the move rather than by it, in which case the window could be longer than the two commits bound.

Why it matters rather than being a wording quibble: this incident is the stated justification for a nightly in-cluster CronJob with a 90-minute deadline (`ACTIVE_DEADLINE_SECONDS = 5400`), and the "months" figure is what makes the dormant-rot window sound unbounded. A one-day window against a per-touch gate is a different case for that job than a months-long one. The job may well still earn its place — this is an observation about the evidence cited for it, not a proposal to remove it.
