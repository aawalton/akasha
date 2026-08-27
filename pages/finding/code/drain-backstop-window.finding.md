---
id: 82fc264f-11b6-5631-9c6b-b78892b606cf
page-type-slug: finding
title: "Drain backstop window"
domain-slug: domain/global
---

# Claim

The forced-exit backstop in `runLongRunningWorker` stops covering the failure class its own error message names, the moment the join settles. Its timer is armed on the shutdown abort and cleared in the `finally` around `await joinPromise`, so a child outliving a resolved join is past it: the worker function returns, `main()` falls through to `pool.end()`, and the process hangs with nothing armed. That held-open loop is what the backstop's own `console.error` calls "usually an unreaped child process".

# Evidence

Read at `packages/shared/worker-runtime/src/run-long-running-worker.ts` on the code repo's working tree, 2026-08-07.

`SHUTDOWN_DRAIN_DEADLINE_MS` is 25_000 at line 97 and `SHUTDOWN_DRAIN_EXIT_CODE` is 17 at line 104. Lines 374 to 395 are the arming and the clearing together: `armDrainBackstop` sets a `setTimeout` that writes one `console.error` ending "forcing process exit — the event loop is still held open (usually an unreaped child process)" and then calls `forceExit(SHUTDOWN_DRAIN_EXIT_CODE)`; the timer is `.unref()`'d; it is attached to the local abort, fired at once where the signal is already aborted and through an `addEventListener(..., { once: true })` otherwise. It is then cleared unconditionally in the `finally` around `results = await joinPromise`. Nothing arms anything after that block.

That the hang survives the clearing is a property of the handle rather than of the pipe, and I measured it rather than reading it. Under Bun 1.3.14, a parent that runs `Bun.spawn(["sleep", "3"])` and exits its own script immediately took 3001 ms to exit with `stdio: "pipe"`, 3002 ms with `"ignore"` and 3002 ms with `"inherit"` — held identically in all three — while the same parent calling `proc.unref()` with the pipe still open exited in 1 ms. So a ref'd child keeps the loop alive whatever its stdio, and closing a pipe is not a remedy.

The fall-through is the ordinary caller shape: `packages/agents/devops-monitor/src/devops-monitor.worker.ts` ends its `main()` with `await pool.end()` and nothing after it, and its `main().catch` fires only on a throw.

Found ingesting a quarantined document in the instructions repo. What that document recorded of the same gap is queued for removal with it, which is why this is filed here.
