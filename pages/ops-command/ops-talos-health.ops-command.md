---
id: 1ba823e9-c9e5-5b12-81c7-a43568d0a403
page-type-slug: ops-command
title: "Ops talos health"
slug: ops-talos-health
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/health.ts
path: talos health
---

# Definition

- **Ops talos health** — the talosctl health check against one node and the cluster topology it names.

# Help

Run `talosctl health` against the given node. Reports etcd, apid, kubelet, and control-plane readiness. Use this after `ops talos bootstrap` to confirm the cluster is healthy before running the smoke test. Picks up `~/.talos/<cluster>.config` automatically.
