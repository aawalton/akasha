---
id: 0b075949-ce7b-511b-b4d2-82269991d3c2
page-type-slug: finding
title: "Alerts route to a null receiver"
domain-slug: domain/global
---

# Claim

Alertmanager's only route sends every alert to a receiver named `null` carrying no notification integration, so all 72 alerting rules evaluate and every result is dropped. Four fire today and reach nobody. One of them, `DeploymentReplicasMismatch`, names a metric kube-state-metrics does not publish — a rule that cannot speak, inside a system where no rule speaks to anybody.

# Evidence

Measured 2026-08-20 against the live Prometheus and Alertmanager in pod `prometheus/prometheus-7b9fc7c557-vf2q4`.

Alertmanager is a sidecar container in the Prometheus pod rather than its own pod, so `kubectl get pods -n prometheus | grep alertmanager` prints nothing and reads as absent. It is not. `-o jsonpath='{.spec.containers[*].name}'` returns `prometheus` and `alertmanager`.

Its running config, from `/api/v2/status`:

    route:
      receiver: "null"
    receivers:
    - name: "null"

One route, one receiver, and no integration declared on it. `/api/v1/rules` loads 72 alerting rules, every one healthy and evaluating on a 30s interval. `/api/v2/alerts` holds four — `ClaudeAccountTokenExpiryMetricAbsent`, `GitMirrorRefsBehind`, `QueryHardCeilingExceeded`, `QuerySustainedMeanBudgetExceeded` — each grouped and then dropped. The config is supplied by `packages/infra/k8s/prometheus/secrets/alertmanager-config.sops.yaml`, which was not decrypted.

`/api/v1/label/__name__/values` lists thirteen `kube_deployment_*` metrics. `kube_deployment_status_replicas_available` is among them; `kube_deployment_status_available_replicas` is not, and querying that bare name returns `result:[]`. `synth-alerts.ts:156` names the second. A PromQL vector comparison whose right-hand side is empty yields nothing rather than erroring, so the rule has never fired and cannot.

The same mechanism stands ninety lines further down producing the wanted behaviour. kube-state-metrics emits no `kube_cronjob_next_schedule_time` for a suspended CronJob, so `CronJobStale` at line 247 also compares against an empty right-hand side, and stays silent for the seven suspended jobs — which is what a suspended job should do. Same shape, opposite verdict. A silence is not a defect by itself.
