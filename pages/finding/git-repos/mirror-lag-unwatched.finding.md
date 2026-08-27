---
id: 4a09fd3f-54c7-5b70-9bf0-01834acff3da
slug: mirror-lag-unwatched
page-type-slug: finding
title: "Nothing reports a git mirror falling behind once the metrics table goes"
domain-slug: domain/git-repos
---

# Claim

Whether each bare repository's mirror had confirmed its refs was probed hourly by `git-mirror-probe`, written into `public.metrics` as `git_mirror.refs_unconfirmed`, and alerted five ways: refs behind, no destination, destination unreachable, probe unauthenticated, and no reading for two hours. With the table torn out, a mirror that stops confirming refs stops silently, and because the mirror runs after the push returns, the push succeeds either way.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`
and `kubectl get cm -n prometheus postgres-exporter-queries`.

`public.metrics` held 2,132 rows of `git_mirror.refs_unconfirmed`, spanning 2026-08-05 17:52
to 2026-08-24 02:54, the newest labelled `{"repo": "code-editor", "state": "mirrored"}`. The
producer is the `git-mirror-probe` CronJob in the `ci` namespace, scheduled `52 * * * *`. The
five alert names and the two hour freshness window are read from
`packages/infra/k8s/src/prometheus/git-mirror-constants.ts` on `change-19458`.

Not measured: whether any of the five alerts has ever fired; how many repositories the probe
covers, since only the most recent label was read; what the `state` label's other values are;
whether the probe job keeps running after the teardown and so writes at a table that is gone;
and whether any mirror is behind right now.
