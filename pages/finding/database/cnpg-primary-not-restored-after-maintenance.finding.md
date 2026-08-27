---
id: 44b54ca1-2443-55d8-9cca-146f7021b27c
page-type-slug: finding
title: "Cnpg primary not restored after maintenance"
domain-slug: domain/database
---

# Claim

The 07-24/25 estate latency degradation traces to node-03 being cordoned for maintenance at 16:38:57Z on 07-24, which correctly made CNPG switch the postgres primary to node-02 at 16:44:01Z — but CNPG never restored the primary to node-03 once it came back Ready 6h18m later, so it ran on the older, slower node-02 for ~20 hours until manually switched back at 12:39:17Z on 07-25, answering the trigger question `pages/finding/database/cnpg-failover-latency-cause.finding.md` left open.

# Evidence

Project #16152, domain database, no objective; capture off retired `notes` attribute 2026-08-15. Root cause of #16058; captured 07-25 from the live reversal.

Trigger, verbatim CNPG operator log: 16:38:57.058Z "Current primary is running on unschedulable node, triggering a switchover"; 16:44:01.755Z currentPrimary=postgres-cnpg-2 (node-02). node-03 was cordoned ~16:38; CNPG correctly evacuated the primary. node-03 came Ready again 22:56:47Z (6h18m later), postgres-cnpg-3 recreated there as a replica — the primary was never returned; it ran on node-02 ~20h.

Destination was forced, not chosen: nodeSelector workload-class.database=true, required podAntiAffinity, instances=2. Only node-02 (12cpu/65GB) and node-03 (16cpu/32GB) are eligible; node-06 (32cpu/65GB) is not. 2 eligible nodes + required anti-affinity + 2 instances = both slots always full; a node-03 cordon has exactly one legal destination, the older/busier machine. Recurs on every future node-03 maintenance.

Reversal 12:39:17Z confirms causation: node-02 0.41-1.21ms/call (107-165k calls/min) -> node-03 0.21-0.32ms/call (237-266k calls/min) — latency fell ~3x while volume rose ~60%. A zero-data statement isolates it: node-02 0.0386-0.0878ms vs node-03 0.0157-0.0175ms, disjoint, matching the 07-11..07-23 baseline (astra). Corroborated by dalla's A/B: node-03 361-374ms vs node-02 533-863ms, 2.06x.

Why undetected 20h: (1) no restore path post-maintenance (#15851 is pre-flight only); (2) no detection — no throttle/crash/error/restart, only latency against a baseline nothing compared to; (3) the #15860 tripwire was scoped to throttle events, not placement.

Lesson: one trigger produced a self-resolving throttle and a non-self-resolving relocation; verifying the transient resolved (#15860, closed correctly) said nothing about the permanent one, checked against the incident's own peak, not the pre-16:44 baseline.

Companion: which node the primary should run on is a decision for Alan, tracked on #16154.
