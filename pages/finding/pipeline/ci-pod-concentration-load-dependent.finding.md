---
id: 322b9cb1-0421-58d2-95dd-ffd8f136af42
page-type-slug: finding
title: "CI pod concentration load dependent"
domain-slug: page-type/pipeline
---

# Claim

On 2026-07-25, CI pods concentrated on two of six nodes (node-05, node-06) while node-04 ran the highest CPU of any node with zero CI pods on it, producing real cost (timeouts, an OOM kill, multi-minute capacity waits) — but the concentration cleared within ~25 minutes, so it is load-dependent scheduler packing, not permanent placement. An IO-bound explanation for one slow step was retracted by its own author, using that step's duration on other concurrent pipelines as the denominator.

# Evidence

Project #16346 (domain: pipeline, someday_maybe, live-on: deploy). No initiative named.

Measured 2026-07-25 via `kubectl top nodes` / `kubectl get pods -A -o wide`: node-01 16% cpu/1 CI pod, node-02 3%/0(idle), node-03 6%/0(idle), node-04 69%/0 CI (busiest node in the cluster, runs no CI), node-05 61%/4 pods, node-06 unknown-metrics/7 pods. 11 of 12 running CI pods sat on node-05/node-06. Independent sample: 6/6/3/1 across 05/06/01/04.

Cost observed: `bun ops project check` timed out at its 30-min bound on two green pipelines (ok:false, exit 2); `check-typesafety-bundle-temper-rest` ran 17+ minutes against a 24h fleet max of 6.3 min (325-run average 1.2 min); one step SIGKILLed exit 137 (OOM) 1.4s into `vite build`; multiple pipelines waited `dispatchWaitReason=node-capacity` on node-05 for 8-12 minutes.

Three things kept separate: (a) the concentration itself — unestablished whether intended, nobody had read the pod specs; (b) node-04 busiest node but runs no CI — some other workload; (c) node-06 reported `<unknown>` to metrics-server while hosting most CI pods.

Why filed: the 30-min check bound is calibrated to an unstarved cluster; a re-push starts a successor pipeline that retracts the original's step evidence (#16329).

Capacity update, 23:10Z (~25 min later): starvation cleared — all nodes 2-23% cpu, 0 pipelines waiting on node-capacity, 2 non-terminal steps fleet-wide (control, not a dead query). This makes it a load-dependent symptom, not a permanent placement defect; the open question becomes why the scheduler packs rather than spreads under load.

Retraction, 23:50Z (read first per the project's own text): an IO-bound explanation for one step, floated at 23:21, is superseded by its own denominator — comparison shown: this pipeline's `check-typesafety-bundle-temper-rest` ran 58.3 min and was still running, vs. the same step on other pipelines in the last 45 min: 26023=2.4, 26021=4.0, 26020=1.7, 26019=1.8, 26015=2.1, 26014=3.7 (minutes).
