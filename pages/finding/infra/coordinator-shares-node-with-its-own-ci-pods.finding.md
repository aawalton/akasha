---
id: e610ce5b-d818-5806-85db-129986489ee4
slug: coordinator-shares-node-with-its-own-ci-pods
page-type-slug: finding
title: "Coordinator shares node with its own CI pods"
domain-slug: domain/global
---

# Claim

The merge-queue coordinator runs on the node that runs the CI pods it dispatches, and what crowds it is their CHURN rather than their number. `worker-supervisor` sits alone in the `workers` namespace on node-06, where distinct `ci` pods per hour ran 2 eight hours before this reading and 2234 during it, while the instantaneous count stayed between 8 and 22 throughout. Both are placed there by the same `ci` workload-class selector, so the coupling is by construction rather than by drift.

# Evidence

Read from Prometheus at 10.110.82.72:9090 on 2026-08-10 around 19:20Z.

`count(count_over_time(kube_pod_info{namespace="ci",node="node-06"}[1h]))` gave 2234 for the trailing hour, 1666 for the hour before, and 2 for the hour eight hours earlier. Against that, `count(kube_pod_info{node="node-06"})` read 22 with 8 in `ci`. `kubectl get pods -n ci --field-selector spec.nodeName=node-06` showed the reason: a `pe-27649-check-*` fan-out whose pods were 14 to 25 seconds old and mostly already `Completed`. A scrape every 30s over pods living seconds sees a near-empty node.

During that churn node-06 read 0.521 on `rate(node_pressure_cpu_waiting_seconds_total[5m])` and `worker-supervisor` read 11.68% full `avg300` — above every value in the preceding fortnight — and the capped `load_configs` series climbed inside batch 10945 through 77.1s and 136.7s to 150.3s, over the 150s cap. The queue then held `consecutiveConfigLoadTimeout` 1 and `consecutiveTickBudgetExhausted` 2 with batch 10948 not advancing.

CORRECTION, 2026-08-10. An earlier version of this finding correlated the INSTANTANEOUS pod count against pressure and reported r=0.40 with medians of 24 against 16. That variable cannot see this: the count is a snapshot of a population whose members live seconds. The r=0.40 was a weak shadow of churn, and the medians are withdrawn.

Not measured. This is one episode watched live, not a fitted relationship — I have not recomputed a correlation against churn over the fortnight, so how much of the pressure churn explains is unestablished. I did not read the supervisor's CPU requests, limits or QoS class, nor test whether a reservation would hold it. I did not establish what `pe-27649` was building or whether that fan-out size is routine.
