---
id: 05383e07-a04d-5f19-8cab-3ba34552dba9
page-type-slug: finding
title: "Reconcile entry points miscounted"
domain-slug: repo/code-repo
---

# Claim

The merge-queue coordinator counts its own reconcile entry points as four in two places and five in three, inside one live file, and the formal spec carrying the concurrency safety argument uses four.

`packages/infra/ci/merge-queue/coordinator/src/merge-queue-coordinator.worker.ts` states both counts about the same set. The same file also says boot runs `bootSweep`, not `reconcile`, while naming boot as a member of the set in every enumeration.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`. All line numbers are `packages/infra/ci/merge-queue/coordinator/src/merge-queue-coordinator.worker.ts`.

Five:

- `:27` — "The coordinator's five reconcile entry points — boot's `bootSweep`, the heartbeat's `reconcile`, queue-entry subscriber, the batch-event subscriber's `main`-terminal wake-up, and the main-deploy-terminals subscriber — converge in `dispatcher/reconcile.ts`."
- `:133` — routing the main-deploy subscriber through the mutex "keeps the 'every reconcile entry point holds the mutex' invariant uniform across all five entry points."
- `:137` — "the five-way single-flight invariant (boot / heartbeat / queue-entry sub / batch-event sub / main-deploy-terminals sub)".

Four:

- `:109` — "boot, heartbeat, queue-entry subscriber, and batch-event subscriber's `main`-terminal wake-up all route through `mutex.run(...)` so at most one reconcile pass is in flight per pod at any instant." Main-deploy is not among them.
- `:115` — "Worker-level abort signal threaded into all four reconcile entry points".

The spec takes four. `src/pure/parallel-reconcile-race.spec.ts:9` — "`reconcile()` (`dispatcher/reconcile.ts`) is invoked from four independent entry points — boot, the 60-second heartbeat" — and `:56` collapses per-entry-point identity across "all four call sites".

Boot is in every enumeration and calls something else. `:11` and `:146` both say boot runs `bootSweep`, "not the full `reconcile`", and `:169` confirms it: `mutex.run(() => bootSweep(...))`. The only literal `reconcile({...})` invocation in `src/` is the heartbeat's, at `:184`.

Found while ingesting `dirty/questions/code-repo-head-documents-ci.md`. Its second entry reported the same count problem in `packages/infra/ci/merge-queue/coordinator/CLAUDE.md`; that document was removed at `7205e28efd`, and the disagreement recorded here is what is left standing in shipped source without it.
