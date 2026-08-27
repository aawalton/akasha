---
id: 5aeb3176-0009-58af-83a1-3d61f6ac1221
page-type-slug: finding
title: "On demand tests unstated"
domain-slug: domain/test-file
---

# Claim

231 of the 616 files `domains/file-kinds/test-file.md` governs in the instructions repository are held back from the standard suite, and the domain says nothing about them.

# Evidence

Reported by the review of `domains/file-kinds/test-file.md` on 2026-08-15: `tools/checks/suite-runs.ts` globs `tools/**/*.test.ts` and skips every path ending `.on-demand.test.ts`, and `ops instructions run-tests --help` describes those as files the standard suite holds back. A further 6 sit under `monarch/`, outside every suite glob. The reviewer repaired the definition, which had read "a file the suite runs, holding tests" and so denied the kind to 237 of the 616, and found no further invariant that `suite-runs.ts` does not already enforce — so it wrote no Design line and left whether one is owed unsettled. The counts were not re-measured here.
