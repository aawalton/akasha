---
id: 77922853-8c3e-574a-baf9-2c91b4c15e88
page-type-slug: finding
title: "A scratch directory outlives the file mkdtemp was called to name"
domain-slug: domain/page-writes-system
---

# Claim

`mkdtempSync` creates a directory. Code that uses its return only to build a sibling path — `` `${mkdtempSync(`${SCRATCH}/gate-`)}.index` `` — and then removes that sibling leaves the directory standing forever. The four sites carrying this shape are fixed, and nothing refuses a fifth: no check reads for it, and the correct and incorrect forms sit side by side in the same files, so the next writer has an even chance of copying either.

# Evidence

Four sites carried it, all on the write path. `repo/land/land.ts:277` wrote a body into a fresh directory and never removed it. `patches/patch.ts:74` and `checks-system/run/gate.ts:58` each built a `.index` sibling and removed only the file. `ops-cli/global/write/write.command.code.attachment.ts:130` repeated the first of these under a second name. One defect, four names: `landing-body-`, `mp-write-`, `gate-`, `mp-body-`.

Measured in `/var/tmp` at commit 9be3a3a8 on 2026-08-28: 195,300 `landing-body-` directories holding 9,221,047,485 bytes, 10,899 `gate-`, 11,153 `mp-write-`, 3,166 `mp-body-`. `landing-body-` reached back only to 2026-08-26 14:51 because `git log -S` puts the prefix's first commit at 3e27f8b0, 2026-08-26 15:37 — the floor was the age of the code, not a sweep. `gate-` reached back 32 days in the same directory, which is what rules a sweep out: `/usr/lib/tmpfiles.d/tmp.conf:12` prunes `/var/tmp` at 30 days, and nothing prunes below that.

The counterexamples stand in the same two files. `patches/patch.ts:100` makes `mp-gate-` and removes it recursively at line 122; `checks-system/run/gate.ts:74` makes `patched-` and removes it at line 107. Both were measured at the same moment as the leaking families: 6 and 0 respectively.

A `finally` around the gate would not have sufficed at `land.ts`. `gateOrRefuse` ends a refusal with `process.exit(1)` at `patches/patch.ts:141`, and an exit runs no `finally`; a refused write is the common case. The scratch is instead taken away once `patchText` returns, which is where it stops being read.

Fixed at commits e38ab6d3, d42a3a52 and 39e892ab. Measured across identical 50-file runs: 50 directories left behind before, 0 after, and 0 across three further runs making 150 bodies. 220,233 directories and 8.60 GiB were then removed at a 60-minute cutoff.

Not measured: whether the shape stands anywhere outside the write path. Test suites leak scratch directories of their own under many prefixes — about 70,000 remained in `/var/tmp` after the sweep, from `*.unit.test.ts` and `*.on-demand.test.ts` files across several domains — and none of those were examined here.

# Bearing

`checks-system/run/gate.ts` belongs to the checks system rather than to this domain. It is named here because the mechanism is one and splitting it across two pages would leave each holding half of it, without the counterexample that makes the claim legible. A reader of the checks system reaching this page from that file is in the right place.

Whether a check should refuse the shape is not decided here. Observed 2026-08-28 by seat astra.
