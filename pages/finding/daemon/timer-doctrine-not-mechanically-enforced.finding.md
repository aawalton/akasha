---
id: 408bc671-decd-53a8-933b-03c05ef59c43
page-type-slug: finding
title: "Timer doctrine not mechanically enforced"
domain-slug: domain/daemon
---

# Claim

The timer latency-budget doctrine #16240 landed for the worker fleet is enforced only by prose — an in-code comment convention plus two docs — and nothing in packages/infra/checks parses or checks it, so the fleet can drift back to copied timer defaults exactly as it did before #16240.

# Evidence

Project #16250, domain `daemon`, status someday_maybe, tags workers/checks/reliability/doctrine, owner aranya. No objective written; title carries the claim: nothing mechanically enforces the timer latency-budget doctrine, so the fleet can drift back to copied defaults as before #16240.

Surfaced during #16240 (timer cadence), which landed the doctrine and retuned 39 long-running workers. Protection is entirely prose: an in-code comment convention (`CLOCK TICK: <transition> (<file:line>) — ... Not ladder-governed.`) plus two docs; nothing in packages/infra/checks parses it. #16240 exists because 32/37 workers had copied one 60s default with no justification; the copy-a-neighbour mechanism is untouched by the retune, so absent a gate the fleet drifts back.

CHECK SKETCH (not decided), for every recurring-timer declaration (`runLongRunningWorker`'s `heartbeat.intervalMs` plus hand-rolled while+sleepAbortable intervals):
1. Value below hourly default (3_600_000) needs a comment above it.
2. CLOCK TICK comment must cite a `file:line`.
3. `tickDeadlineMs` must not be an arithmetic function of the interval constant (e.g. `2 * PERIODIC_HEARTBEAT_INTERVAL_MS`) — silently turns wedge-detector into wedge-tolerator when interval slows; #16240 hand-pinned ~15 files. Highest value, easiest rung; may ship alone via ast-grep.

HARD PART: heterogeneous surface. 24 workers use `runLongRunningWorker`; 13 hand-rolled while loops; 2 aren't named `*.worker.ts` (ci/worker/src/main.ts, fs-projector/src/daemon.ts) — #16240's inventory missed both. Some intervals are env-overridable; check should target the code default. ci-pod-dispatcher sets interval via a composition helper. Nine workers legitimately sit below hourly and must satisfy the rule, not be allowlisted (Dalla-gated).

SCOPE: #16240 deliberately did not build this — Intent was doctrine+retune+instrument only; a rushed gate risked false positives eroding trust. Recommended: ship rung 3 alone first, decide 1-2 after.
