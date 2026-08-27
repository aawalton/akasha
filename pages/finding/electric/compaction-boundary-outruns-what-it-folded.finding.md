---
id: b1dec5d0-817f-52bf-93ff-fb58e8d3ce12
page-type-slug: finding
title: "Compaction boundary outruns what it folded"
domain-slug: domain/global
---

# Claim

Electric 1.7.5's shape compaction records a compaction boundary past the last entry it actually folded into the compacted file. Every log entry in the gap is orphaned: reads below the boundary route to the compacted file and find nothing, reads at or above it begin after the window, and the shape advertises a cursor below its own boundary, so a client lands in the dead zone, is told it is up to date, and jumps to the tip.

The writes are physically intact on disk and unreachable through the API.

# Evidence

Measured 2026-08-14 against the live freeze, read-only, before anything was cleared. This is the cause the 2026-08-11 occurrence could not establish, that store having been cleared to recover. Artefacts under `/var/tmp/electric-forensics/`, including a byte-exact copy of the live log.

The shape is the project board's, `66136664-1786551313583796`, created 2026-08-12 16:15:13 with compaction riding it from birth. Its `compaction_boundary.bin` decodes to tx offset 3,056,903,332,336, mapping to 2026-08-14 05:45:51. The last entry in its compacted file is 2026-08-13 21:34:19.98. Eight hours and eleven minutes of log is declared compacted and was never written there.

The behaviour flips bit-for-bit at that number: `offset=3056903332335_0` returns 77 bytes and `up-to-date`; `offset=3056903332336_0` returns 980,384 bytes. The shape then advertises `electric-offset: 3056824221560_0`, 79,110,776 units below its own boundary.

Of 14,679 project rows the shape serves 20 with a wrong status and omits 19, and 38 of the 40 rows the database changed after 2026-08-13 21:34:19 are frozen. A fresh shape over the same rows carried every current value.

The shape's chunk index last moved thirteen seconds after the fourth compaction run while its live log kept growing for hours. Across all twelve compacted shapes it is the only one in that state. Every health reading was green throughout.

Not established: why compaction wrote a boundary past what it had folded in — nothing in the pod logs describes compaction at all. Separately, 95 `unexpected end of file` errors from `PureFileStorage.stream_from_disk` carry no shape handle, so they may be a second fault.
