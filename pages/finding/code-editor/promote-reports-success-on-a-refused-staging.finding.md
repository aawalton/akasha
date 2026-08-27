---
id: a09527e0-bee3-5c91-904e-bd6dd6247688
slug: promote-reports-success-on-a-refused-staging
page-type-slug: finding
title: "The promote script exits 0 when staging refuses, so a promote that landed nothing reads as one that worked"
domain-slug: domain/code-editor
---

# Claim

`tools/promote.sh` exits 0 when staging refuses, so a promote that landed nothing reports as one that worked.

# Evidence

On 2026-08-19 a run printed `== staging 53c74679 ==` and then git's `error: Your local changes to the following files would be overwritten by checkout: tools/browser-gate.mjs` followed by `Aborting`. It stopped there: no build, no gate, no landing. Its exit code was 0.

The editor Alan runs stayed at `d431b2c` while the run said nothing was wrong. What surfaced it was reading the log rather than the status, and a caller that trusted the status would have taken the promote as done.

The script sets `set -euo pipefail`, so the failing `git checkout` is reached somewhere that swallows its status.
