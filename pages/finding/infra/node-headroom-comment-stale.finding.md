---
id: 4f264964-b5dd-5667-ba21-3ce01e7e2405
page-type-slug: finding
title: "Node headroom comment stale"
domain-slug: domain/global
---

# Claim

The comment justifying the seaweedfs filer's 2Gi memory limit states that node-04, the sole `serve` node, "has ~10Gi unrequested". It now has about 4.4Gi unrequested. Anyone sizing another bump against the figure written beside the value they are changing would read more than twice the headroom that stands.

# Evidence

`packages/infra/seaweedfs/k8s/synth-deployments.ts:236-238` reads: "2Gi gives headroom for the buffered parts + leveldb2 metadata + chunk traversal; node-04 (the sole `serve` node) has ~10Gi unrequested."

On 2026-08-10 at 19:58Z, `kubectl describe node node-04` reported allocatable memory 15803872Ki (15433 MiB) and allocated memory requests of 10930Mi (70%), leaving 4503 MiB — about 4.4 GiB — unrequested. Memory limits across the node stood at 23040Mi (149% of allocatable), so the node is already overcommitted on limits while its requests are not.

NOT MEASURED. When the figure went stale, and which workloads took the difference, were not established. Whether other resource comments in the package carry node-capacity figures was not surveyed. Nothing here says 4.4Gi is insufficient for any particular change — only that the number a reader would size against is not the number that stands.
