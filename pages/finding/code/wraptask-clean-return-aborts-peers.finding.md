---
id: ae7862b9-8253-5ea1-baff-af1378476d55
page-type-slug: finding
title: "Wraptask clean return aborts peers"
domain-slug: domain/global
---

# Claim

`wrapTask` aborts the shared controller on any settle, including a clean return, which contradicts `events-subscriber.ts`'s documented guarantee that a non-transient park on one subscriber leaves its healthy peers running.

# Evidence

VERIFIED verbatim in both files. Surfaced during the RCA of the 2026-07-25 halt containment breach; not on that incident's causal path, filed separately.

`worker-runtime/src/deployment.ts`'s `wrapTask` aborts the shared controller inside a `.finally()`, which fires on any settle including a clean return:

```ts
function wrapTask(promise: Promise<void>, controller: AbortController): Promise<void> {
  return promise.finally(() => {
    if (!controller.signal.aborted) controller.abort()
  })
}
```

`events-subscriber.ts` documents the opposite intent for non-`auto-recover-with-backoff` policies: "markError parks the row and the loop returns, so `legacy` self-heals ... and a single subscriber's park does not crash-loop its healthy peers."

Both cannot be true. The documented claim holds literally — no crash, exit code 0. The implied claim does not: the peers are aborted and the entire worker shuts down, the supervisor blind-respawns it, and `unparkTransient` only clears transient parks — so a non-transient park re-parks and re-exits every cycle. That is the "masked crash -> clean exit-0 -> blind respawn -> counters reset each cycle" shape #15372 was written to eliminate for `auto-recover-with-backoff`, still live for the other policy.

48 of 50 subscribers are on the affected path.

Confidence: medium-high, honestly bounded — this is a code read, not an observation; zero subscribers are currently parked, so no production instance exists to point at.

Discriminating observation, to name before claiming the mechanism fires: a `legacy`-policy subscriber reaching `status='error'` and its worker exiting code 0 within the same second, with sibling subscribers showing no further ticks.

Verification must be directly runnable per Alan's #16272 ruling: construct the condition — a non-transient park on one subscriber of a multi-subscriber worker — and assert the peers keep ticking. Not by watching production for absence of the symptom; absence cannot discriminate "the fix works" from "the arm is dead code". Was #16283.
