---
id: 639e2f9e-a1d9-5844-8013-dd5c1002fb64
page-type-slug: finding
title: "Filer limit raised instead of bounded"
domain-slug: domain/global
---

# Claim

The seaweedfs filer runs with `GOMEMLIMIT` unset and `GOGC=100`, so raising its memory limit cannot stop it being OOM-killed: the Go runtime sizes each GC against live heap alone and grows into whatever ceiling it is given. It was killed at 512Mi, raised to 2Gi, and reached 91.8% of 2Gi on 2026-08-10. The same package sets `GOMEMLIMIT` on its backup CronJob under a comment reading "the limit bump is not a treadmill" — the filer got the bump instead of the bound.

# Evidence

On 2026-08-10 `ContainerMemoryNearLimit` fired for `seaweedfs/filer` at 91.84% of its limit. `go_gc_gomemlimit_bytes{component="filer"}` returned 9223372036854775807 (the Go runtime's "unset" sentinel) and `go_gc_gogc_percent` returned 100. The running pod's env carries only `POD_IP`, `WEED_LEVELDB2_ENABLED` and `WEED_LEVELDB2_DIR`.

At 19:57Z against a 2048 MiB limit: `go_memstats_sys_bytes` 2032 MiB (99.2%), heap in-use 1319 MiB, live alloc 1242 MiB, next-GC target 1522 MiB, released to OS 346 MiB. `container_memory_rss` 1.587 GiB of a 1.607 GiB working set with `container_memory_cache` 0.035 GiB — 98.8% anonymous, so the kernel cannot reclaim it.

`kubectl` reports the pod's one prior termination as `exitCode: 137, reason: OOMKilled, finishedAt: 2026-07-10T09:18:39Z`. `packages/infra/seaweedfs/k8s/synth-deployments.ts:234` records the response: "512Mi OOMKilled the filer during a CNPG Barman base-backup multipart upload... 2Gi gives headroom".

`synth-backup.ts:168` states the alternative in the same package: export GOMEMLIMIT "so RSS plateaus instead of climbing into a cgroup OOM-kill... the runtime trades CPU for staying alive, so the limit bump is not a treadmill."

Memory tracks writes, not traffic. Over 7 days at 5m resolution against filer RSS: HTTP PUT r=+0.701, leveldb2 insert r=+0.583, update r=+0.555; HEAD r=-0.000, GET r=+0.025, prefixList r=+0.049, find r=+0.036. Request rate stayed between 26.7 and 32.3 req/s all day while RSS went 0.63 to 1.84 GiB.

Daily max RSS over 30d ranges 0.75-1.65 GiB and returns to a ~0.63 GiB quiet baseline, so the floor is not rising; the peaks are. Today's 1.815 GiB is the highest in the window.

NOT MEASURED. What value GOMEMLIMIT should take was not derived. Whether other Go containers in the fleet carry limits without it was not surveyed. The 12:30Z step from the quiet baseline into a 1.0-1.4 GiB band was not attributed to a named workload.
