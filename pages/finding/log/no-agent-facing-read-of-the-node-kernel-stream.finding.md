---
id: da768bc2-3707-51e1-bb55-cfd5a2d06bea
slug: no-agent-facing-read-of-the-node-kernel-stream
page-type-slug: finding
title: "Nothing an agent can run reads the nodes' own kernel log"
domain-slug: domain/log
---

# Claim

Nothing an agent can run reads the nodes' own kernel log, and the one command that appeared to has been removed for answering about the collector rather than about the nodes.

# Evidence

Measured 2026-08-19 against the live cluster, before `ops loki kernel` was removed the same day.

That command queried Loki's shipped capture of the kernel stream. Over a 24h window it returned 5000 records across 6 of 6 nodes, current to within minutes. Classifying those 5000 by message: 1182 talos NTP time-query failures, about 2750 `cni0` port and `veth` interface lines from pods starting and stopping, and 298 talos `controller failed`. Substantially all of it is routine pod-network churn plus one recurring clock fault.

The deleted finding `log/kernel-log-collector-gap-not-loss.md` recorded the one use of it on record. During RCA on merge-queue wedge #16189 it reported four of six nodes carrying no kernel record before 04:14Z, and the conclusion drawn was that the window was permanently undecidable. That was wrong, and was corrected only when the raw artifact was read directly: every node's `/var/log/kernel.log` had retained the whole window throughout. Loki's shipped capture and the node's on-disk kernel log are different objects.

What remains reachable is `ops loki logs`, which requires `--pod` and reads pod streams only. A direct query to `loki-gateway.loki.svc.cluster.local` for a non-pod stream returned nothing when that earlier finding was taken. Node-level evidence is now reachable only by going to a node.

Not established: whether node-level RCA is wanted often enough to pay for a way in. The removal was made on the ground that the command misreported, not on the ground that the question never arises.
