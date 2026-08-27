---
id: d2f4f542-0dae-5cc6-a075-789046a63f3d
page-type-slug: finding
title: "Within tick liveness rows uncommitted"
domain-slug: domain/agent-fleet
---

# Claim

The merge-queue coordinator DOES write batch-keyed progress rows throughout its
multi-minute staging build, but every one inherits the caller's reconcile
transaction — so they are invisible to any outside reader until the tick commits
and vanish when it rolls back. A within-tick liveness signal that looks available
is therefore not available, and the devops-monitor's busy-subscriber discriminator
has none: both of its evidence sources land at tick END.

# Evidence

Read 2026-08-07 while ingesting `dirty/code/packages-agents-devops-monitor-docs-discriminators.md`,
whose blind-spot passage asserts "the coordinator persists no batch-keyed progress row during the
build, so none exists to key on". The conclusion holds; the reason is wrong, and the real one is
sharper.

ROWS ARE WRITTEN. `packages/infra/ci/merge-queue/coordinator/src/coordinator/emit-staging-prep-metrics.ts`
emits `merge_queue_coordinator.staging_prep_duration_ms` keyed on `batch_seq` and `operation`, per
sub-operation of the ~190s staging window — clone, cherry-pick, install, force-push and the dispatch
sub-steps, by its own header.

THEY CANNOT BE READ FROM OUTSIDE. Same header, :8-11: "every metric INSERT runs on the supplied
`PgClient` and inherits the caller's reconcile transaction, so a timing row commits-or-rolls-back in
parity with the staging work it measures." Uncommitted rows are invisible to another connection, and
a failed tick destroys them.

THE CONTRAST IS EXPLICIT ONE PACKAGE OVER, which makes this a trap rather than an oversight.
`packages/agents/devops-monitor/src/subscriber-busy.ts:13-16` picked `worker.loop_duration_ms` for
the opposite property: "committed on an independent pool client, so it survives the tick's
rolled-back txn".

NO WITHIN-TICK SOURCE EXISTS. `subscriber-busy.ts:9-22` documents both inputs as end-of-tick;
`isBusySubscriber` at :41-42 ORs exactly those two and `activityWithinGrace` at :65 is
`diff >= 0 && diff <= graceSeconds * 1000`. There is no third. Its docblock states the fail-closed
posture for read failures at :29-31 and not this.

SIBLING, POINTING THE OTHER WAY. `pages/finding/agent-harness/wedge-clears-on-failing-retick.finding.md` records
the measured defect — the wedge falsely CLEARS — and leaves open whether "cursor frozen across N
ticks" separates the cases. This names the constraint a remedy meets.

NOT MEASURED. Whether a false fire has occurred; grace exceeds the tick deadlines it mirrors
(`wedges/subscriber-grace.ts`), which bounds it in normal operation.
