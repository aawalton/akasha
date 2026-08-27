---
id: 08fe27d6-8cc7-53eb-9a22-e72b7995b7ad
slug: pipeline-step-rows-silent-empty
page-type-slug: finding
title: "Pipeline step rows silent empty"
domain-slug: domain/global
---

# Claim

`fetchPipelineStepRows` (`pipeline-step-inventory.ts:57`), source of #15966's `check --json` denominator, is documented "Never throws — an unexpected shape yields `[]`" and has three silent-empty exits: unresolved pipeline seq, zero workflow rows, a `flatMap` dropping non-string `stepName`/`status` rows unreported. A read failure arrives labelled a measured `stepsTotal: 0`, harder to notice than the `[]` it replaced. None fires on pipeline 25693 (101 steps); the hazard is real but unobserved.

# Evidence

Project #16043 (domain `code-harness`, no parent), owner dalla, tags `ci`, `denominator`, `fail-confident`, `verification-validity`, `author:athena`, created 2026-07-25T10:12:53Z, `someday_maybe`, no objective.

**Three silent-empty exits**, `pipeline-step-inventory.ts:57`: (1) seq not resolved; (2) no workflow rows; (3) `flatMap` drops any row with non-string `stepName`/`status`, silently. All `return []`. `check.ts:327-328` emits `stepsTotal`/`stepsCompleted` directly from that return.

**Why worse after #15966.** Before, the payload carried a bare `steps: []` — obviously contentless. Now an empty return arrives labelled `stepsTotal: 0`, reading as measured; trust that left the bare list transfers to the labelled zero. Rule: "A fabricated denominator is strictly worse than silence." Exit 3 is sharpest: can produce `stepsTotal: 99` on a 101-step pipeline.

**Hazard real, not firing.** Checked against pipeline 25693 (#16041's `steps: []` report): found by seq, 2 workflows both status-set, 101 steps, 0 missing `stepName`/`status`. None of the three exits fires today; #16041's report is timing instead (pipeline created 09:34:17Z, fix landed 09:41:13Z). The live path satisfies the contract; nothing enforces it will.

A hypothesis nearly published here was refuted: that the lookup resolves `seq` against `attributes` (zero of 13,587 rows carry one), which would make the function always return `[]`. `seq` is a promoted column; routing is correct, premise verified, conclusion did not follow.

**Fix directions.** Distinguish "no steps" from "could not read steps," throwing on (1)/(2). Never silently drop rows: exit 3 must fail loud or report the drop count. `check --json` must not print a zero it cannot vouch for. `failing-step-details.ts:65`, the other caller, has the same defect.

**Acceptance.** Unresolved seq: loud failure. Real pipeline reports true count (101). Bad-status row rejected loudly or counted in a drop total.

Moved off the project's `notes` 2026-08-15.
