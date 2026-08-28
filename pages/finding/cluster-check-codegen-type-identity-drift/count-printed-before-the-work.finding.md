---
page-type-slug: finding
title: "Count printed before the work"
domain-slug: cluster-check/cluster-check-codegen-type-identity-drift
---

# Claim

The check announces how many pairs it checked before it has resolved a root, opened a file or compared anything. `reportBlindSpots` at `infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts:115-117` writes the pair count off the length of the registry, and `main` calls it at `:140`, seven lines before the roots are built at `:147-150`. The number printed is the size of the population, standing where a reader takes a result.

# Evidence

Verified and reproduced on 2026-08-28. Running `bun infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts --instructions-root /nonexistent-root-xyz` with `WORKSPACE` unset prints `[codegen-type-identity-drift] 29 pair(s) checked.` and the two declared blind spots, then fails in `getRepoRoot` saying no code checkout was named, and exits 2. No root was resolved and no pair was read.

Fail Closed holds. The exit is 2, so nothing downstream reads the run as a pass. What the line costs is the reader, who has a count in front of them with nothing to tell it from a count that was earned.

The line is written only when `--json` is absent, so a JSON consumer never sees it.

The reference handed to me named `:117` for the write; it still resolves, and the call that makes it premature is at `:140`. Line numbers are as of 2026-08-28.

`pages/finding/code-check/success-line-printed-above-a-refusal.finding.md` is the nearest neighbour and is a different defect: there two messages composed after a run disagree on one line. Here a number is emitted before the run.

Not measured: I did not look for other checks printing a population count ahead of their work, and I did not check what the line reads when the run completes normally.
