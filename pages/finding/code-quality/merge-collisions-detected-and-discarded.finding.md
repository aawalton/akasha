---
id: c8bd2edc-6652-5180-aa28-95270c996e30
page-type-slug: finding
title: "Merge collisions detected and discarded"
domain-slug: domain/code-quality
---

# Claim

The estate detects the merge collisions its 400-line alert line exists to forecast, and discards every one. `packages/alanwalton/projects/cli/src/project/integrate.ts` parses the conflicting file list out of a failed merge, names the branch and the files, and exits — writing nothing durable. So the evidence that would say whether the alert line is set right is produced at every integration and thrown away, rather than being unobtainable.

# Evidence

Read live in `~/code` on `main`, while ingesting `dirty/skills/code-quality/rulings.md` in the instructions repo.

`packages/alanwalton/projects/cli/src/project/integrate.ts:59` declares `async function parseMergeConflicts(tmpDir: string): Promise<string[]>`. Line 94 calls it when a merge stops early, line 96 stores `conflict = { branch, files }`, and lines 104-111 emit it: JSON as `{ ok: false, merged, conflict }`, or plain text as `CONFLICT\t<branch>` plus a block listing the conflicting files. Its help at line 46 states that a merge conflict is one of the ways the run exits 1.

Every one of those is a write to stdout for that run. Nothing appends to a log, a table or a counter, so the branch, the file set and the fact a collision happened are gone when the process exits.

Searched for a counter with `rg -uuu -il "merge conflict|merge failure|conflict rate|mergeConflict"` across `~/code`, excluding `node_modules`, lockfiles and `.git`. Every hit outside `integrate.ts` is a build artifact under `build/` or `dist/`, a vendored Python package, or the `git-merge-conflict` icon name in the generated icon search index. No instrument accumulates collisions.

The line the evidence would bear on is real and separate from the cap. `packages/infra/workspace/cli/src/code/oversized.ts:17` sets `DEFAULT_THRESHOLD = 400` and publishes it as the ALERT line; `packages/infra/checks/src/lib/file-length-core.ts` caps `.ts`, `.tsx` and `.lua` at 500, and `check-file-length` enforces that.

This adds to the standing `pages/finding/code-check/oversized-alert-line-reason-unrecorded.finding.md`, whose closing line reads "nothing counts the merge collisions it was set against, so no artifact says whether 400 is still the right number." That is true of counting. What it does not say is that the collisions are already detected and parsed at integration time, which is what makes the gap a discarded observation rather than an unmeasurable one.
