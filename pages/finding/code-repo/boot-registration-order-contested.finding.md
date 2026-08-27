---
id: 8eb39404-8bb4-55ab-872b-76a636c2b5e8
page-type-slug: finding
title: "Boot registration order contested"
domain-slug: repo/code-repo
---

# Claim

Two live files in the code repository state opposite subscriber-registration orderings for one boot contract, each naming the other's order as the one that silently skips events.

`worker-runtime/src/run-long-running-worker.ts` says boot reconcile is awaited before any subscriber registers. `worker-runtime/src/deployment.database.test.ts`, the test pinning the contract, says the pipeline worker pre-registers before the boot sweep and that registering after boot was an earlier draft's bug.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`run-long-running-worker.ts:8`, the runtime's composition doc comment: boot reconcile "is awaited to full completion BEFORE any subscriber registers", because "if registration ran while boot was still emitting events, the resolved tail would land at or past those events' seqs and the subscribers' first cursor tick would silently skip them. The ordering is structural — the runtime guarantees it."

`deployment.database.test.ts:99`, heading the test that pins the contract: "`main.ts` pre-registers them BEFORE running the boot sweep so the resolved tail snapshots `MAX(seq)` BEFORE any sweep emissions [...] An earlier draft of `main.ts` registered AFTER the boot sweep — so tail snapshotted PAST the sweep's emissions and a tail-seeded per-pipeline subscriber silently skipped them."

The consumer sides with the runtime. `packages/infra/ci/worker/src/main.ts:19` states "the runtime guarantees boot-before-subscriber-registration", and `main.ts:43` describes what ships as awaiting boot, then registering subscribers. Its comments at `:253` and `:276` add why that is safe — the resolved tail is a global `MAX(seq)` that still trails the sweep's commits, so the sweep's writes land at `seq >` the tail. Those three passages agree; the test comment is the outlier.

Found while ingesting `dirty/questions/code-repo-head-documents-ci.md`, whose fifth entry named a three-way disagreement here. Two of its three surfaces have moved since — `packages/infra/ci/worker/CLAUDE.md` was removed at `7205e28efd`, and its claim that `main.ts` contradicts itself no longer holds. This is what survives the check, filed rather than left in a document queued for removal.
