---
id: 8d627018-18b8-531e-b6db-8704232eb8be
slug: supersession-rests-on-a-suite-that-narrows
page-type-slug: finding
title: "Supersession rests on a suite that narrows"
domain-slug: domain/global
---

# Claim

Supersession is justified on a fixed staging suite, and the staging lane is diff-narrowed like any other.

# Evidence

`packages/infra/ci/merge-queue/coordinator/src/coordinator/batch-terminal-route.ts` justifies routing a superseded batch away from the red-to-bisection path this way: "Staging rotates through a fixed check suite, so a later batch supplies those witnesses by construction." The safety of marking a batch `superseded` rather than failed rests on that sentence.

`packages/infra/ci/merge-queue/coordinator/src/coordinator/dispatch-ci.ts` says the opposite in its own header: "`changedFiles` is the real `parentMainSha..stagingTipSha` git-diff against the staging worktree, so the orchestrator's resolved-watch-path matcher narrows speculative staging runs the same way it narrows normal pushes — only workflows whose paths actually changed are fanned out."

If the second holds, a later batch supplies a predecessor's witnesses only where its own diff reaches the same watch paths, which is a property of what that batch happens to contain rather than one holding by construction. There may be a separate reason it holds anyway — a superseded batch returns its still-owned entries to `queued`, so a later batch tends to carry them — but that is a different argument, it is written nowhere, and it does not cover an entry the supersession did not resurrect.

Not measured: which of the two comments is stale, whether an always-run `check` workflow is what "fixed check suite" was reaching for, and whether any real batch has lost a failing workflow this way.
