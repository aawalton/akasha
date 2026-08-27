---
id: 09d51817-b7fd-5711-a74b-c20e28b19a25
slug: suites-leak-scratch-trees
page-type-slug: finding
title: "Suites leak scratch trees"
domain-slug: domain/global
---

# Claim

This repository's test suites leak their scratch trees into `/tmp`, and the one check over that ground cannot see it by design. 7,849 abandoned `mkdtemp` directories from nine of this repo's own suites stand in `/tmp` right now, `block-headless-halt-` alone holding 4,407. `/tmp` is tmpfs with a fixed 1,048,576-inode table, so the leak spends a bounded resource that byte-oriented instruments read as healthy.

# Evidence

Measured 2026-08-07 on the workstation.

`df -i /tmp` gives `1048576 659306 389270 63% /tmp`; `df -h /tmp` gives `32G 4.9G 27G 16%`. So the inode table is at 63% while bytes read 16% — the two axes are far apart, which is the shape that makes the failure mislead. `findmnt` reports `/tmp` as tmpfs with `nr_inodes=1048576`.

Counting `/tmp` entries by prefix: `instructions-cli-` 400, `finding-cli-` 344, `block-headless-halt-home-` 1291, `block-headless-halt-` 4407, `instructions-edit-` 591, `instructions-rm-` 260, `instructions-verify-` 212, `instructions-restore-` 200, `finding-code-` 144. Total 7,849. Every prefix names a suite under `tools/tests/`.

`packages/infra/checks/src/checks/check-tmpfs-scratch.ts` is the check over this ground, and its own docblock states the gap rather than hiding it: "LOCATION — where the tree is created — is lexical, so this sees it. REMOVAL — whether the tree is released on every exit path — is runtime, and no static scan can tell an `afterEach` that removes a tree from one that assigns a variable. The removal arm in `../lib/tmpfs-scratch-arms` therefore declares itself UNMEASURED rather than reporting a zero it did not earn."

That is the check behaving correctly under the Population rule on `domains/instrument.md`, and the consequence is that no instrument reports this population.

Production code here does pair its scratch with removal — `tools/read.ts:148` with `rmSync` in a `finally` at `:177`, and the same shape at `tools/gates/typecheck.ts:188` and `tools/gates/document-conforms.ts:79`. The leak is in the suites.

Not established: which suites leak on which exit path, and whether any of the 7,849 belongs to a run still in flight. I did not open a test file or attribute a single directory to a call site; the counts are of names in `/tmp`. The standing finding `code-repo/inode-reap-alert-removed.md` covers why nothing alerts on the gauge, and `infra/scratch-root-unwritable-under-hardening.md` covers the `/var/tmp` routing conflict. Neither counts this population.
