---
id: 230019ad-7c95-502d-817e-6ad893a3fdaf
page-type-slug: ops-command
title: "Ops talos kubeconfig"
slug: ops-talos-kubeconfig
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/kubeconfig.ts
path: talos kubeconfig
---

# Definition

- **Ops talos kubeconfig** — the Talos cluster's kubeconfig, fetched and written to a file on the workstation.

# Help

Fetch the kubeconfig for the Talos cluster and write it to the workstation. Defaults to `~/.kube/talos-<cluster>.yaml`; override with `--output`. Picks up `~/.talos/<cluster>.config` automatically.

Talos uses a separate cluster API endpoint from the existing k3s `~/.kube/config`; keep them in distinct files to avoid cross-cluster confusion.
