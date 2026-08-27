---
id: 736aaa80-8a27-5b0c-9e25-30ed52cf362a
slug: cluster-clocks-are-not-syncing
page-type-slug: finding
title: "Every cluster node has failed to reach its NTP server for at least 24 hours"
domain-slug: domain/global
---

# Claim

Every node in the cluster is failing to reach its NTP server, and has been for at least the 24 hours that were observable.

# Evidence

Measured 2026-08-19 at about 15:50Z, read-only, through `ops loki kernel` over a 24h window shortly before that command was removed.

1182 of the 5000 kernel records returned were talos time-query failures, the single largest category in the stream. Every one names the same server and the same failure: `time query error with server "142.248.192.33"`, from `controller-runtime`, controller `time.SyncController`, error `read udp <node>:<port>->142.248.192.33:123: i/o timeout`. Samples appear from more than one node and the records span the whole window, at roughly one per minute per node.

Alongside them, 298 talos `controller failed` records were returned in the same window. Whether those are the same controller is not established.

Not established: how long this has stood beyond the 24h window read, whether the clocks have actually drifted or NTP is merely failing to confirm them, and whether 142.248.192.33 is reachable at all from that network. Nothing alerts on it, and it surfaced only because the kernel stream was being classified for an unrelated reason.
