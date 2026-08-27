---
id: e478edb3-23e3-5e15-a035-8039497e372c
page-type-slug: old-ops-command
title: "Ops talos apply"
slug: ops-talos-apply
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/talos/apply.ts
path: talos apply
irreversible: true
---

# Definition

- **Ops talos apply** — one Talos node taken from maintenance mode to a configured member of its cluster.

# Help

First-install entrypoint: take a Talos node from maintenance mode to a configured cluster member.

End-to-end: registers the Image Factory schematic, builds the node's machine-config patch (+ a second config-patch carrying the node's user-volume / EPHEMERAL documents) and inlines the registry CA, decrypts the cluster's SOPS-encrypted secrets, runs `talosctl gen config <cluster> https://<vip-or-ip>:6443 --with-secrets ... --config-patch @... --output-types <controlplane|worker>,talosconfig` (the control-plane endpoint is the cluster VIP when defined — shared across members so SA-token issuer/audience match — else the node IP for single-node clusters; the machine type follows the node's role), writes the talosconfig to `~/.talos/<cluster>.config` (mode 0600), then runs `talosctl apply-config --insecure --file <controlplane|worker>.yaml`.

Requires `talosctl` and `sops` on PATH. Cluster secrets must already exist — run `ops talos secrets gen --cluster <name>` first.
