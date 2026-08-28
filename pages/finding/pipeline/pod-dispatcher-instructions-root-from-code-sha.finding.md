---
id: 3f8c21a4-6d5b-4e97-b0c2-8a1e5d7f9c40
slug: pod-dispatcher-instructions-root-from-code-sha
page-type-slug: finding
title: "The pod dispatcher builds INSTRUCTIONS_ROOT from the code sha"
domain-slug: page-type/pipeline
---

# Claim

`tools/lib/ci-pod-dispatcher/pod-spec-env.ts` sets `INSTRUCTIONS_ROOT` to `instructionsTreePath(context.sha)`, and `context.sha` is the code commit, not the instructions commit. The instructions tree step writes its tree at `instructionsTreePath(instructionsCommit)`. The two paths agree only if the two commits are the same string, so a pod started this way points `INSTRUCTIONS_ROOT` at a directory nothing created.

# Evidence

Read on 2026-08-26 at instructions commit `eab0f15`.

`RunToCompletionContext` in `tools/lib/ci-pod-dispatcher/pod-spec-step-config.ts:28-35` carries `sha` and no instructions commit. In the same file's consumers `context.sha` is the code sha: `pod-spec-env.ts:33` uses it for `checkoutPath(context.sha)`, which is the code checkout, and `pod-spec-env.ts:54` sets `CI_COMMIT_SHA` from it.

The container dispatcher does this correctly and differently: `tools/lib/ci-container-dispatcher/container-manifest.ts:96` uses `instructionsTreePath(candidate.pipelineInstructionsCommit)`. So the two dispatchers disagree about which commit names the instructions tree.

Not affected: `AKASHA_ROOT`, set in both dispatchers alongside it. `akashaTreePath` returns the parent of the instructions tree path with `akasha` appended, and the parent is `/ci-storage/instructions` whatever commit is handed in, so both dispatchers compute the same correct path from different arguments.

Not measured: whether any pod has ever run through this path with the two commits differing. CI was not running when this was read, so the fault has had no chance to show.

Fixing it means carrying the instructions commit on `RunToCompletionContext` and threading it to `buildPodEnv`; the field does not exist today.
