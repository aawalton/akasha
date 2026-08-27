---
id: 3394c78e-c1e8-5daf-8ce5-2c62166db5c1
page-type-slug: finding
title: "Syntax bundle coalescing unmeasured"
domain-slug: domain/global
---

# Claim

Project #18551 coalesced `component-layout`, `component-layout-head-styles` and
`popover-viewport-safety` into `check-syntax-bundle`'s one parse, and the saving has
a before-figure from CI step timings but no after-figure. Before, from
`ops pipeline step-cost`, last 20 runs, 2026-08-11: `component-layout` median
6,586.5ms, `popover-viewport-safety` 6,534ms, `check-syntax-bundle` 2,576.5ms.
Nobody has read the bundle's step time on a pipeline where the two steps are gone.

# Evidence

The project's third objective asks for the saving to be stated from CI step timings
rather than local runs. Only a deployed pipeline produces the after-figure, so the
verification could not be made before the project left `awaiting_manager_verification`
and the project's own row stops being read once it deploys.

One reading settles it: `ops pipeline step-cost --step check-syntax-bundle` after
tree #18484 reaches `main`, against the three medians above. The local reading the
project took — three added rules judging in 0.47s over the real 14,065-file
population, against 6.17s for the 26 prior rules — is marked local on the project
document and is not what the objective asks for.

Verified at hand-back by the seat rendering the verdict: the two steps are gone from
the workflow, the three rules run inside the bundle (whole-tree run, exit 0, 29
scanners clean over 14,065 files), and a five-plant tree proved each rule still
refuses and names itself. What is outstanding is the measurement, not the work.
