---
id: 65242100-8c32-5245-b58c-53f524bf7fec
page-type-slug: old-ops-command
title: "Ops check-rbac-cluster-grants"
slug: ops-check-rbac-cluster-grants
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-rbac-cluster-grants.ts
path: check-rbac-cluster-grants
---

# Definition

- **Ops check-rbac-cluster-grants** — ruling that the ClusterRole grants create and patch on every cluster-scoped kind emitted.

# Design

A kind the registry does not classify is refused, scope not being readable from manifest text.

Each `synth.ts` is imported and run, so what is judged is the YAML the deploy would apply.

# Help

Rule on every kind a `synth.ts` emits: that the registry classifies it, and that a cluster-scoped one is granted create and patch.

Scope is not readable from manifest text — `kind: Foo` says nothing about whether Foo is namespaced. So an unclassified kind is refused rather than skipped: skipping it is exactly how a cluster-scoped kind slips through with no grant, and the server-side apply then 403s at the cluster scope and reds the deploy.

Each `synth.ts` is imported and run, so what is judged is the YAML the deploy would actually apply rather than whatever generated file happens to be checked in.
