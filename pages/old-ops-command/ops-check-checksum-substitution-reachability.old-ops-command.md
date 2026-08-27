---
id: 4f915e5b-be73-50e2-8f7c-3f484bfe6164
page-type-slug: old-ops-command
title: "Ops check-checksum-substitution-reachability"
slug: ops-check-checksum-substitution-reachability
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-checksum-substitution-reachability.ts
path: check-checksum-substitution-reachability
---

# Definition

- **Ops check-checksum-substitution-reachability** — ruling that no checksum stamp is stranded behind a skip gate it can never get past.

# Help

Rule that no `checksum/*` pod-template annotation is stamped from a live cluster object inside a step a content-hash gate can skip.

Composes every `workflow-template` page over the code tree, resolves each step's commands, and looks for three things together in one step: a `sed` that substitutes a `checksum/*` key, a digest taken of something read back out of the cluster with `kubectl get`, and an early exit on an unchanged content hash. `ci.inputsHash` is derived from repo content, so reading the subject out of the cluster is the admission it can change with no repo change — and on the one event the substitution exists for, the gate closes before the `sed` runs and the workload keeps the superseded value with no signal.

A known-bad step is put through the detector before the tree is read, so a detector that has degraded into a no-op refuses rather than reporting clean.
