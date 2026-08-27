---
id: 9ae05f06-cbe4-5c82-be16-77cad094e971
slug: untracked-blocks-merge
page-type-slug: finding
title: "Untracked blocks merge"
domain-slug: domain/ios-install
---

# Claim

`sweep-window-guard.ts` drops untracked lines from its cleanliness probe on a stated reason that is false — an untracked file on a path the merge creates does abort `git merge --ff-only` — so the guard calls a mac checkout clean that a TestFlight cut from the same tree aborts on.

# Evidence

`packages/alanwalton/mobile-cli/src/mobile/sim/sweep-window-guard.ts:59-62` reads: "UNTRACKED lines (`??`) are dropped — they never block `git merge --ff-only` and are typically build detritus on a build host, not in-flight tracked work — and any remaining (tracked-modified/staged/renamed) path marks the tree dirty."

The first clause is false. Measured 2026-08-06 in a throwaway repository: a clone at an older commit, an untracked file at a path the upstream commit creates, then `git merge --ff-only origin/master` — `The following untracked working tree files would be overwritten by merge` / `Please move or remove them before you merge.` / `Aborting`, exit 1. Removing the untracked file and re-running the same merge exits 0.

The guard exists to decide whether the mac's tree is fit to build from, so dropping `??` lines makes it answer clean on exactly the state that stops a cut: the sweep proceeds and reports nothing while `ops mobile deploy-testflight` from the same checkout fails at its merge step.

The macbook is in that state now. `~/code` sits at `0910b2f3`, 297 commits behind main, carrying one modified tracked file and two untracked paths — `packages/alanwalton/native-shell/ios-widget/ClaudeUsagePayload.swift` and `packages/alanwalton/native-shell/scripts/decode-harness/`. Both untracked paths exist on `origin/main`, so the merge creates them and aborts on both. The guard sees only the tracked line.

The other half of the same wrong model, measured alongside: a tracked file whose working-tree content is byte-identical to the incoming version still aborts the merge, git comparing the index entry rather than the resulting content.

Filed under `ios-install` because that is where a mac checkout's fitness to build is judged, and this guard answers the same question in another voice. Filed rather than repaired: the skip path also feeds a nightly timer and a post-land deploy trigger, neither measured here.
