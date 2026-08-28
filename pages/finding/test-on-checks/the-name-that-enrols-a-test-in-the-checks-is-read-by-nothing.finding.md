---
id: 53ddedc9-3167-585d-ac4c-bb476aadf01c
page-type-slug: finding
slug: the-name-that-enrols-a-test-in-the-checks-is-read-by-nothing
title: "The name that enrols a test in the checks is read by nothing"
domain-slug: domain/test-on-checks
---

# Claim

`pages/domain/test-on-checks.domain.md:11` defines an on-checks test as "a test the checks run on every change", and `:15` makes the file's name the whole of the enrolment. Nothing in the repository reads that name. The only selector is `SUITE_GLOB = "tools/**/*.test.ts"` at `tools/audits/suite-runs.ts:17`, so 5 of the 22 such files run because of where they sit and the other 17 run under nothing. The sibling `.on-demand` suffix, declared the same way, is read at `:19`.

# Evidence

Measured 2026-08-28 at `e77855a242`. 22 tracked files match `*.on-checks.test.ts`:

    checks-system     9      graph              1
    tools             5      file-structure     1
    page              3      deploy-system      1
    workspace-package 1      agent              1

THE ONLY SELECTOR. `tools/audits/suite-runs.ts:17`, `:19`, `:27-28`:

    const SUITE_GLOB = "tools/**/*.test.ts"

    export const ON_DEMAND_SUFFIX = ".on-demand.test.ts"

    for (const relPath of new Bun.Glob(SUITE_GLOB).scanSync({ cwd: root })) {
      if (relPath.endsWith(ON_DEMAND_SUFFIX)) continue

`onDemandFiles` at `:36-37` branches on it. The 5 under `tools/` are taken by where they sit, not their suffix; the other 17 are taken by nothing. `test-on-demand.domain.md:17` declares `.on-demand` exactly as `test-on-checks.domain.md:15` declares `.on-checks`; only the first is in code.

NO READER, EVER. `git log -S 'on-checks.test' -- '*.ts' ':(exclude)*.on-checks.test.ts'` returns nothing across 10,435 commits. Searching the tree gives one code hit, `tools/lib/test-selection.ts:4`, a coincidental substring: `${homedir()}/.instruction-checks`.

WHY IT IS A FAULT. An author naming a file this way has done all the domain asks and gets nothing. Against Answer Or Refuse in `pages/domain/pages-system.domain.md` — "Never read a missing source as an empty one" — a suite never selected reports nothing, reading like a clean run.

ONE INSTANCE STANDS. `pages/finding/test-file/relation-resolves-test-reads-and-writes-the-live-page-index.finding.md`, filed at `62efdd11b9`: it writes into the live page index on every run, unnoticed partly because it is never selected.

NOT MEASURED. Whether `tools/**` was deliberate. `SUITE_GLOB` was written once at `5e523b13cd` inside a 2,969-file move commit and unedited since; earlier history is in another repository.

ADJACENT, and neither records that the name has no reader: `pages/finding/checks-system/the-gating-suite-weighs-one-directory-of-the-tree.finding.md` and `pages/finding/test-file/enrolled-by-name-and-unreportable.finding.md`.
