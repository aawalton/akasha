---
id: 040ea706-50c3-5252-8a01-a017cc110a68
slug: transport-credential-in-url-outside-checks
page-type-slug: finding
title: "Transport credential in URL outside checks"
domain-slug: domain/global
---

# Claim

Sixteen files outside `packages/infra/checks` build a git URL of the shape `http://x-access-token:<token>@…` and hand it to a child process, so any failure whose message echoes the command writes a live credential into whatever keeps that output. Project #18738 closed this shape inside the checks package and named six residual sites; measured, it is sixteen. Nothing gates the shape, so a new site can be added at any time and no check refuses it.

# Evidence

Measured by dalla on 2026-08-11 in the `project-18682` worktree while verifying #18738, which repaired the four sites inside `packages/infra/checks` and correctly declined the rest as outside its scope.

**The distinction that matters.** Counting `x-access-token` overcounts: the CORRECT idiom spells it too, in the credential-helper body `echo username=x-access-token`. The defect is the URL construction, `://x-access-token:`. Excluding the checks package and `node_modules`: **20 files match the token name, 16 match the URL shape.**

The sixteen: the merge-queue **coordinator, five files** (`build-staging-branch`, `check-feature-sha-freshness`, `force-push-staging-branch`, `staging-dir`, `dispatcher/reconcile-helpers`) — the path every change takes onto `main`; **five `k8s/synth.ts` sweeps** (`ci/orphaned-resources-sweep`, `ci/rule-population-sweep`, `ci/slow-suite-sweep` and its unit test, `domain-expiry`, `git/mirror-probe`); `ci/workflows/src/prep.workflow.ts`; `ci/benchmark/src/benchmark-job.ts`; `local-executor/src/executor.ts`; `k8s-types/src/orchestrator-cache-locations.ts`; and `alanwalton/daily-tracking/src/run-commit-points.ts`.

**The repaired idiom exists and is proven.** `checks/src/lib/git-transport-credential.ts` passes a `-c credential.helper=…` body that git's own child shell expands. Driven with a planted canary and the workstation's credential store made unreachable, the failure output carries `password=$GIT_ACCESS_TOKEN` LITERALLY and the canary appears zero times, where the pre-repair body prints the token verbatim. `git/mirror-probe/src/ls-remote.ts` already pushed this way.

**Ruled by Alan, 2026-08-11: not an incident.** Whether any of the sixteen has already written a token into a retained log stays unestablished BY DECISION — *"not a high-security system currently; a full credential rotation before any product launch."* No rotation now, no log search. The finding stands on the SHAPE, which that rotation does not fix. Also unestablished: whether all sixteen are reached at runtime.
