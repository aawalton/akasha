---
id: a738e1cc-3436-5990-80c0-85ecface744a
slug: keepalive-emitter-leaks-after-cancel
page-type-slug: finding
title: "Keepalive emitter leaks after cancel"
domain-slug: domain/model-gateway
---

# Claim

A committed keepalive hold that the client disconnects from leaves its keepalive emitter armed forever. The emitter re-arms every 3500ms for the life of the process, enqueueing nothing, once per cancelled hold. A disconnect is the ordinary way a hold ends, so the timers accumulate with traffic.

# Evidence

`tools/lib/model-gateway/committed-keepalive.ts`, identical to its source at `packages/agents/oauth-proxy/src/committed-keepalive.ts`.

`buildKeepaliveEmitter`'s `fire` runs `emit()` then `if (!stopped) arm()`, so an emitter nobody stops re-arms after every firing.

Two places could stop it and neither does on a cancel:

- The stream's `cancel()` handler sets `disconnected = true` and `closed = true`, cancels the active reader, notifies the observer, calls `finishHold` and `releaseHold`. It never touches the heartbeat.
- `finishComplete` does call `heartbeat.stop()`, but its first line is `if (closed) return`, and `cancel()` has already set `closed`. So the orchestrate loop's `finishComplete("downstream_cancel")` returns before reaching it.

Measured on the standing implementation with a counting timer injected through the `timers` seam, a hold whose attempt never resolves, cancelled at its first chunk: **1 arm at the moment of cancel, 56 arms sixty milliseconds later**. With the real 3500ms interval that is one repeating timer per cancelled hold, forever.

What it costs is a leaked timer rather than leaked output: `safeEnqueue` returns early because `closed` is true, so nothing is written downstream and nothing is logged. Nothing reports it.

Found while porting `pre-forward-queue.ts` (#19328), whose vectors could not make their process exit. Those vectors were changed to let the hold complete instead, so no test depends on the leak either way.

Not repaired. The port's contract is that its answers are identical to the standing implementation's, and a fix would change them, so this is a decision for whoever holds the gateway rather than a change the port may make. The three carried suites and the 37-vector recording all pass over the behaviour as it stands.

A fix is one line in the `cancel()` handler, but which line depends on whether a cancelled hold should emit at all. That call is what this finding asks for, not the edit.
