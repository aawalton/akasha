---
id: f89f6f29-b82f-5828-923e-afc0fe7a2627
slug: step-reds-invisible-to-main-failures
page-type-slug: finding
title: "Step reds invisible to main failures"
domain-slug: domain/main-pipeline
---

# Claim

`ops pipeline main-failures` reports pipelines that failed, and a red STEP inside a pipeline that completed is not one. Two seats read `main` as healthy and as carrying two red steps at the same moment, each from a sound instrument, and neither reading could correct the other.

# Evidence

On 2026-08-14 two seats disagreed about whether `main` was red.

One ran `ops pipeline main-failures`: 18 failures over 2026-08-07 to 2026-08-14, newest uncured 27793 from 2026-08-11, nothing that day, and nothing attributable to the tree in question. A correct reading of that instrument.

The other ran the failing test directly. On an untouched `~/code` at `c46b79c85b`, `bun test packages/shared/cli/src/ops/work-halt-gate.unit.test.ts` gives 3 pass, 1 fail, reproduced twice hours apart. A third seat reported pipeline 27981 running 125 of 125 steps with exactly two red, one of them that test and one `check-cli-help-flag-references`.

Both are true. The pipeline ran every step it had and was not recorded as failed; two of its steps were red. `ops pipeline main-failures` keys on the pipeline's own status, so a step-level red inside a completed run is outside its population, and its output says nothing about the gap — a clean answer and an unasked question look identical.

What makes it expensive rather than merely imprecise: a deploy-track row needs a green verdict at its pushed SHA, which step-level reds withhold. So the population that blocks deploys and the population this instrument reports are different populations, and the instrument reads like the authority on the state of `main`. A seat holding a blocked row and a seat reading this instrument will disagree, each with evidence, and the disagreement resolves only when somebody runs the step by hand.

Filed against `main-pipeline` rather than against either seat: the two readings were both sound and the gap is between what the verb measures and what its name promises.
