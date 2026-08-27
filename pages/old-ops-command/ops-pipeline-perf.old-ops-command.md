---
id: a9bab77e-e58f-5395-893b-1516bb14c8d8
page-type-slug: old-ops-command
title: "Ops pipeline perf"
slug: ops-pipeline-perf
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/pipeline/perf.ts
path: pipeline perf
---

# Definition

- **Ops pipeline perf** — one pipeline's wall clock, and each step's duration and its time as the only step running.

# Help

Compute timing metrics for one pipeline: total wall-clock time, total step-seconds across all steps, and per-step durations.

THE STEPS ARE THE ONLY CLOCK. A pipeline page carries no timestamp of its own, so every moment here is read off the step rows: `firstDispatchedAt` is the earliest moment any step of this pipeline was dispatched, `lastCompletedAt` the latest moment one finished, and `wallClockMs` the span between them. The gap between the pipeline page being written and its first step being dispatched is NOT counted and no store holds it, so the wall clock is the time the pipeline spent as work rather than its whole life. A pipeline whose steps carry neither moment reports no wall clock rather than a zero.

WHILE A PIPELINE IS STILL RUNNING the wall clock is a FLOOR, not a reading: `lastCompletedAt` is the last step that finished, and the steps still going will move it. Only a pipeline in a terminal status has a wall clock that has stopped growing.

Per-step duration is computed as `completedAt - startedAt`; steps missing either timestamp are listed with empty cells and excluded from the total step-seconds sum.

`soloMs` is the part of a step's run during which it was the ONLY step running, and it is what parts a step that SET the wall clock from one that ran entirely alongside a longer sibling. Duration cannot: steps run concurrently, so `totalStepMs` counts work the pipeline never waited for. A step reading above zero held the run open alone for at least that long, so shortening it shortens the pipeline by at least that much; a step reading zero was never alone, and the wall clock is somebody else's to shorten. It is a FLOOR rather than the whole cost — two steps in exact lockstep both read zero — and it says nothing about which step GATES which, nothing here being able to see the dependency graph. `totalSoloMs` is the part of the wall clock that has a single owner; the rest was contended or idle.

Default stdout: a `<key>\t<value>` header block (seq, status, firstDispatchedAt, lastCompletedAt, wallClockMs, wallClockSeconds, totalStepMs, totalStepSeconds, totalSoloMs, totalSoloSeconds), a blank line, then one `<workflow>\t<step>\t<status>\t<durationMs>\t<stepSeconds>\t<soloMs>\t<soloSeconds>` row per step, ordered by durationMs descending.
--json stdout: compact single-line `{ pipeline, steps }` — stable shape.
