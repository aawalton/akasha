---
id: a955145d-bafe-57a7-b043-31839a4c8d63
page-type-slug: finding
title: "Bands name no hardware"
domain-slug: domain/global
---

# Claim

A published duration band that names no hardware scores a crossing partly on which node it
drew, so the same pipeline is inside the band on one node and outside it on another.

# Evidence

Measured 2026-08-04 by the seat delivering row #17814, re-read here off `ops pipeline perf`.

`domains/code-harness.md` publishes the bands unqualified: a branch pipeline great under
90s, good under 180, acceptable under 300; a main pipeline great under 5 minutes, good
under 10, acceptable under 15. At the far edge the line stops.

The estate's CI nodes are not alike. node-06 carries 32 cores; node-05 carries 12. Branch
pipeline 27035 bound to node-05 while the whole baseline band #17814 was cut against was
measured on node-06. Steps that row's change never touches roughly doubled:
`preparation-build-graph` measured 115.4s on node-05 against 51.6s on node-06.

So a crossing at 277s on node-05 and a crossing at 277s on node-06 are not the same
reading, and neither is a breach at 344s. Four of the last green branch crossings read
270s, 351s, 664s and 904s; nothing in those numbers says which node each drew, and the
bands offer no way to ask.

The same node-locality reaches the cache. `/ci-storage` is a node-local hostPath. When
measured, only node-06 held any addon-build tarballs at all — node-01, node-04 and node-05
held zero — and a branch pipeline sticks to its node. So a branch bound to an empty node
misses every cache entry for a reason no cache key can reach, and pays the miss cost as a
function of where it landed rather than of what it changed.

NOT MEASURED. The core count of every CI node, or how work is distributed across them.
Whether any recorded band figure carries the node it was taken on. Whether the merge
queue's staging crossings bind to one node or vary. What a band qualified per node, or
normalised, would have to say to stay usable.
