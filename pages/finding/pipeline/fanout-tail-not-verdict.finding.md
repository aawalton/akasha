---
id: 69cba042-7d5b-5126-8f7d-246c19dc5c67
page-type-slug: finding
title: "Fanout tail not verdict"
domain-slug: page-type/pipeline
---

# Claim

A green-looking tail of a fan-out CI step log (e.g. "0 fail / 539 pass") is only the last-finishing worker's own summary, not the step's aggregate verdict — reading it as the verdict is a known misreading that `packages/infra/tests/src/triage-fanout-log.ts`'s own docstring names explicitly, having previously cost a reopen and three seats on #13644.

# Evidence

Found by aranya 2026-07-26 00:10Z triaging a #16247 CI block. Routed to dalla (CI harness her domain), not dispatched.

Original observation (retracted, kept for record): pipeline 26026, step check-unit-tests, pod pe-26026-check-unit-tests-447e118, exit 123 while its tail log read "Ran 539 tests across 128 files [31.08s], 1413 expect() calls, 0 fail, 539 pass" then "[run-typed-tests] unit: genuine failure in concurrent phase (exit 123) -- ejecting." Hypothesized mechanism (per `run-typed-tests.sh:98-110`'s comment that non-zero phase-1 exit means genuine failure since a crashed shard should self-record and exit 0): a SIGKILLed shard can't self-record (OOM killer delivers no catchable signal), never appends to the crash list, xargs returns 123, harness misclassifies a load-induced OOM kill as genuine, skipping the serial re-run meant to distinguish the two. Node-06 pressure checked and ruled out: requested 82%, limited 93%, actual usage 19% (12,596Mi of 65,249,900Ki allocatable), MemoryPressure=False, zero OOMKilling events cluster-wide.

RETRACTED 2026-07-26 00:26Z by aranya: "the mechanism described did NOT occur." The "539 pass / 0 fail" read was the fan-out log's tail, mistaken for the step verdict — in a fan-out step a green tail is only the last-finishing workspace's own summary. `packages/infra/tests/src/triage-fanout-log.ts` exists for this, docstring naming the phantom, noting it cost a reopen and three seats on #13644. Full-log verdict: fail, clean terminals 258, fail count 2 — no shard crashed, so the mechanism is contradicted, not merely unproven, for 26026/26039.

Actual cause: two genuinely failing tests in `cardio-ingest.unit.test.ts` — the UTC-vs-ESO-day clock bug, fixed under #16247. Not the harness.

Before retraction, the row classed this with #16345/#16335 as a verdict asserted, not measured; that applies to the corrected finding, not the retracted mechanism.

Project #16366, someday_maybe, pipeline, no objective; retired `notes`, 2026-08-15.
