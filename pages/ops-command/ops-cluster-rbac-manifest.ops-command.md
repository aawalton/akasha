---
id: f87432e6-a8f8-5eb5-bf54-4e52cd508b28
page-type-slug: ops-command
title: "Ops cluster-rbac-manifest"
slug: ops-cluster-rbac-manifest
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/cluster-rbac-manifest.ts
path: cluster-rbac-manifest
---

# Definition

- **Ops cluster-rbac-manifest** — the deploy account, the roles it is granted and their bindings, as one YAML document.

# Design

Nothing is written where the ClusterRole would not cover every permission a namespace Role grants.

Stdout carries the document and nothing else, so a run that refuses writes an empty stream.

The ci namespace Role this emits stands outside `ops check-rbac-escalation`, which weighs only the profiles under `tools/lib/rbac`. It grants `create` on pods, which the deploy ClusterRole does not hold; Kubernetes admits it because the account applying it holds that verb in `ci` already.

# Help

Write the cluster-scoped half of the deploy account — the `pipeline-engine` ServiceAccount, the `pipeline-engine-cluster-deploy` ClusterRole and its binding — to stdout, for `kubectl apply -f -` to read.

Nothing is written where the ClusterRole about to be emitted does not cover every permission a namespace Role grants: Kubernetes would then refuse the Role at the deploy that applies it, and emitting the incomplete ClusterRole first is what puts the cluster in that state. That refusal names the same gaps `ops check-rbac-escalation` names.

The document carries a header saying it is generated. Stdout carries the document and nothing else, so a run that refuses writes an empty stream rather than a partial manifest.
