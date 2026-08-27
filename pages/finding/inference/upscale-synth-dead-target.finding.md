---
id: 87af8ae4-4292-5b97-8018-5da7b8e41a92
slug: upscale-synth-dead-target
page-type-slug: finding
title: "Upscale synth dead target"
domain-slug: domain/inference
---

# Claim

`packages/infra/upscale/k8s/synth.ts` is a real synth target whose generated yaml output nothing applies: the live producer (`serving-job.ts`/`upscale-cluster.ts`/`k8s-jobs.ts`) builds and POSTs its manifest in-memory and never touches disk, and synth.ts's own gitignored output has drifted from the live spec on image tag, bucket, and ConfigMap-vs-baked-in.

# Evidence

Source: #16065 (domain: `inference`), `someday_maybe`, filed by worker-16046; retired 2026-08-15.

**Claim established by worker-16046:** `serving-job.ts` is the live producer — it builds the Job manifest in-memory and POSTs JSON to `/apis/batch/v1` via `upscale-cluster.ts:71` -> `k8s-jobs.ts:34-40`; never yaml, never disk. `synth.ts`'s generated yaml is gitignored, CI-materialized only, and nothing applies or otherwise reads it.

**What it is:** the superseded #14565 bench (`backoffLimit: 0`, TTL 86400s) whose Job self-deleted 24h after its July run. It has drifted from the live spec on: image tag (`:14565` vs `:serving`), bucket, ConfigMap vs baked-in config, and weight cache.

**Sizing comment refuted by measurement:** its comment at `synth.ts:107-118` claims ~33.5GiB floor / ~26.7GiB free admitting a 24Gi request; measured at CI zero was 38.40GiB floor / 23.82GiB free — the claimed figures were never admitted. #16046 corrects the comment in place, deliberately leaving the literal rather than importing the live constant, so a future resize cannot retroactively falsify the historical record.

**Why this stood as its own project rather than folded into #16046:** `@infra/upscale`'s `worker` functionalType is inferred from the `kind: 'Job'` literal in `synth.ts`; deleting the file would force a functionalType change on a package Sophia was concurrently adding an inbound dependency to (importing `UPSCALE_JOB_MEMORY` into `node-headroom.ts`) — a functionalType cascade under a sibling's in-flight import, needing its own surfacing. Sequencing noted: strictly after Sophia's import lands; then verify `check-layer-monotonicity` for the `personas-cli -> @infra/upscale` edge (was 4>=4 at capture).

**Addendum 2026-07-25T11:01:57Z (self-correction):** UNBLOCKED — Sophia's #16057 turned out to be a deletion, not the constant-import this was sequenced behind, so the inbound edge never formed and the functionalType concern does not arise. Take whenever capacity allows.
