---
id: b8cbfa4d-9251-5d18-ace3-8a61519d740d
page-type-slug: ops-command
title: "Ops pipeline step-cost"
slug: ops-pipeline-step-cost
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/pipeline/step-cost.ts
path: pipeline step-cost
---

# Definition

- **Ops pipeline step-cost** — one named step's duration over its recent runs, with the smallest, the middle and the largest.

# Help

What one named step costs across its recent runs, in one call. `ops pipeline perf` answers for a single pipeline, so every question spanning pipelines — which check is eating the budget, did this check get slower, what does this one cost per run — was a manual loop of one `perf` invocation per pipeline.

Runs are the step's own, newest first, across every branch: a check runs on branch pipelines and staging alike, and which branch a run came from rides as a column rather than as a filter. Duration is `completedAt - startedAt` and nothing else — `durationMs` is not stored on a step row, and `updatedAt` is a row-mutation stamp that overstates the span. A run still in flight is listed with an empty duration and excluded from the summary figures.

The summary reports min, median and max rather than a mean, because the population this command exists to read is often bimodal — a step with a build cache reads one figure on a hit and another on a miss, and a mean lands between two values it never takes. The median is the mean of the two middle values on an even count, so it does not snap to either mode.

Default stdout: a `<key>\t<value>` header block (step, runs, timedRuns, minMs, medianMs, maxMs), a blank line, then one `<pipelineSeq>\t<branch>\t<workflow>\t<status>\t<durationMs>\t<stepSeconds>\t<startedAt>` row per run.
--json stdout: compact single-line `{ summary, runs }` — stable shape.
