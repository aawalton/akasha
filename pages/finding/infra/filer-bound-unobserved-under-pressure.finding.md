---
id: 6fbd4ef7-661d-549c-83a1-970b7652833e
page-type-slug: finding
title: "Filer bound unobserved under pressure"
domain-slug: domain/global
---

# Claim

The filer's GOMEMLIMIT bound is live and the memory it was set against has fallen sharply, but the bound has not yet been observed under pressure: nothing since the rollout has come near the 1664 MiB cap, so whether the runtime plateaus below its container limit or overshoots it is unmeasured. The peaks this project was opened against arrive in the nightly backup marches and CNPG base-backups, neither of which has run under the bound yet.

# Evidence

The one criterion of project 18490 no instrument could settle on demand, kept here so it survives the close.

VERIFIED BY THE LEAD 2026-08-10 22:22Z, off the running system rather than the delivering seat's account. `go_gc_gomemlimit_bytes{component="filer"}` reads 1744830464 — 1664 MiB — where before the rollout it read the Go runtime's MaxInt64 "unset" sentinel. `GOGC` remains 100. The deployment carries `GOMEMLIMIT=1664MiB` in the container env, and `resources` reads request and limit both 2048Mi, so the 384 MiB reserve is the difference and not an independent number.

`synth-constants.ts:125-127` derives it from one constant, which also feeds the request and limit at `synth-deployments.ts:251-252`. The stale "~10Gi unrequested" node figure and the incorrect Guaranteed-QoS claim are gone from the comment.

THE EFFECT SO FAR. At 19:57Z before the change: `go_memstats_sys_bytes` 2032 MiB against a 2048 MiB limit (99.2%), heap in-use 1319 MiB, RSS 1587 MiB. At 22:22Z under the bound: sys 850 MiB, heap in-use 562 MiB, RSS 557 MiB. The pod has 0 restarts at 67 minutes.

OUTSTANDING. The criterion reads: the filer's peak resident memory plateaus below its container limit through its heaviest write bursts, rather than climbing to meet it. The delivering seat observed 42 minutes across three CNPG backup bursts — mapped memory rose 609 to 850 MiB then flattened for sixteen samples, RSS peaked 713 MiB, GC steady at 2.2/min with no thrash. Healthy and cheap, but nothing approached 1664 MiB, so the bound was never under pressure.

WHAT WOULD SETTLE IT. The 1881 MiB peak this project was opened against came from the nightly marches at 04:17-05:24 UTC and from CNPG Barman base-backups. An observation covering those, under the bound, either shows RSS plateauing below the container limit or shows overshoot past the soft cap.

NOT MEASURED. Whether the 384 MiB reserve holds a full `-concurrentUploadLimitMB` burst in practice rather than in arithmetic. What the bound costs in CPU when it binds.
