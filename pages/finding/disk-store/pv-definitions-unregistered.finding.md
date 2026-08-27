---
id: 497f6604-16a7-50dc-9dbf-b06f91188cba
slug: pv-definitions-unregistered
page-type-slug: finding
title: "Pv definitions unregistered"
domain-slug: domain/disk-store
---

# Claim

The estate's persistent volumes are declared in two scattered layers with no registry over either, so nothing enumerates them without already knowing every component that declares one. Ten live PVs are defined across six component directories as generated manifests, and the physical volumes beneath them are declared separately in the Talos node config. No glob reaches the set: one directory names its file `storage.generated.yaml`, so even a name-based sweep misses it.

# Evidence

Measured 2026-08-05 against the live cluster and the code repository.

`kubectl get pv` returns ten: `electric-shape-storage` (20Gi, node-02), `git-transport-data` (5Gi, node-03), `postgres-cnpg-2-data` and `-wal` (100Gi, 20Gi) on node-02, `postgres-cnpg-3-data` and `-wal` on node-03, `prometheus-data` (200Gi, node-02), `registry-data` (50Gi, node-03), `seaweedfs-backup` (500Gi, node-06), `seaweedfs-data` (500Gi, node-04). Every one is node-pinned; none carries a storage class.

`grep -rl "kind: PersistentVolume" packages/infra --include=*.generated.yaml` returns twelve files under six directories: `infra/git/transport/k8s/generated`, `infra/k8s/electric/generated`, `infra/k8s/postgres/generated`, `infra/k8s/prometheus/generated`, `infra/k8s/registry/generated`, `infra/seaweedfs/k8s/generated`. A `find` on `*pv*.generated.yaml` and `*pvc*.generated.yaml` returns eleven — it misses `infra/k8s/electric/generated/storage.generated.yaml`, which declares `electric-shape-storage`. The naming convention is not one.

Beneath these sits a second declaration. `infra/talos/src/nodes-main.ts` declares the Talos `UserVolumeConfig` per node — `git-transport` and `registry` on node-03, `postgres-data` and `postgres-wal` on node-02, `seaweedfs` on node-04 — and `build-volumes.ts` emits them. A volume's size, filesystem and disk selector are stated there while its Kubernetes capacity, access mode and node affinity are stated in a component's generated manifest, and the two must agree with nothing checking that they do.

What this cost: `pages/domain/disk-store.domain.md` was cut on 2026-08-05 and deliberately left without a `code-path`, because no glob reaches the concern without either naming six directories or capturing whole components that are mostly something else.

Not measured: whether the two layers currently disagree anywhere, and whether any generated PV manifest has no Talos volume beneath it.
