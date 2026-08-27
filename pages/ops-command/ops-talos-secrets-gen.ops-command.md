---
id: 79187278-968a-5d70-83ee-768271d46061
page-type-slug: ops-command
title: "Ops talos secrets gen"
slug: ops-talos-secrets-gen
domain-parent-slug: domain/ops-talos-secrets
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/secrets/gen.ts
path: talos secrets gen
irreversible: true
---

# Definition

- **Ops talos secrets gen** — a Talos cluster's PKI bundle, generated and written SOPS-encrypted.

# Help

Generate a Talos cluster's PKI bundle and write it SOPS-encrypted to `pages/cluster/<cluster>.sops.yaml`, beside that cluster's page.

Run once per cluster, before the first `ops talos apply`. Re-running with `--force` rotates the PKI — every node in the cluster must be re-applied + re-bootstrapped (etcd state lost), so only do that on a deliberate rotation.
