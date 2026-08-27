---
id: 512c7fd8-03eb-528e-a1ea-7ba09b123160
slug: a-pod-resets-to-origin-main-not-the-working-tree
page-type-slug: finding
title: "A pod resets to origin main rather than the working tree, so repointing a writer never reaches it"
domain-slug: domain/global
---

# Claim

Repointing a writer in the code repository does not reach a deployed pod even across a
restart, because the pod's init container resets to `origin/main` rather than to the working
tree. The code repo is deliberately never pushed, so a pod that returns runs the pre-migration
bundle and writes rows for a page type whose pages are now files.

# Evidence

The `worker-supervisor` deployment's `init-code` container fetches origin and then does a hard
reset --hard onto `origin/main` in `/app/repo`, against
`git-transport.git.svc.cluster.local:3000/alan/code.git`, falling back to a clone of branch
`main` where there is no checkout. So the source a pod runs is `origin/main`, never local
`main`, which stands 385 commits ahead of it.

Two consequences, measured rather than inferred.

`git show origin/main:packages/alanwalton/fun-points/src/pure/compute-fun-delta.ts` still reads
`priorSnapshot === undefined ? Math.max(0, s) : Math.max(0, s - priorSnapshot)`. The commit
that made an absent prior raise is on no remote branch.

`origin/main`'s `reconcile-fun-points.ts` calls `createPagePg` straight at the `page_create`
RPC. `createPage` in `packages/shared/pages/access/src/create.ts` branches on `isFileBacked`
first and so writes a file; the pg helper does not branch at all. That is how `daily-tracking`
came to hold two pages for 2026-08-20: the row was created at 04:00:51 MDT by the
pre-migration reconcile, and the file at 05:24:22 MDT by `ops tracking`, whose
`resolveOrCreateDaily` reads files only and so could not see the row. Neither writer could see
the other's store, and which ran first never mattered.

The exposure is bounded by the deployment standing at 0 replicas. Nothing on the workstation
creates a `daily-tracking` row any more: the timer, the pod worker as it stands in local `main`,
and `ops tracking` all write files, and `ensureDailyRowId` reaches `createPage`, which
branches.
