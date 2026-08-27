---
id: 60d0e66c-2729-54c1-a6c0-d4fafdd74200
page-type-slug: old-ops-command
title: "Ops pipeline steps"
slug: ops-pipeline-steps
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/pipeline/steps.ts
path: pipeline steps
---

# Definition

- **Ops pipeline steps** — one pipeline's steps, each with its status, duration, pod, wait and the reason it carries.

# Help

List steps for a pipeline, optionally filtered to one workflow or one status. Columns: workflow, name, status, exitCode, duration, podName, wait, reason.

`reason` carries the most specific explanation the step row holds, narrowing `failReason` → `skipReason` → `admissionRejectedReason` → `blockedBy`. It is shown whenever it is populated, on every status — a step that failed is often moved to `resolved` or `superseded` afterwards, and those touched rows are exactly the ones under investigation (#16368).

A step at `status=dispatching` with no pod is normally a capacity queue — the dispatcher is holding it because its bound ci node is full — but that reads identically to a genuine wedge. The `wait` column disambiguates (#15574): a capacity-queued step shows `node-capacity@<node> (<age>)`, while a wedged step shows a blank `wait` while still `dispatching`. The marker also survives the step going terminal (a `capacity-starved` step keeps naming the node it starved on), and its age is measured against the step's own `completedAt` so it stops growing once the step ends.

TIMING — `completedAt` is the step's end time, and `duration` is derived from `completedAt - startedAt` at render time. Two nearby values are NOT the step end: the row's `updated_at` column is a row-mutation timestamp that keeps moving after completion (it overstated one step's span by 8.2x once the row was later marked `resolved`), and there is no `finishedAt` attribute on a step at all — that name belongs to the `pipeline.branch.terminal` event payload and to the kubelet container status, neither of which is this row.

Default stdout: one TSV row per step — `<workflow>\t<name>\t<status>\t<exitCode>\t<duration>\t<podName>\t<wait>\t<reason>\n`. Empty result → empty stdout, exit 0.
--json stdout: `[...]` array of `{ workflowName, stepName, status, exitCode, durationMs, podName, startedAt, completedAt, failReason, skipReason, admissionRejectedReason, blockedBy, infraSignatureClass, dispatchWaitReason, dispatchWaitNode, dispatchWaitSince }` on a single line. `durationMs` is derived from the two timestamps, not read from the row — no step has ever carried a `durationMs` attribute. A key whose value is absent is OMITTED from the object rather than emitted as null, so test for presence, not for null.
