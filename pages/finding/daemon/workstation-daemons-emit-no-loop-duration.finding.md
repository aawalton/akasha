---
id: daef7c8f-4e0a-57e2-920a-f65ca620a41f
slug: workstation-daemons-emit-no-loop-duration
page-type-slug: finding
title: "Workstation daemons emit no loop duration"
domain-slug: domain/daemon
---

# Claim

`daemon` requires every daemon to compose through `runLongRunningWorker` and emit `worker.loop_duration_ms` from each tick. No daemon in the instructions repository can do the first, none does the second, and the metric the rule names is the one the fleet's own wedge detection reads. Every daemon moved onto the workstation therefore becomes invisible to the check that would notice it had stopped ticking.

# Evidence

`pages/domain/daemon.domain.md` Rules, Daemon Composition: "Compose every daemon through `runLongRunningWorker`, and emit `worker.loop_duration_ms` from each tick." Its warrant is that "a hand-rolled loop emits no duration the fleet can aggregate, so a wedged daemon reads like an idle one." Its aid allows a shape-equivalent variant with an allowlist entry.

`runLongRunningWorker` is exported from `packages/shared/worker-runtime/src/run-long-running-worker.ts` in the code repository and appears nowhere in the instructions repository. Citation runs one way between the two repositories, so a daemon standing in the instructions repository cannot compose through it. Six daemons stand there now: `alert-observer`, `devops-monitor`, `filler-drain`, `memory-reaper`, `pacing`, `wake-watcher`. None carries an allowlist entry.

`worker.loop_duration_ms` appears in the instructions repository exactly once, and as a read rather than a write: `tools/lib/devops-monitor/metrics-rows.ts` queries `where metric_name = 'worker.loop_duration_ms'`. That query is how the devops monitor decides a daemon is wedged. So the monitor now stands on the workstation asking for a metric that it, and every daemon beside it, has stopped producing.

Two readings, and nothing distinguishes them:

- The rule is right and the instructions repository owes an emitter of its own, in which case six daemons are out of compliance and an allowlist entry is the wrong answer for all six.
- The rule names a code-repository function in its act, which fixes where a daemon may stand. Naming the emission alone would bind the same warrant and leave the composition to whichever repository the daemon sits in.

The second reading is what the aid already gestures at by admitting a shape-equivalent variant, but an allowlist entry per daemon records an exception where the rule as worded admits no rule.

Raised while moving the agent harness out of the code repository, where every daemon that moves crosses this line on the way.
