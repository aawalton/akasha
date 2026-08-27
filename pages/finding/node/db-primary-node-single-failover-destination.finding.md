---
id: df087033-0aca-57aa-8230-7060b2ae0ebe
page-type-slug: finding
title: "DB primary node single failover destination"
domain-slug: domain/node
---

# Claim

The database workload-class label sits on exactly two nodes (node-02, node-03); required anti-affinity plus two instances means both slots are always full, so a node-03 cordon has exactly one legal destination, node-02, where identical work costs 27x more per-statement (~388ms vs 14ms) than node-03 carrying the whole primary load — and no automated path restores the primary once node-03 returns Ready. node-06 (32cpu/65GB) lacks the label and is the only node eligible to become a third.

# Evidence

Project #16154, domain node, no objective; capture off retired `notes` attribute 2026-08-15. Left open by the 07-24/25 degradation; not pushed via ask-alan overnight.

Label set (aranya, verified live): nodeSelector workload-class.database=true, required podAntiAffinity, instances=2. Eligible: node-02 (12cpu/65GB, 2017), node-03 (16cpu/32GB, 2020). Not eligible: node-06 (32cpu/65GB, largest in fleet, ~36% used), node-01, node-04, node-05. 2 eligible + required anti-affinity + 2 instances = both slots full; a node-03 cordon has exactly one legal destination, the 2017 box.

Observed cost: 16:38:57Z 07-24 node-03 cordoned -> 16:44:01Z promotion to node-02 -> 22:56:47Z node-03 Ready, primary not returned -> 12:34Z 07-25 Alan notices, instructs switchover, astra executes. 20h on older hardware, no auto restore.

Magnitude (byte-identical work): node-03 standby 365.25ms; node-03 primary 379.4ms; node-02 primary 753.76ms. Carrying the whole primary workload costs node-03 ~14ms; being on node-02 costs 388ms — 27x. Confirmed on production traffic: 0.41-1.21 -> 0.21-0.32 ms/call while calls/min rose 107-165k -> 237-266k.

Compounding: cpu limit 4 (#15860) — slower cores need more CPU-seconds, reaching the cgroup ceiling sooner; placement penalty and throttle are one mechanism from two angles.

No automated cordoning agent exists (athena verified: no kured/reboot-coordinator/node-problem-detector pods, no retained NodeNotSchedulable events) — both the cordon and the restoration were authored actions. Two independent gaps: the label set makes the destination inevitable; the absent restore path makes the duration inevitable.

Related: #16149 (CI needs anti-affinity keyed to cnpg.io/instanceRole=primary, not a node name). #15851 (pre-flight gate) covers before a cordon; nothing restores the primary after Ready.

Correction: an earlier ask-alan offering "move primary to node-06" was withdrawn — Alan already answered via astra 40min prior, node-06 was never eligible.
