---
id: 124e44f3-68a9-548b-93d4-a923f7a6f56c
page-type-slug: finding
title: "Main pipeline contiguity is unwatched until a file-backed monitor is built"
domain-slug: domain/main-pipeline
---

# Claim

Nothing watches main-pipeline contiguity — whether a merge-queue batch that reached `landed` is covered by a main pipeline. The Prometheus exporter and its `MainPipelineContiguityGap` alert are gone, because both read `public.pages` over SQL while `merge-queue-batch` and `pipeline` are now file-backed, which a postgres_exporter cannot read. When CI comes back up, a landed batch with no covering main pipeline will go unreported until someone builds a watch that reads files.

# Evidence

Measured 2026-08-20 read-only against live, host 10.244.0.27:5432, db postgres, user agent_adhoc.

The exporter's own SQL, run verbatim, returned 0 rows. `merge-queue-batch`, `pipeline`, `step`, `workflow` and `merge-queue-entry` hold 0 rows in any state, and no page-type row exists for any of them. Controls fired both ways over a population of 9,117 rows: `agent` 2497, `relationship-progress` 1938, `error` 751; an impossible slug returned 0.

That emptiness is the maintenance downtime — old pipelines torn down, new ones not yet up — and is not evidence the concept is dead. The warrant for retiring the instrument is structural instead: all five page types declare a `files:` glob, `pipeline` being `memory:pipelines/*.md`, and the exporter ran under postgres_exporter against `DATABASE_URL`, so it cannot follow its subject into files.

Two pieces survive and a rebuild should reuse them. The alert document `instructions:domains/alerts/main-pipeline-contiguity-gap.md` still carries the condition's summary and description, and its slug is what any new rule would annotate. Separately, `decideContiguity` in `packages/infra/ci/merge-queue/coordinator/src/coordinator/main-pipeline-emit.ts` is an in-process check on the same condition; it writes `MAIN_PIPELINE_CONTIGUITY_GAP` to stderr and nothing alerts on that output.

A file-backed rebuild must not age or order by `created-at` or `updated-at`. Both read back as the constant 1970 instant on every file page, so a grace window computed from them is meaningless and an ordering silently falls through to id. `seq` is stated and narrowable.
