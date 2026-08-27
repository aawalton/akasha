---
id: 1cfa3d48-27ed-54f3-af15-1bff99a6c49b
slug: redeploy-synthesizes-a-wider-cohort
page-type-slug: finding
title: "Redeploy synthesizes a wider cohort"
domain-slug: domain/global
---

# Claim

`ops pipeline redeploy` synthesizes changed files from the named workflow's seed closure,
so asking it to verify one workflow dispatches a cohort over files the real diff never
touched.

# Evidence

Measured 2026-08-04.

Main's tip 6ac796d1 needed a verification pipeline and `main-pipeline-creator` had been
cleared past its request, so I minted one with
`bun ops pipeline redeploy --workflow agents-supervisor`.

The verb's own help states it "synthesizes the `changedFiles` set from the workflow's
seed-closure file set (resolved against origin/main's tree)" — deliberate, so a workflow whose
source is unchanged but whose image is stale can be forced through the gate.

It produced pipeline 26995 with 29 workflows, not the one asked for.

That cohort included `git-transport`, the cluster's git server. Its workflow
(`packages/infra/git/transport/foundation.workflow.ts:17`) declares
`watchNodes: ["package:@infra/git-transport"]`, and the real range 539feba9..6ac796d1
changes 0 files under `packages/infra/git/` (258 changed files total). No organic
pipeline for that SHA would have redeployed it.

Redeploying it took the pipeline's own siblings down. `git-transport` was unreachable
18:21:37 -> 18:22:18 (~41s), and six app workflows that clone from it failed inside that
window: alanwalton-daily-tracking ("protocol error: bad pack header"), alanwalton-web,
alanwalton-atlas, temper-web, audhdalan-web, archive-of-worlds-web ("Could not connect
to server"). Five logged "pod remains at HEAD b532e90e... and keeps SERVING THAT STALE
CODE". `ops pipeline retry` converged all six; 26995 finished 29/29.

The same outage reached the deploy verb: `ops project deploy`'s
`the-branch-content-on-main` verdict returned UNKNOWN solely because it could not fetch
origin/main. The content had landed; only the observation failed.

A second condition compounded this and is not this verb's: app workflows clone from
`git-transport` and declare no `dependsOn` edge to it. That half was routed to the infra
lead rather than filed.

NOT MEASURED. How many workflows an organic cohort for this range carries; whether any
other seed closure reaches a foundation workflow its caller would not expect.
