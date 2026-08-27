---
id: 05cf8650-c8f6-5d18-9f4c-ec9e0ffab5e0
slug: staging-pipeline-workflowless
page-type-slug: finding
title: "Every staging pipeline starts with no workflows, so nothing can land through the merge queue"
domain-slug: domain/change-harness
---

# Claim

Every staging pipeline the merge queue creates is dead when it is written, so nothing can land on main through the queue at all. `requestStagingPipeline` writes the pipeline page and nothing else, the sweeper fails a pending pipeline carrying no workflows within seconds, and the coordinator reads that as staging CI failing, bisects, and ejects the entry. The workflow selection the staging path needs is absent from that file rather than broken in it.

# Evidence

`requestStagingPipeline` in `tools/lib/merge-queue-coordinator/dispatch.ts` calls `mintPipeline`, which writes the pipeline page and nothing else. Workflow and step pages are written in one place only — `createPipelineTree` in `tools/lib/main-pipeline-creator/create.ts` — and the coordinator does not reach it. `decidePipeline` in `tools/lib/sweep-pipeline-pages/decide-pipeline.ts` fails a `pending` pipeline carrying no workflows, under `pipeline.pending-to-failed.no-workflows-chosen`, and the sweeper runs every few seconds.

The four functions the main path uses are already parameterised by branch and none is main-only: `chooseWorkflows`, `planPipeline` and `createPipelineTree` all carry the branch through `PipelinePlan`. `dispatch.ts` carries exactly one commit, `0f6ce8462`, the migration that made the coordinator a service over file-backed pages.

No merge-queue entry has reached `landed` since the pages migration. The entry store was reset by that migration and its history begins on 2026-08-22, so this says nothing about the runs before it:

    git log -p --all -- pages/merge-queue-entry/ | grep -c "^+status: landed"
    0

Project 19440's second attempt on 2026-08-22:

    08:32:45  asked for pipeline 39 at merge-queue/staging@08118786 for batch 2
    08:32:46  batch 2 is testing on pipeline 39
    08:32:50  sweep-pipeline-pages: pipeline=39 pending->failed guard=pipeline.pending-to-failed.no-workflows-chosen
    08:33:47  removing staging dir 2 (the bisection ejected the only entry left)

Five seconds from written to failed. `pages/pipeline/39.md` stands at `status: failed` carrying 27 `changed-files` and no workflows, and no page under `pages/workflow/` names `pipeline-seq: 39`. The entry's recorded verdict, at memory commit `d1f8a3ce8`, reads `failure-kind: staging-ci-failed`. Staging CI did not fail. It never ran.

Main pipelines are unaffected: 37 and 38 both stand at `passed`, started by `main-pipeline-creator`, which calls `chooseWorkflows` and `createPipelineTree` where the coordinator calls neither.
