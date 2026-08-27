---
id: 513414fd-2347-50b0-aa4c-795f393a2738
page-type-slug: finding
title: "Workers pods grant unconsumed"
domain-slug: domain/global
---

# Claim

The `worker-supervisor-workers-pods` Role grants pod read in the `workers` namespace, and after #18963 removed the devops-monitor's supervisorPod slice nothing consumes it. The grant is standing privilege with no caller.

# Evidence

The Role is authored in `packages/infra/ci/orchestrator/k8s/synth-rbac-namespace.ts`. Its sole
consumer was `fetchSupervisorPod` in `@agents/devops-monitor`, which called
`listNamespacedPod` against the `workers` namespace under the supervisor's ServiceAccount.

`packages/infra/ci/orchestrator/k8s/rbac-coverage.unit.test.ts` says so in its own boundary
note: "The `workers-pods` Role is consumed solely by the cross-package
`@agents/devops-monitor`; its `SUPERVISOR_POD_K8S_METHODS` tuple is the local
by-construction anchor". That tuple went with the slice, and the test never imported it, so
nothing failed when it left — the coverage test asserts only the two orchestrator-resident
grants.

Two watches read that slice and both are gone. `stale-supervisor-sha` compared a
deployed-sha annotation it read off the Pod while the deploy stamps it on the Deployment, so
it never resolved. `supervisor-crashloop` fired only on a pod not Running with restartCount
>= 3 and a clean last exit, and emitted nothing in the retained message history. The package
no longer depends on `@kubernetes/client-node` and the monitor's tick makes no Kubernetes API
call.

Not folded into #18963 deliberately: narrowing a live RBAC grant is the shape of change that
403'd the ci-pod-dispatcher in #11600, where a grant was cut below what the code needed in
the same landed commit. Removing code that stopped calling and removing the grant that
allowed it are two acts, and the second wants its own verification against the running
cluster.
