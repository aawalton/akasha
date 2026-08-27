---
id: c6c99a74-56db-5424-9f62-c4141edd4984
page-type-slug: finding
title: "Nothing reports the MacBook inference pool going unreachable once the metrics table goes"
domain-slug: domain/inference
---

# Claim

Whether the MacBook's inference pool was serving was probed about once a minute, written into `public.metrics` as `macbook_inference.pool_serving`, and alerted two ways: the pool unreachable, and the probe itself stale for five minutes. With the table torn out, the pool can stop serving with nothing reporting it. Inference runs on a machine outside the cluster, so no cluster-side readiness check covers it and this probe was the only thing that did.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`
and `kubectl get cm -n prometheus postgres-exporter-queries`.

`public.metrics` held 38,270 rows of `macbook_inference.pool_serving`, spanning
2026-07-23 00:00 to 2026-08-24 02:58, the newest labelled `{"probe_result": "ok"}`. Over the
last twenty-four hours it wrote 1,286 rows, about fifty-four an hour. The two alert names and
the five minute freshness window are read from
`packages/infra/k8s/src/prometheus/macbook-inference-constants.ts` on `change-19458`.

Not measured: whether either alert has ever fired; which process runs the probe, since the
producer was identified from the row rate rather than found in a repository; what the
`probe_result` label's other values are; and whether the probe keeps running after the
teardown and so writes at a table that is gone.
