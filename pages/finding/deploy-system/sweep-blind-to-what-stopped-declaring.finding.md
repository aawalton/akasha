---
page-type-slug: finding
slug: sweep-blind-to-what-stopped-declaring
title: "The orphaned-resources sweep is scoped by declarations a retired resource no longer carries"
domain-slug: domain/deploy-system
---

# Claim

The orphaned-resources sweep is scoped by two declarations a retired resource no longer carries — the namespaces in `NAMESPACE_NAMES`, and a `managed-by` of `deploy-script` or `bootstrap` — so what it exists to find is what it cannot see. Either scoping alone hides a resource; one failing both is invisible twice while a run reports clean.

Measured 2026-08-28, no CronJob for the sweep stands in the cluster. This describes a guard that is not running.

# Evidence

Two specimens, both `Service`, a kind in `AUDITED_KINDS` (`cluster.ts:13`): `page-query-service` on `10.100.134.88:8787` and `graph-service` on `10.103.212.34:8788`, each with an ownerless EndpointSlice declaring `ready: true` for `192.168.68.50`, where `ss -ltn` showed nothing listening. Found by two agents the same night, one from a production failure and one from reading the command that made them.

First scoping: `sweepOrphanedResources` takes its namespaces from `NAMESPACE_NAMES` (`audit.ts:59`), and neither namespace is among the 57 in `app-namespaces/synth.ts`.

Second: `orphansAmong` (`audit.ts:43-44`) returns false unless `managed-by` is in `{deploy-script, bootstrap}` (`audit.ts:9`). Both specimens carried `ops-service-install` (`service-cluster-reach.ts:4,50`). Across 44 live services: 17 `bootstrap`, 12 `deploy-script`, 11 carrying no such key, 3 `cloudnative-pg`, 1 `talos-migration-11917` — so 15 are unreachable by the label test, and the guard misses what never declared as well as what stopped.

`kubectl get cronjob -A` returns 14, none of them this sweep.

A comparison first drawn here was false and is corrected: `kubectl get endpoints` was said to answer "No resources found" because the shim no longer serves the kind. Measured 2026-08-28 it returns 44 rows against 44 endpointslices. The comparison holds only on the narrower mechanism — a hand-written EndpointSlice under a selectorless `Service` is never mirrored into an `Endpoints` object. The finding it was drawn from was removed at `4d3c927e8`.

Both specimens were deleted after this reading, their manifests captured first. The scopings stand in the code cited.

NOT MEASURED. Whether the sweep ever reported an orphan it did find. Whether `Deployment` or `StatefulSet` hide the same way; only `Service` was examined. When the CronJob left the cluster, or whether it ever stood there. Whether the three live services no file declares are each accounted for.
