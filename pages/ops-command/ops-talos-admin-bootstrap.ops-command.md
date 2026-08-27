---
id: 8a768efd-3308-51e9-a8fd-0eaa7c9f1ae2
page-type-slug: ops-command
title: "Ops talos admin-bootstrap"
slug: ops-talos-admin-bootstrap
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/admin-bootstrap.ts
path: talos admin-bootstrap
---

# Definition

- **Ops talos admin-bootstrap** — the cluster-scoped admin installs, run against a Talos cluster's admin kubeconfig.

# Help

Run the cluster-scoped admin installs (MetalLB, cert-manager, CloudNativePG operator, Barman Cloud plugin, pipeline-engine-escalate RBAC) against a freshly-bootstrapped Talos cluster's admin kubeconfig (§6.8 of the migration plan) — run once, by hand, after `ops talos kubeconfig`.

The native manifests pin their controllers to `node-01` (absent from the Talos cluster during Phase B), so each admin Deployment's nodeSelector is patched to `alanwalton.com/workload-class=<control-class>` after apply. Pass `--control-class none` to unpin them instead (schedule on any node) — used during a uniform-control-plane phase where no node yet carries the target class. The shared manifests are left untouched. Idempotent: `kubectl apply` + `rollout status` re-run as no-ops when already healthy.
