---
page-type-slug: finding
slug: sweep-blind-to-what-stopped-declaring
title: "The orphaned-resources sweep is scoped by declarations a retired resource no longer carries"
domain-slug: domain/deploy-system
---

# Claim

The orphaned-resources sweep is scoped by two declarations that a retired resource no longer carries, so the resources it exists to find are the ones it cannot see.

It lists only the namespaces in `NAMESPACE_NAMES`, and it considers only resources labelled `app.kubernetes.io/managed-by` of `deploy-script` or `bootstrap`. A cluster object outlives its declaration by losing exactly those: the namespace it was created in was never in the synthesised list, and the label it carries names the command that made it rather than a deploy. Either scoping alone is enough to hide it, and a resource that fails both is invisible twice over while the sweep reports a clean run.

This is the same shape as a folder-anchored glob answering the folder question rather than the kind question, and as `kubectl get endpoints` answering "No resources found" where the truthful answer is that it no longer serves the resource kind. A guard scoped by a declaration cannot see what stopped declaring.

# Evidence

Two specimens, both `Service` — a kind the sweep audits, in `AUDITED_KINDS` at `tools/lib/orphaned-resources-sweep/cluster.ts:13`.

`page-query-service/page-query-service` on `10.100.134.88:8787`, nine days old, and `graph-service/graph-service` on `10.103.212.34:8788`, six days old. Each stood with an ownerless EndpointSlice declaring `conditions.ready: true` for `192.168.68.50`, this workstation's address, where `ss -ltn` showed nothing listening on either port. Each namespace held nothing else. Both were found by separate agents on the same night, one by measuring a production failure and one by reading the command that made them, which is what makes them a pattern rather than a single slip.

The first scoping: `sweepOrphanedResources` takes its namespaces from `NAMESPACE_NAMES` at `tools/lib/orphaned-resources-sweep/audit.ts:59`. `rg` for either name in `infra/k8s/src/app-namespaces/synth.ts` returns nothing, against 57 namespaces declared there. Neither namespace is listed, so neither was ever asked after.

The second scoping: `orphansAmong` at `audit.ts:43-44` returns false for any resource whose `managed-by` is absent or outside `MANAGED_BY_A_DEPLOY`, which is `{"deploy-script", "bootstrap"}` at `audit.ts:9`. `kubectl get svc -o jsonpath='{.items[*].metadata.labels}'` returned `app.kubernetes.io/managed-by: ops-service-install` for both, set at `tools/lib/service-cluster-reach.ts:4,50`. So each would have been skipped even had its namespace been listed.

Both specimens were deleted after this reading, so the claim about the two objects is no longer checkable in the cluster; their manifests were captured first. The claim about the two scopings is unchanged by that and stands in the code cited.

NOT MEASURED. Whether the sweep has ever reported an orphan it did find, so nothing here says the audit works on the population it does reach. Whether any resource of the other two audited kinds, `Deployment` and `StatefulSet`, is hidden the same way — only `Service` was examined. How many namespaces exist in the cluster beyond the 57 declared. Whether the sweep is running at all on its schedule, which was not checked. Whether any third `managed-by` value in live use falls outside the pair.
