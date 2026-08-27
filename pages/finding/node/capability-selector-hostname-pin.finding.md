---
id: 754cfda7-714f-5d7e-a7a9-b80f54d0d459
slug: capability-selector-hostname-pin
page-type-slug: finding
title: "Capability selector hostname pin"
domain-slug: domain/node
---

# Claim

`capabilitySelector(X)` resolves to exactly one hostname by construction, so the check that rejects hostname pins accepts it as the approved replacement for one.

# Evidence

VERIFIED first-hand (aine, 2026-07-25) against the live cluster; prediction stated before the query ran and held.

Two label families differ in shape. MEMBERSHIP (`workload-class.<v>=true`) is multi-valued: `.ci` matches {01,04,05,06}, `.control` {01,03,05}, `.build` {03,06}, `.database` {02,03}. CAPABILITY (`workload-class=<v>`) is single-valued per node, a perfect bijection onto the six hostnames: control->01, database->02, build->03, serve->04, workers->05, ci->06. ~23 TS call sites use it.

`cluster-topology.md:43` records umbrella #11595 as removing hostname acceptance from `check-k8s-node-selector` (closed in #11813). What happened: `kubernetes.io/hostname: node-01` became `alanwalton.com/workload-class: control`, same physical node. The pins were renamed, not removed; the check now rejects the honest spelling and accepts the synonym.

Cost: cordoning node-02 strands seven single-homed workloads. Four have a warrant (postgres-cnpg-2, prometheus, electric, voice-infer #16060). Three have none, all VERIFIED: grafana, loki, kube-state-metrics — bound only by `workload-class=database`, and they are the fleet's own metrics/logs.

#15851's pre-flight gate enumerates hostPath/local PVs, required nodeAffinity to a hostname, and single-replica-with-no-other-home; a capabilitySelector pin is none, so targeting node-02 it names 3 tenants and misses 4.

Related: `workload-class=workers` is a DEAD label — VERIFIED zero membership matches, zero live workloads select it. Declared at `packages/infra/talos/src/nodes-main.ts:424`.

Also flagged: #16154 proposes making node-06 `database`-eligible; #16149's check defines `CI_INCOMPATIBLE_CLASSES = ["database","workers"]`, reading both label forms — two rows in one workstream, one proposing what the other forbids.

Provenance: 1.2 fleet review, 2026-07-25; re-verified live by aine before filing. A later correction (dalla) found the `workers` premise above was backwards; the conclusion survives via the opposite premise. Was #16282.
