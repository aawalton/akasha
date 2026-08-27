---
id: 9349e08b-c676-53f8-a733-09592d529648
page-type-slug: ops-command
title: "Ops check-rbac-cluster-resource-names"
slug: ops-check-rbac-cluster-resource-names
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/ops-command
command-path: tools/commands/check-rbac-cluster-resource-names.ts
path: check-rbac-cluster-resource-names
---

# Definition

- **Ops check-rbac-cluster-resource-names** — ruling that the engine may patch every cluster-scoped RBAC name a synth emits.

# Design

`resourceNames` cannot restrict `create`, so the first apply of an uncovered name succeeds and only the second is forbidden.

A name applied by an admin rather than by pipeline-engine stands in the command's own allowlist rather than in the whitelist.

# Help

Rule that every ClusterRole and ClusterRoleBinding name a `synth.ts` emits stands in the ClusterRole's own `resourceNames` patch whitelist.

`resourceNames` cannot restrict `create`, so the first apply of a new cluster-scoped RBAC object succeeds through the unrestricted create rule and the gap stays invisible. The second apply is a patch, and it 403s with `cannot patch "<name>" in API group "rbac.authorization.k8s.io" at the cluster scope`. That is one deploy later, on a branch that changed nothing about RBAC.

A name applied by an admin rather than by pipeline-engine belongs in `ADMIN_APPLIED_CLUSTER_RESOURCE_NAMES` here, not in the whitelist.
