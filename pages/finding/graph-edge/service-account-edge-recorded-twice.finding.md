---
id: 8eef9f4d-ca07-5707-9a67-561ff918f098
page-type-slug: finding
title: "Service account edge recorded twice"
domain-slug: page-type/graph-edge
---

# Claim

Two edge types appear to record one relationship. `k8s-uses-service-account` and `rbac-applies` both run from a pod-bearing resource to the ServiceAccount it names, emitted by two different producers over the same manifests. If they are one relationship recorded twice, anything counting service-account reach counts it double, and a check written against one arm passes while the other stands unread.

# Evidence

`k8s-uses-service-account` is emitted at `packages/shared/graph/producers/src/k8s/k8s.edge.producer.ts:117-121`, from a resource's `podRefs.serviceAccount` to `refTargetId(upstream, "ServiceAccount", namespace, sa.name)`. `rbac-applies` is emitted at `packages/shared/graph/producers/src/k8s/k8s-synth.edge.producer.ts:220-232`, from a workload kind to the ServiceAccount named by `spec.template.spec.serviceAccountName`, or to a `k8s-missing:` sentinel.

Noticed while defining `graph-edge-k8s-uses-service-account` and `graph-edge-k8s-rbac-applies` on 2026-08-14. Both were defined to what they do rather than merged, because whether the two producers see different populations was not established. That is the question this finding is for.
