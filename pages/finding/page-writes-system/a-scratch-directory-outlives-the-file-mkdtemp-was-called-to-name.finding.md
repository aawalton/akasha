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

The test scratch this page first recorded as unexamined has since been examined, so that sentence is no longer true. Twenty-four files made scratch directories and removed none; sixteen were repaired at commits f0895370, c7c91c07, 07f4df14, 1d5bdf2e, b8ba99c9, 0faa4956, c19a5325, deadd524, 1ee78a3c, 8eb61929, 536cc5b7, 3d322f53 and c37847ee, and five stand unrepairable behind a typecheck refusing every edit to them, filed against `domain/model-gateway`. The figure of about 70,000 was itself taken against one root only, for the reason the next paragraph gives.

The root is not `/var/tmp` alone. `tmpdir()` answers `/tmp` wherever `TMPDIR` is unset, which it is on this workstation, so every `mkdtempSync(join(tmpdir(), ...))` site writes where a search of `/var/tmp` cannot reach. Fourteen of one set's twenty-one leaks stood in `/tmp`, and were found only once both roots were counted.

A criterion reading whole files cannot see this defect. `grep -L rmSync` clears a file at its first removal and is then blind to a second `mkdtempSync` in it that nothing removes: `tools/lib/check-workflow/curation-dispatch.unit.test.ts` held three sites, two registered against the `afterAll` at line 51 and the one at line 90 not. Reading instead for a call whose directory is never bound to a name finds that site, and finds only that kind — a site that binds its directory and still never removes it is invisible to both readings.

Not measured: whether any site binds its directory and never removes it, and whether the shape stands outside the write path and these suites. Eleven suites re-run across both roots left nothing standing, and no family in either root is now unexplained, which bounds that unknown rather than closing it.

# Bearing

`checks-system/run/gate.ts` belongs to the checks system rather than to this domain. It is named here because the mechanism is one and splitting it across two pages would leave each holding half of it, without the counterexample that makes the claim legible. A reader of the checks system reaching this page from that file is in the right place.

Whether a check should refuse the shape is not decided here. Observed 2026-08-28 by seat astra.
