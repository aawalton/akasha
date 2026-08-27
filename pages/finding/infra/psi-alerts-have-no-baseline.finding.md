---
id: cc933a69-0ebc-57bc-a907-8777d2e5eedb
slug: psi-alerts-have-no-baseline
page-type-slug: finding
title: "Psi alerts have no baseline"
domain-slug: domain/global
---

# Claim

The per-pod PSI alerts cannot be judged against a baseline, because `node_pod_cgroup_pressure_avg300_percent` is keyed by pod UID and the alert aggregates by pod NAME — both of which change at every rollout. A pod's pressure history begins when the pod does, so whether a firing threshold sits above or inside a workload's normal operating band is unanswerable at the moment it fires, which is when someone is reading it.

# Evidence

Raised by `WorkerSupervisorCpuPressureHigh` firing and resolving on 2026-08-04, and measured against the live Prometheus in the `prometheus` namespace at ~22:05 UTC.

The rule is in `/etc/prometheus/rules/alerts.yml`, group `cgroup-psi`. It fires on `kind="full", resource="cpu"` above 2 PERCENT, joined `on (uid) group_left (namespace, pod)` to `kube_pod_info` and reduced by `max by (namespace, pod)`. A sibling rule `WorkerSupervisorCpuPressureMetricAbsent` covers the metric disappearing, so the instrument already has its own negative control.

For `worker-supervisor-8f49dd95c-hqm7q`, uid `98aef9a3-b55a-4cb3-84e4-7bc870977c64`:

- `count_over_time(...[24h:1m])` returns 219 — 219 minutes of data in a 24-hour window. The pod was 3h44m old (about 224 minutes). The series therefore covers the pod's whole life and nothing before it.
- `count_over_time((... > 2)[24h:1m])` returns 33, and `sum_over_time` of the same returns 94.63, so 33 of those 219 minutes were above threshold, averaging about 2.87% while above.
- `max_over_time(...[6h])`: cpu full 4.77%, cpu some 17.89%, io 0.03%, memory 0.

The pod was rolled out at revision 1028 about 3h44m before the reading; the preceding ReplicaSet was 7d22h old. The deployment's own history is long-lived, so the metric's 219 minutes is a property of the UID keying and not of a short-lived workload.

Not distinguished, and not distinguishable from inside the window: whether 33/219 minutes above threshold is this revision being more CPU-hungry, or the evening being abnormally busy. 2026-08-04 was the first main deploy after several days of CI downtime, so the surrounding load is not representative either way.

Standing context rather than evidence of harm: the container's limits are 16 CPU against a 6 CPU request, it was using 0.9 CPU at rest, memory 4410Mi against a 12Gi request-equals-limit, and it has 0 restarts. No workload was observed degraded.
