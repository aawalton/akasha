---
id: f6b76f27-d401-5165-a0b0-349397ce1892
page-type-slug: finding
title: "Thirteen of pipeline 88's step definitions carry pipeline 89's tree-sha, and neither a seq-block race nor a page-name collision explains it"
domain-slug: page-type/pipeline
---

# Claim

On pipeline 88, thirteen of the twenty-one step definitions carrying a `--tree-sha` carry pipeline 89's tree rather than 88's, interleaved with the eight correct ones in mint order. `pages/page-type/pipeline.md` states as Intent that a pipeline's definition is fixed by one commit in each repository it reads. It was not, on that run.

The step pages themselves are sound: the fault is in the definition written into them, not in which pipeline they belong to.

# Evidence

Measured 2026-08-25 over the 232 step pages of pipelines 88 and 89; all 232 still carry a sidecar.

Pipeline 88 is branch `change-19478`, commit `847310c4`, tree `4f953256`. Pipeline 89 is branch `change-19480`, commit `b197068b`, tree `8f0d5a62`.

Pipeline 88 holds 116 steps at seq 12444..12559. Of the 21 whose definition carries a `--tree-sha`, 8 carry `4f953256` and 13 carry `8f0d5a62`. Pipeline 89 holds 116 steps at seq 12560..12675; all 21 of its tree-bearing definitions carry its own, none foreign. The thirteen are at seq 12460, 12462, 12464, 12465, 12468, 12477, 12478, 12514, 12515, 12536, 12554, 12555 and 12556 — interleaved with the correct eight, not contiguous.

Two explanations are ruled out. The seq blocks do not overlap: zero seq values are claimed by both, and the span 12444..12675 holds exactly 232 slots for 232 pages, so the compare-and-swap in `tools/lib/main-pipeline-creator/seqs.ts` held. Page names do not collide: `create.ts:129` sets `const name = String(stepSeq)`.

A single bootstrap also appears unable to emit two: `tools/lib/pipeline-run/pipeline-configs.ts:164` resolves `fullTreeSha` once as a `const` outside the per-workflow map, every workflow copies it at `:212`, and `create.ts:135` is the only writer of a step's `definition`.

NOT measured. Which process wrote the thirteen, and in what order against pipeline 89's creator: the pages carry no creation time and I did not go to git history for it. Whether a module-level config structure is shared between concurrent creators and materialized once — `pipeline-configs.ts:66` reads `typeof step.commands === "function" ? step.commands(ci) : step.commands`, nothing in that file assigns back to `step.commands`, and I did not trace where `discovered` is built. Whether the crossover changed a verdict: `check-syntax-bundle` at seq 12554 carried the foreign tree, was dispatched at 23:28:16.660 and passed.

Not recurred: pipelines 92 to 96 carry 519 steps, one tree-sha each, no exit 2.
