---
id: 59b1684d-2378-56f0-806c-50db53bf5407
slug: registration-expiry-unwatched
page-type-slug: finding
title: "Nothing reads how long a registered name has left once the metrics table goes"
domain-slug: domain/network
---

# Claim

A registered name's remaining registration was read daily by the `domain-expiry-probe` job, written into `public.metrics` as `domain_registration.expiry_seconds`, lifted back out by a postgres-exporter block and alerted at thirty days, at seven, and when no reading had landed for forty-eight hours. With the table torn out, nothing reads how long a name has left. That third alert guarded against the probe dying quietly, so a rebuild that forgets the guard looks exactly like one that works.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`
and `kubectl get cm -n prometheus postgres-exporter-queries`.

`public.metrics` held 128 rows of `domain_registration.expiry_seconds`, spanning
2026-07-26 01:47 to 2026-08-24 02:45, the newest labelled `{"domain": "archiveofworlds.app"}`.
The producer is the `domain-expiry-probe` CronJob in the `ci` namespace, scheduled
`23 10 * * *`. The alert names, the thirty and seven day thresholds and the forty-eight hour
freshness window are read from
`packages/infra/k8s/src/prometheus/domain-expiry-constants.ts` on `change-19458`.

Not measured: whether any of the three alerts has ever fired; how many names the probe covers,
since only the most recent label was read; whether the probe job keeps running after the
teardown and so writes at a table that is gone; and whether Prometheus holds enough history to
cover the gap a rebuild would leave.
