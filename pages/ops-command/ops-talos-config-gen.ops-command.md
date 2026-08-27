---
id: 25fc11ce-13ec-52c2-a441-17a756e5d3ef
page-type-slug: ops-command
title: "Ops talos config-gen"
slug: ops-talos-config-gen
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/config-gen.ts
path: talos config-gen
---

# Definition

- **Ops talos config-gen** — the Talos machine-config overlay documents for one node, as YAML.

# Help

Emit the Talos machine-config overlay documents for the given node.

Output is a multi-document YAML: the strategic-merge patch applied on top of `talosctl gen config`'s baseline at apply time (hostname, install disk/image, control-plane VIP, registries+CA trust, kubelet extraMounts, etcd quota, cluster CIDRs + scheduling, node labels) followed by the auxiliary storage documents (`UserVolumeConfig` per re-homed store, `VolumeConfig EPHEMERAL` for a dedicated etcd disk). Not the cluster PKI (which lives encrypted in `secrets.sops.yaml`).

Reads `TALOS_SCHEMATIC_ID` from the environment when present so the emitted `machine.install.image` points at the Image Factory installer for the node's extensions. Falls back to a placeholder when unset (useful for golden tests; an unset value will fail `talosctl apply-config`).
