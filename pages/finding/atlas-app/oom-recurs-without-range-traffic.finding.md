---
id: c830c9b3-1681-58bb-9ab7-03bdf8794b7d
page-type-slug: finding
title: "Oom recurs without range traffic"
domain-slug: domain/atlas-app
---

# Claim

The range guard shipped for the atlas web container's OOM kills is deployed and the kills continue, and this one was no range read: every request in the killed container's life carried no `Range` and none reached the basemap route, the only callers being the kubelet probe and the monitor. The watermark added beside the guard reported its last high at 157.3MiB against a kill at 253MiB of anonymous RSS, so the instrument built to catch the burst does not see it either.

# Evidence

Pod `atlas-7f5fcc4fdc-68blw` on node-04, namespace `alanwalton`. Container `atlas` records `exitCode=137` and `reason=OOMKilled`, started 2026-08-15T18:39:49Z and finished 22:08:15Z; the `code-sync` sidecar `restartCount=0`.

`talosctl -n 192.168.68.90 dmesg` holds three kills of this container's cgroup: 2026-08-14T11:20:00Z, 08-15T07:35:34Z, 08-15T22:07:38Z. Each reads `oom-kill:constraint=CONSTRAINT_MEMCG`, naming the container's own 256Mi bound rather than the pod's or the node's; each names `JITWorker` as the thread invoking the killer and kills `bun` at `anon-rss` 259212kB, 258872kB and 259376kB against a 262144kB limit.

The killed container's log holds 4,148 requests over 3h28m: `GET /api/health` from `kube-probe/1.33`, `GET /` and `GET /sign-in` from `devops-monitor/1`, and 18 asset fetches. Every request line reads `range=-`; no request line fails to, and `basemap` appears nowhere. That `range=` field and the guard landed in one commit, `9393e04883 atlas(#17887)`, so the field is what shows the guard running here.

The same log holds three watermark lines and no fourth: `rss high=136.1MiB`, `144.5MiB`, `157.3MiB`. `app/lib/memory-watch.ts` samples every 2,000ms on an 8MiB step, so twelve steps up to 253MiB went unsampled. The last request line reads `rss=160.4MiB`.

Prometheus never approaches the limit: `container_memory_working_set_bytes` reads 123.2MiB on the last scrape, `container_memory_max_usage_bytes` 163.6MiB for the whole life, `container_oom_events_total` 0 across thirty days. `node_memory_MemAvailable_bytes` on node-04 holds above 9GiB through the kill.

`packages/alanwalton/atlas/web/deploy/k8s/synth.ts:206` sizes this container `256Mi` request and limit; lines 143 and 240 give its init container and sidecar `256Mi` over a `2Gi` limit.

Not established: what was allocated between 160.4MiB and 253MiB. No heap profile was taken, and nothing separates a burst outrunning the 2,000ms sampler from one blocking the loop that runs it.
