---
id: da3d70ff-fbe7-51b0-a6b9-6cf0b94b50cb
page-type-slug: ops-command
title: "Ops talos bootstrap"
slug: ops-talos-bootstrap
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/bootstrap.ts
path: talos bootstrap
irreversible: true
---

# Definition

- **Ops talos bootstrap** — etcd bootstrapped on one Talos control-plane node.

# Help

Bootstrap etcd on the given Talos control-plane node. One-time per cluster — re-running on a healthy cluster does nothing useful; re-running on a broken cluster can destroy etcd state. Apply config first via `ops talos apply`. Picks up `~/.talos/<cluster>.config` automatically.
