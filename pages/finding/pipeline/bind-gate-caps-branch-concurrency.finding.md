---
id: facd6de3-2d5f-5786-8450-cf849b6e9ef2
page-type-slug: finding
title: "Bind gate caps branch concurrency"
domain-slug: page-type/pipeline
---

# Claim

The CI dispatcher's node-bind gate `resolvePlacement` binds a first-seen branch pipeline to one node for life by asking only whether a node can EVER host the pipeline's heaviest step rather than how many such steps it can hold concurrently, and paired with a least-loaded-node preference this capped branch-pipeline concurrency at ~8 while measured cluster utilisation sat at 44% on 2026-07-25, driving dwells up to 97 minutes.

# Evidence

Project #16249, domain `pipeline`, tags `ci throughput dispatcher capacity author:vera`, owner `dalla`, status someday_maybe.

Captured by vera 2026-07-25 during the full stop, from Alan's question "why did pipelines go from <1m checks / <10m main to ~10m / 30+ min." Not dispatched; handed to dalla as devops pipeline keeper.

DEFECT: `resolvePlacement` (select-next-placement.ts:185-216) binds a first-seen branch pipeline to one node for life. Bind gate :194 (`nodesEverFitting`) asks only whether a node can EVER host the heaviest step, never how many concurrently; `leastLoadedFitting` (:209-211) prefers the emptiest node, so small nodes magnet.

MEASURED 2026-07-25 (pipelineMax 4096Mi/5000m, 172/181 binds): node-01 5518Mi/1 step/16 bound; node-04 5143Mi/1 step/90 bound; node-05 CPU-bound 11070m/2 steps/70 bound; node-06 23360m reserved/4 steps/5 bound. Branch concurrency ~4 + ~4 main/mq on node-06 => ~8; measured mean 8.3-10.6 matches. Worst-hour cluster use 44% — free capacity unreachable by construction. Dwells 97/93/76/56 min, all node-04. 5,066 deferred steps vs 649 on 07-24.

HOW IT GOT HERE: Jul 2 #14147 set check-step CPU to per-step p95, halving per-node packing (peak 63->37); check p50 doubled for 22 days. Jul 16 #15576 sharded check-typesafety-bundle 8Gi->4Gi so node-01/04 pass the ever-fit filter (unverified magnet). Jul 25 arrivals rose 3.7x (181 vs 49) — ceiling stopped theoretical.

RULED OUT: tick cadence, reservation ledger, Postgres/K8s errors, head-of-line halt.

LEVER, untested: bind target must hold N concurrent heaviest-steps, not one; sizing N open. Related: #14147's per-step-p95 sizing reserves every peak simultaneously — aggregate p95 may be better.

ALSO RECORDED: dispatcher-tick.ts:220 logs one line/deferred candidate/tick (up to 1.15M/hr), destabilized Loki (OOMKilled 3x, self-recovered). node-capacity.ts:162-167+:202-203 subtracts fleet-wide unbound-pod total from every node (over-subtraction), deliberate per #14388, latent.
