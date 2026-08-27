---
id: d8540eac-6de1-52e0-a9dd-1b5dd6350c7e
page-type-slug: finding
title: "GPU lock protocol gaps"
domain-slug: domain/global
---

# Claim

The gpu-lock.ts want/yield handshake and coordinator have three found protocol gaps that were live on 2026-07-17 — no sitting-aware hold for consecutive interactive renders, no liveness check on the orphaned want-flock holder process, and no best-effort eviction of a warm-loaded model on acquire after a preempt-kill — each with a measured specimen, and none has been fixed.

# Evidence

Project #15639 (domain: infra), status someday_maybe, live-on: deploy. Carried no `# Objective`; the notes below are the observation.

Three protocol gaps found live on 2026-07-17, all on one surface (gpu-lock.ts want/yield handshake + coordinator), each with a measured specimen on the #15582 row:

(1) SITTING-AWARE HOLD — the drain's segment-boundary yield re-acquires between an interactive actor's renders, charging the full swap chain per render (sophia's measured 13min wall for an 8s render). Fix shape: want-file freshness window so consecutive interactive renders keep the card without re-entry.

(2) HOLDER-PID LIVENESS — the zimage-side want-flock holder (exec 9>want; flock; sleep infinity) orphans if the batch dies without killing its tree; an orphaned holder starves the queue side indefinitely (specimen: pid 55457, 40min starvation; a file-existence or VRAM check CANNOT detect it). Fix shape: holder writes its pid; probes verify kill -0; acquire reaps dead-holder flocks. Note: the daemon-side preempt tree-kill (landed 84e1b81a) closes the DAEMON's contribution; this gap closes the interactive side.

(3) EVICT-ON-ACQUIRE — after a preempt-kill, moss stays warm-loaded (correct resting state); zimage's acquire path should best-effort evict moss so its first render never meets an 11.7GB-resident card (the voxcpm2 lane already does this — reuse its shape).

CONSTRAINTS: sophia holds the review contract on any gpu-lock.ts/coordinator change (her three guarantees must survive: interactive waits <= one segment + unload; wait-and-log never timeout; byte-identical no-TTS path — full text on the #15582 row). Interacts with #15580/#15623 teardown (the 24th): if the mac pool recovery retires the bridge first, scope shrinks to whatever survives teardown — check before dispatching.

This is the protocol-gap follow-up named in project #15634's GPU addendum/correction notes (the stale-artifact identification during the white-lace-sister image hunt).
