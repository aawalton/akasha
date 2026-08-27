---
id: 5ace361c-2f85-5ccf-b228-a095604a7154
page-type-slug: finding
title: "Node 03 single pin fleet risk"
domain-slug: domain/node
---

# Claim

In the node domain, node-03 hosts single-node-pinned bridge infrastructure (registry, git-transport, a postgres replica) with no relocation, replication, or cordon guard: a routine cordon strands them and cascades into a cluster-wide ErrImagePull outage. The 2026-07-24 fleet-wide wedge (a maintenance cordon whose uncordon was missed) showed both that outage and a ~100-minute postgres-primary write-surge slowdown when 23 crash-looped workers resumed writing at once on uncordon.

# Evidence

Source: project #15849 (someday_maybe, live-on deploy, domain node), captured notes, no objective, moved off `notes` 2026-08-15.

Surfaced by the 2026-07-24 fleet-wide wedge (dalla). node-03 was cordoned for maintenance and its uncordon was missed; the registry, git-transport, and a postgres replica are all PV-node-affinity-pinned to node-03 (single-node local storage), so the cordon stranded all three, taking the registry down and cascading into a cluster-wide ErrImagePull outage (23 workers crashlooping, pipeline lag, all CI/git pushes failing). Root fix was one uncordon; the exposure remains — every routine node-03 cordon repeats this.

Candidate directions (Intent unsettled, spans ground-layer): (a) de-single-node the bridge infra; (b) a cordon-procedure guard draining node-local storage-bound infra first; (c) a cordon-detection sensor for bridge infra cordoned >N min. Owner dalla (bridge) with Aranya (ground-layer). Blast radius fleet-wide; Intent to be settled with Alan before dispatch.

Sibling #15851 (Aranya): a node-reboot pre-flight GO/NO-GO gate enumerating node-pinned single-replica infra plus CNPG 2/2 and etcd quorum before cordon/drain/reboot. #15849 de-pins the bridge infra, shrinking what #15851 must block.

Demand-pull (nimue): ESO (#15804/#15805) became a firm downstream consumer — ESO stays on node-03 (a swap doesn't escape etcd co-location, avoids a 150GB re-provision), so #15849 gates ESO's critical path. Scope unchanged: fix stands on fleet-resilience terms, not ESO.

Second-order cost (#15860, prod-DB incident): on uncordon, 23 crash-looped workers resumed writing at once, a ~100-min write surge (page_patch 8.4x baseline) CPU-throttled cnpg-2's primary — ~75% of hot queries ran 3-26x baseline, ~16:39Z-18:20Z, self-resolving. Blast radius is the cordon outage plus this recovery surge; de-pinning removes both.

Capture was cut at a paragraph boundary; text above is only its head.
