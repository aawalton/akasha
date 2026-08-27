---
id: 447f688a-dea0-5e45-8ea3-1d5093deec38
page-type-slug: finding
title: "Contract migration invisible on child row"
domain-slug: domain/global
---

# Claim

A contract migration homed on a child project row never runs, and nothing reports it: `loadPendingMigrationsForProject` finds migration pages by one `projectId` equality against the deploying row, with no walk to descendants, so the expand half of a two-phase schema change stands applied and the contract half stays `pending` forever.

# Evidence

Measured 2026-08-07 while ingesting `dirty/questions/merge-queue-doctrine.md`, whose last entry states the claim and names as its only carrier a head document now quarantined under `dirty/code/`, so it would have gone with the sweep.

`packages/shared/supabase/migrations/cli/src/lib/apply-migration.ts:289` — `loadPendingMigrationsForProject` takes `{ projectSeq, phase }`, resolves the project with one `getPage` on `[{ key: "seq", eq: projectSeq }]`, then selects migration pages with `getPages` on exactly three equalities: `projectId eq project.id`, `status eq pending`, `phase eq options.phase`. No descendant traversal, no second query. A page whose `projectId` names any row but the deploying one is outside the result set.

Both callers sit in `packages/alanwalton/projects/cli/src/lib/move-to-deploy-migrations.ts` — `:56` for `expand`, `:144` inside `runContractMigrationsPhase` for `contract` — so both halves are found the same way.

Reachable rather than hypothetical: `project-pages.ts:216` declares `parentId: string | null`, `:104` sets it at creation from `args.parentPageId`, and `resolve-child-statuses.ts:7` queries "the `parentId` relation column".

Silent: the loader throws only when the project row itself is missing, and returns an empty array otherwise. Nothing compares what was filed against what was found, so a project with a stranded contract page reads like one with no contract work.

Nothing else carries it. No live domain under `domains/` mentions migrations or expand/contract. No check in `packages/infra/checks/src/checks/` guards migration page homing — the six matching `contract` are all `*-json-contract.ts` CLI-output checks. `~/memory/findings/` held nothing on `loadPendingMigrationsForProject` or the contract phase.

Not measured: whether any migration page is currently homed on a child row, whether a two-phase change has actually stranded its contract half, and whether the parent-only lookup is deliberate. I read the code and its callers; I ran no query against the pages store and traced no past deploy.
