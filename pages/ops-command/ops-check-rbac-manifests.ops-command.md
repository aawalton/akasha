---
id: 22a86082-ed82-5c91-9fa3-271772f2cf90
page-type-slug: ops-command
title: "Ops check-rbac-manifests"
slug: ops-check-rbac-manifests
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/ops-command
command-path: tools/commands/check-rbac-manifests.ts
path: check-rbac-manifests
---

# Definition

- **Ops check-rbac-manifests** — ruling that a rule grants create and patch on every kind an applied manifest holds.

# Design

The manifest text judged is what a `synth.ts` emits when run, never a generated file standing in the tree.

A `.sops.yaml` apply is left out, its content being sealed.

An apply building its content at run time is counted and named as unreachable rather than passed.

# Help

Read every manifest a `pipeline-engine` step applies, and rule that the RBAC grants create and patch on each kind inside it.

The manifest text judged is what the `synth.ts` emits when run, not whatever generated file is checked in — a stale generated file would otherwise certify a manifest nobody applies.

Five faults are refused, each with its own repair: an apply naming a path no synth emits; a kind the scope registry does not classify; a namespaced kind with no RBAC coordinates; a namespaced document nothing places in a namespace; and a resource type the RBAC does not cover.

A `.sops.yaml` apply is left out: its content is sealed, so nothing here can read what kinds it carries. An apply building its content at run time is counted and named as unreachable rather than passed.
