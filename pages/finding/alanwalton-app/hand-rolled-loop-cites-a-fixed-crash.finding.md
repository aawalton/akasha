---
id: ebecee64-0125-54e7-bd28-767cd46240f4
page-type-slug: finding
title: "Hand rolled loop cites a fixed crash"
domain-slug: domain/alanwalton-app
---

# Claim

The Nova words-read worker's head comment justifies its hand-rolled polling loop by a runtime behaviour the estate repaired two weeks earlier: it says it is NOT `runLongRunningWorker` "which crash-loops when handed an empty subscriber set", and a zero-subscriber deployment now parks on abort instead. It is the only live site of the claim, and it is the whole stated reason this worker does not compose through the runtime — so a seat deciding whether to normalize it reads a closed door that is open.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, emptying `dirty/code/packages-alanwalton-nova-words-read-claude.md`, whose `## Pure-polling` section carried this rationale and was cut as false.

The claim. `packages/alanwalton/nova-words-read/src/nova-words-read.worker.ts:18-20`: "Per the Long-Running Worker Shape principle's pure-polling-loop variant, the worker is a hand-rolled boot-reconcile + hourly heartbeat loop (NOT `runLongRunningWorker`, which crash-loops when handed an empty subscriber set)."

The repair. `482c98bfd1`, dated 2026-07-25: "fix(#16248): park a zero-subscriber deployment instead of fast-failing the heartbeat". `packages/shared/worker-runtime/src/deployment.ts:172` is now `if (tasks.length === 0) tasks.push(waitForAbort(internalAbort.signal))`, the two lines above naming the failure removed: "'Nothing to subscribe to' is not 'work finished' — resolving here fast-fails the caller's composed heartbeat and leaves a live worker with a dead clock."

Nothing refuses an empty set either. `runLongRunningWorker` passes `subscribers: args.subscribers` through to `runWorkerDeployment` with no length guard, and `deployment.ts:88-89` fires `onAllStarted` at once so the watchdog "must never hang on a degenerate one".

Scope. `rg -n 'crash-loops when handed an empty|empty subscriber set'` over live code returns exactly one hit, this file. The sibling pure-polling worker `agents-pacing.worker.ts` carries the same `// worker-shape: tick-yield-irreducible` pragma without this rationale.

What makes it cost something rather than merely be stale: the sentence is the entire stated reason the worker is hand-rolled. The shape is otherwise legitimate — `check-worker-shape` step 1 scopes a marker-free file out of the composition sub-check, so nothing red follows either way — so the comment is all a reader has, and it reports a closed door as open.

Adjacent: `alanwalton-app/entrypoint-comment-reports-the-criterion-cadence.md`, a stale head comment on the sibling Aria worker, about cadence not a withdrawn constraint.
