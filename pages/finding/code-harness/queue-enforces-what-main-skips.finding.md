---
id: 7684dd6e-7212-5d09-ae6e-fda104fa47f6
page-type-slug: finding
title: "Queue enforces what main skips"
domain-slug: domain/global
---

# Claim

A check the merge queue runs but a main pipeline does not lets main land in a state that reads green on its own pipeline and ejects every entry queued behind it.

# Evidence

On 2026-08-10, `ops project deploy --seq 18497` was ejected from the merge queue: `deploy_queue_ejected: merge queue ejected entry 11492: staging CI failed (pipeline #27754)`. The failing step was `check-ast-unused`, reporting four violations, all four in `packages/infra/seaweedfs/k8s/synth-longtail-assets.ts` — `ASSET_LONGTAIL_ROOT`, `ASSET_BUDGET_BYTES`, `ASSET_REVIEW_THRESHOLD` and `ASSET_REVIEW_BYTES`, each `not reached from any entry`. Project 18497 touched none of that tree; its one queued commit changed `packages/infra/k8s/electric/shape-storage-exporter.ts` alone, and its branch CI over that commit had passed 122 of 122 steps.

The violations were already on main. `~/code` stood at `78530f8b1d`, equal to `origin/main`, with a clean working tree and nothing of project 18497 present. Running `bun packages/infra/checks/src/checks/check-ast-unused.ts` there reported the same four violations and exited 1.

Main's own pipeline over that commit did not run the check. Pipeline 27748, branch main, commit `78530f8b1d`, finished with six workflows of six completed and no failed steps, and `ops pipeline steps 27748` lists no `check-ast-unused` step at all. The merge queue's staging pipeline 27754, over merge SHA `ba731c4887`, did run it and failed on it.

The commit that produced the condition is `78530f8b1d`, `fix(@infra/seaweedfs): compile the k8s synth tree and drop four dead tsconfig include entries`. Bringing that tree into compilation is what made the four exports visible to a check that walks compiled modules, so the violation was created by a commit whose own pipeline had no step that could observe it.

Between the two facts, main reported green while carrying a condition the queue treats as blocking. Every deploy queued afterwards meets it, and the ejection message names the queue entry and the staging pipeline rather than the commit or the file responsible, so each seat that hits it re-derives the cause from scratch.
