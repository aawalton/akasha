---
id: 4b20fff7-d1ff-5463-8c2a-a995b124bc4e
slug: eso-node03-unbuilt
page-type-slug: finding
title: "Eso node03 unbuilt"
domain-slug: domain/node
---

# Claim

In the node domain, node-03 was locked (2026-07-24, nimue confirmed) as the ground-layer node for the ESO GPU-rig project (#15804): /dev/uinput needed a Talos machine-config kernel-module addition not yet loaded on any node, and a persistent ~100GB ESO install needed a UserVolume on node-03's non-system HDD (sdb). Both were designed with specific code seams identified, but neither had been built.

# Evidence

Source: project #15805 (someday_maybe, live-on deploy, domain node), captured notes only, no objective, moved off the `notes` attribute 2026-08-15. Ground-layer slices for nimue's #15804 (ESO GPU-rig). Owner Aranya, reporting to nimue.

S1 (/dev/uinput): NodeIntent schema packages/infra/talos/src/schema.ts L105-149 — add `kernelModules: z.array(z.string()).default([])`; set on the chosen node in nodes-main.ts. build-patch.ts L57/L85-99: the nvidia-gated block owns machine.kernel.modules — must merge as one key (a second key is a last-write-wins clobber). Golden-YAML snapshots need updating. Apply via `talosctl patch machineconfig --mode=auto`, dry-run first. uinput confirmed not loaded on any node; a module load is boot-time in Talos, so a reboot was expected.

S3: precedent packages/infra/k8s/postgres/synth.ts L185-213 (hostPath DirectoryOrCreate, nodeAffinity, Retain, no StorageClass). Caveat: kubelet does not fsGroup-chown hostPath, so a non-root pod needs a one-time chown; keep the PV off etcd WAL on a CP node.

Node choice: only node-02 held a GPU; 04/06/05 ruled out (SeaweedFS/CI/heaviest CP load). node-01 (initial pick) ran postgrest+coredns+metallb — a reboot bounces the pages API and DNS. node-03 was lightest CP, quorum-safe, most headroom.

Node locked 2026-07-24T15:22: node-03, RTX 2060, ample for headless ESO. node-03 is an etcd member (with 01, 05) — guardrails: resource-limits/QoS on the rig pod (nimue's S2), PVC off etcd WAL (S3, via sdb). Disks: sda 1.0TB SSD (system, etcd); sdb 2.0TB HDD, ~1.9TB free.

S3 mechanism: add UserVolume `eso-install` to node-03, diskSelector `!system_disk && disk.size > 100u * GiB` (resolves sdb), minSize 150GB, xfs, mounted /var/mnt/eso-install; hostPath PV per the CNPG precedent, nodeAffinity node-03, Retain.

Status: awaiting a GPU-card tiebreak, then a worker dispatch; live apply supervised by Aranya. GPU-rig pod build tracked as #15808. Capture cut at a paragraph boundary; above is only its head.
