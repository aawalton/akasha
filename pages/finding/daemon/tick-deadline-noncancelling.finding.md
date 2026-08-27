---
id: 1a7b5003-4fcb-5289-86e0-5f2560430e9f
page-type-slug: finding
title: "Tick deadline noncancelling"
domain-slug: domain/daemon
---

# Claim

withTickDeadline's Promise.race wrapper does not cancel fn() when the deadline expires, so an expired tick's git and subprocess work keeps running in the coordinator's dispatch path after the mutex that was meant to serialize it has already released.

# Evidence

Found during #16224 (bounding the tick-budget dispatch death path); not absorbed into it, per #16220's discipline against hiding one mechanism's defect inside another's fix.

Mechanism: packages/shared/worker-runtime/src/with-tick-deadline.ts:53-90 races fn() against a setTimeout rejection and an optional abort; fn() itself is never cancelled (no AbortController drives it). mutex.run (reconcile-single-flight.ts:29-56) settles when the wrapper's promise settles — so at T+180s the wrapper rejects, the reconcile mutex releases, and the next heartbeat can enter reconcile() while the orphaned tick body still runs git/subprocess work in the same /app/coordinator-staging/{batchSeq} directory: a concurrent-writer race on a git worktree, defeating the single-flight invariant spec/parallel-reconcile-race.fizz proves. The coordinator already carries scar tissue for a stale .git/index.lock from an interrupted tick (the 2026-05-26 wedge, docs/crash-recovery.md) — the same collision, a different route.

Escape class determined, not assumed: the dispatch path is non-cancelling, not blind. Contrast the orchestrator's main-pipeline-creator, which has a blind class (a synchronous in-process engine.build() never returns to the event loop, so no timer fires) — #14966, the 10.5h main-deploy wedge, fixed by #14993's treeSha graph memo. Proven for the coordinator: #15625 moved config load and graph build into the async loadAllWorkflowConfigsInWorktreeSubprocess child, awaited via awaitSpawnWithTimeout, so the event loop stays free and the timer fires. #16224's derived-cap fix depends on that.

Scope candidates: (a) cooperative cancellation via an AbortController threaded from the deadline into the tick body, (b) fence the shared resource against a re-entering tick colliding with an orphan, (c) both. (a) alone is insufficient: a SIGKILLed child outlived its own kill (pid 18830 reached 237s against a 150s cap, 87s overrun).

Devops, dalla the seat. Was project #16273, domain daemon.
