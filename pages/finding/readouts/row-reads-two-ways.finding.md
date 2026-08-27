---
id: e35565b9-aa8b-512d-b3e9-4f60db1618e2
page-type-slug: finding
title: "Row reads two ways"
domain-slug: domain/global
---

# Claim

`domains/readouts.md` says "A row a readout cannot read costs its own reading only", and "row" carries two senses across the surfaces this domain governs. Of a source record it is true: a project row with a null status is one null group rather than a wedged status bar. Of a row on the wire it inverts: both rows are required, so a body missing one is a decode failure and the whole tile goes to dashes. The line reads as governing both.

# Evidence

Read 2026-08-10 during a `review-instructions` pass over `domains/readouts.md`.

The source-record sense, which is the one the line was written in: `packages/shared/status-bar-access/src/get-status-bar-snapshot.ts` line 76 reads `status: z.string().nullable()`, commented "A non-nullable field here would fail Zod parse on every poll and perpetually wedge the status bar." Commit 5032906b9 in the instructions repo, which landed the line, cites that same file and records Alan approving the words on 2026-08-10. One level up, `settleReads` settles each of the five status-bar reads on its own success or failure "so one flaky read can never blank the healthy others".

The wire sense, seen rather than inferred: `scripts/render-harness/run.sh --widget pipeline-health` passed `pipeline-health-medium-half-a-body` against its reference at 0.0000% moved. The PNG is both rows, all ten cells, drawn as grey dashes — a body missing one of its two required rows takes the whole tile. `PIPELINE_HEALTH_ROWS` is the wire's own word for those keys, and `PipelineHealthWidget.swift` says "Both fields are REQUIRED".

Not measured: whether any payload type has been written against the wrong sense. The wording is Alan's under `domains/domain.md` Every Changed Line, so nothing was landed; the reading recommends "A source row".
