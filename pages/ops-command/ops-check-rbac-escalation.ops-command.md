---
id: 600d771f-0e29-51bc-95f7-f7fe367a1974
page-type-slug: ops-command
title: "Ops check-rbac-escalation"
slug: ops-check-rbac-escalation
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/ops-command
command-path: tools/commands/check-rbac-escalation.ts
path: check-rbac-escalation
---

# Definition

- **Ops check-rbac-escalation** — ruling that the ClusterRole holds every permission a namespace Role grants.

# Design

A ClusterRole rule carrying `resourceNames` covers nothing here.

Nothing here reads a code tree; the profiles and the ClusterRole both stand in the instructions tree.

# Help

Rule that the `pipeline-engine-cluster-deploy` ClusterRole covers every permission a namespace Role grants.

Kubernetes refuses to let a subject create a Role granting a permission the subject does not itself hold. So a namespace Role gaining a verb the ClusterRole does not carry does not fail where it was written — it fails at the deploy that applies it, as a 403 nobody reads as a missing grant. This reads every profile under `tools/lib/rbac` and every rule of the ClusterRole and names each (apiGroup, resource, verb) the Roles grant and the ClusterRole does not.

A ClusterRole rule carrying `resourceNames` covers nothing here: a namespace Role grant is unrestricted, and a name-scoped grant cannot confer it.
