---
id: 81c8f498-4981-5231-81f5-5578da5bccb8
page-type-slug: finding
title: "Reaper blind to deleted pod"
domain-slug: domain/global
---

# Claim

The CI pod reaper has no path to a terminal status for a step whose pod object was removed out of band. The only branch that could supply one reads the live pod list, and a removed pod is absent from it, so the step row stays `running` with a null `exitCode` — the one field the step-level decision turns on. The formal model does not cover the case: its `NoOutOfBandPodDelete` invariant is about foreign pods being left alone, not about a step pod being deleted.

# Evidence

Read at `origin/main` in `~/code` on 2026-08-07, while emptying `dirty/questions/ci-pipeline-doctrine.md`. Paths below are under `packages/infra/ci/`.

The backfill is the sole path. `orchestrator/src/ci-pod-reaper-loop.worker.ts:44-52` says a step stuck `status='running'` whose container was OOMKilled, evicted or SIGKILLed "had its in-container completion callback killed with it, so it emits nothing, ever. This tick is the SOLE path to a terminal status for that step; `LAUNCH_TIMEOUT_MS` does not cover it (that guards `launching`)."

That branch reads the live pod list. The same docblock at :64-66: "Do NOT add a 'cheap gate' that skips the tick when `listCiPods()` returns empty: the terminal-backfill and admission branches both need the pod list to decide, so the list IS the tick." `decideStuckPodBackfill` at `orchestrator/src/reaper/pod-reaper-decide.ts:224-227` acts only on a matched step, and its docblock states "A matched step always carries a `podName`". A pod deleted out of band is absent from `listCiPods()`, so nothing matches it and the branch cannot fire.

Nothing else moves the row: `worker/src/pure/decide-step.ts:234` transitions a step only under `if (step.exitCode != null)`.

`orchestrator/spec/ci-pod-reaper.fizz:41-45` states `NoOutOfBandPodDelete` as "`outOfBandPod` is never reaped regardless of step/pipeline state. The production reaper preserves any pod whose name doesn't match `pe-{N}-`" — foreign pods left alone, a different subject from a step pod an operator deletes.

Not established. That spec at :18 says the step "stalls in `running` until the outer orchestrator timeout". Searching `packages/infra/ci/` for `STEP_TIMEOUT|RUNNING_TIMEOUT|stepTimeout|orchestrator timeout|MAX_STEP` returns that phrase only inside the spec and its generated `.spec.ts`, never a live constant. The duration is unverified and no run was observed; the mechanism above is read from live source.
