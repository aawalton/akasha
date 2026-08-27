---
id: f72fa8b2-6733-50d5-99de-8952ebc13d51
page-type-slug: finding
title: "Wall clock is contention"
domain-slug: domain/global
---

# Claim

Most of a branch crossing has several steps in flight, so cutting any one check buys only
the part of its run where it was alone — measured at 14 to 32 percent of wall clock.

# Evidence

Measured 2026-08-04 after row #17814 landed, using the `soloMs` / `totalSoloMs` arm row
#17815 added to `ops pipeline perf`.

The last five green branch crossings: 27054 at 153.5s (good), 27041 at 246.4s, 27039 at
262.4s (both acceptable), and 27042 at 464.2s and 27043 at 630.5s — both past the 300s
floor. Neither of the two over-band crossings ran `check-addon-build` at all.

That falsifies the model #17814 was written against, which held that the whole
gap over the floor was one step. It was true of the ten crossings measured then, all with an
addon-build step and all on node-06; it is not true generally.

What the solo arm says about those runs:

  27043  wall 630.5s   totalSolo  86.1s  (13.6%)
  27042  wall 464.2s   totalSolo  79.0s  (17.0%)
  26994  wall 352.3s   totalSolo 112.9s  (32.0%)

So between two thirds and seven eighths of a crossing has more than one step in flight. On
27043 the two longest steps were `preparation-build-graph` at 180.2s with 4.5s solo and
`preparation-write-configs-cache` at 175.6s with 0s solo — 356s of step time buying 4.5s of
wall clock between them. On 27042 `check-syntax-bundle` ran 99.2s with 29.2s solo.

Total step time on 27043 was 1201.3s against 630.5s wall, and on 27042 1059.5s against
464.2s. The pipeline is saturated rather than serialized: wall clock is set by how much work
is in flight against the capacity of the node it drew, and only sometimes by one long step.

NOT MEASURED. The concurrency limit each node applies, or whether one is applied. Whether
either over-band crossing drew a 12-core node. What totalSolo reads on a crossing inside the
90s band. Whether raising concurrency or adding capacity moves wall clock more than any
per-check cut available.
