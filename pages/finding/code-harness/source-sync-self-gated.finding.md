---
id: 24c018a1-b8e7-5491-a216-fc2e6ea024d5
slug: source-sync-self-gated
page-type-slug: finding
title: "Source sync self gated"
domain-slug: domain/global
---

# Claim

The mechanism that advances the orchestrator's on-pod checkout runs only inside a main pipeline, so a change that stops the stale checkout from building a main pipeline blocks its own repair. `supervisor-source-sync` is a workflow in that pipeline, and that pipeline is built by loading workflow definitions through the stale checkout's `node_modules`. The block is not scoped to the tree that caused it: any tree landing behind it is held by the same staleness.

# Evidence

Observed on 2026-08-11 landing project #18484's tree (246 commits) at `c196d33649`.

The tranche added `BUNDLE_REUSE_DIST_ENV` to `packages/temper/shared/build-deploy/addons-resolve/src/distributable.ts` and an import of it in `packages/infra/checks/src/checks.workflow.ts`. `git show c196d33649:...distributable.ts` confirms the export at line 40 of the landed tree.

The orchestrator logged:

```
[discovery] Failed to import packages/infra/checks/src/checks.workflow.ts, skipping:
Export named 'BUNDLE_REUSE_DIST_ENV' not found in module
'/app/repo/packages/temper/shared/build-deploy/addons-resolve/src/distributable.ts'
```

The `/app/repo` path is the on-pod checkout, which was 6 days 18 hours old with zero restarts. Branch CI and the merge queue's staging CI both passed 180/180 over the same commits, because both build from the tree under test rather than through `/app/repo`.

Project #18718 landed behind #18484 and was blocked identically, with no relationship to its own change.

Recovered by `kubectl rollout restart deploy/worker-supervisor -n workers`. The `init-code` initContainer fetches and hard-resets `/app/repo` to `origin/main` and reinstalls, and `/app` is an `emptyDir`, so the restart produced a clean checkout at current main. The import failure stopped, and the main pipeline over `c196d33649` then passed 52 of 52 workflows as pipeline 27828.

NOT MEASURED — whether any path other than `supervisor-source-sync` advances `/app/repo` on a healthy fleet was not established; the claim that the sync runs only inside a main pipeline comes from the workflow's presence in main pipeline 27825 and from no sync being observed during the blocked period, not from reading its dispatch. Whether the same deadlock reaches through a change confined to one side of the `node_modules` boundary was not tested. How the fleet has recovered from this before, if it has, was not looked for.
