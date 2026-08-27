---
id: 8b50482b-d3be-5180-8357-aabcd01e7610
page-type-slug: finding
title: "Node04 slice overcommitted"
domain-slug: domain/node
---

# Claim

Node-04's summed container memory limits (20928Mi) exceed its kubepods slice ceiling (15533Mi) by a ratio of 1.35, measured 2026-07-25 ~23:50Z — the parent-slice-kill precondition is already met today, not merely something a future limit raise would arm. Three more nodes (node-05, node-01, node-03) sit at 0.90-0.95 and are one modest limit increase from crossing.

# Evidence

Measurement (`kubectl describe node` Limits vs `/sys/fs/cgroup/kubepods/memory.max`), all six nodes, 2026-07-25 ~23:50Z:

    node      kubepods_max   sum_limits   ratio   slice_used_now
    node-01      15282 Mi      14002 Mi   0.92        43.3%
    node-02      63470 Mi      41578 Mi   0.66        50.4%
    node-03      31496 Mi      29776 Mi   0.95        66.4%
    node-04      15533 Mi      20928 Mi   1.35        30.0%   <-- OVERCOMMITTED
    node-05      31500 Mi      28416 Mi   0.90        46.2%
    node-06      63821 Mi      36112 Mi   0.57        47.4%

Latent hazard, not active pressure: node-04 is 1.35x overcommitted yet at 30% slice utilization, the least-pressured node in the fleet at that instant. Corroborating: worker-16219 measured `memory.events.local` `oom_kill` = 0 on all six nodes, `max_over_time[30d]` = 0 fleet-wide — node-04 has been overcommitted a while without firing. Node-04 is the sole `workload-class.serve=true` holder, starved CI on #16189/#16325, and is the node whose ~5Gi headroom the 4Gi typesafety shard was sized against (#15576).

Design question open, not decided: a signal today fires on a condition with zero resulting kills over an unknown period — noisy on arrival. Candidates: ratio > 1 alone (noisy); ratio > 1 AND high slice utilization (no threshold data yet); or no alert — a report/pre-merge check on limit changes, since the ratio only changes when a limit is edited (earliest, most deterministic point, cannot be muted). Establish how long node-04 has been over 1.0 first.

Relationship to #16219: that detects the EVENT (reactive); this detects the CONFIG (predictive) — deliberately not folded together. A latching tripwire was overruled per #16344 (one signal, two quantities): a counter resetting only on reboot reports kills-since-boot, not danger-is-live, and doesn't clear on a correct revert.

Project #16357, someday_maybe, domain node. Carried no objective; captured off the project's retired `notes` attribute on 2026-08-15.
