---
id: 9e8cfbb9-b446-568c-821b-b09eac50155c
page-type-slug: finding
title: "Node drain no preflight gate"
domain-slug: domain/node
---

# Claim

No deterministic gate checks a target node for stranded single-homed workloads, CNPG health, or etcd quorum before it is cordoned or drained, and node-03 is the fleet's only node combining registry, git-transport, and a cnpg replica with no other home.

# Evidence

Filed as project #15851, domain `node`, status `someday_maybe` — a correction born of the #15805 node-03 fleet cascade (2026-07-24).

Incident: an agent cordoned+drained node-03 for a uinput reboot without checking what the drain would strand. node-03 hosts registry + git-transport (hostPath UserVolumes) + a cnpg replica, all single-node-pinned with no other home, so the drain took registry down: cluster-wide ErrImagePull (~23 workers crashlooping), git/CI bridge down, pipeline lag, plus CNPG failover. Recovered via an Alan-authorized uncordon (dalla). The pre-flight run checked only etcd + node-Ready — insufficient.

Sibling project #15849 (dalla): de-pin registry/git-transport so node-03 stops being a fleet SPOF; aranya required. #15849 reduces what must be blocked; this gate (unbuilt) would protect until #15849 lands plus cover residual single-home infra.

Proposed deliverable (captured, not built): a pre-reboot GO/NO-GO check, `node-reboot-preflight <node>`, verifying (1) node-pinned single-replica workloads a drain would strand (hostPath PVs / required nodeAffinity / no other schedulable home — known set on node-03: registry, git-transport, cnpg); (2) CNPG readyInstances==desired and target not the sole healthy primary; (3) etcd quorum survives if the node is control-plane; (4) no other node mid-reboot/NotReady. Also proposed: require this gate in the node-maintenance runbook, and a five-whys on the incident.

Until this or #15849 landed, the #15805 reboot stayed deferred to an announced window.

Cluster map (2026-07-24, 6 nodes): CP/etcd = node-01/03/05 (tolerates losing 1); workers = node-02/04/06. Single-replica storage: node-02 cnpg-2 PRIMARY+electric+prometheus; node-03 registry+git-transport+cnpg-3 replica; node-04 seaweedfs-data; node-06 seaweedfs-backup; node-01/05 clean. CNPG: 2/2 ready, primary node-02, replica node-03. Blast-radius (low-high): node-01/05 < node-06 < node-03~node-04 < node-02.

No `# Objective` — captured, never defined.
