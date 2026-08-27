---
id: b2f1bccd-eb35-5590-a311-143473f2023c
slug: acquisition-is-the-bill-and-no-check-owns-it
page-type-slug: finding
title: "Acquisition is the bill and no check owns it"
domain-slug: domain/global
---

# Claim

For most standing checks the predicate is nearly free and acquisition is the bill, so making one faster or more correct cannot move it. Seven of eleven reviews measured it: 98.6% acquisition against a 7ms judgement, 87% against 19ms, 147.5ms of module load against a 0.34ms predicate. The largest item repeats: six checks each import the workflow descriptors in their own process. `check-run-check-routing`'s review names that consolidation and disclaims it. Nobody owns it.

# Evidence

Found by reading eleven pending check reviews together, 2026-08-10. No single one looks defective: each measures its own check honestly and concludes, correctly for itself, that it is a repair candidate on cost rather than a removal one.

The splits, as each reviewer measured them:

  check-run-check-routing      98.6% — scan 72ms, import 440ms, judgement 7ms
  check-commands-kept          87%, judgement 19ms
  check-spacing-scale          module load 147.5ms of 155ms, predicate 0.34ms
  check-emitted-path-citations acquisition 2128ms against judgement 6ms
  check-sargable-pages-predicates  judgement 46.8ms behind bun boot and graph load
  check-seat-resume-driver     roughly two thirds acquisition
  check-shellcheck             two thirds — 2.2s judgement inside a 7.3s step

Only `check-service-typecheck` and `check-spec-bundle` are exceptions, both because judgement is genuinely the work: a 40-package `tsc` chain, and a model checker.

WHY THIS IS ONE UNIT RATHER THAN SEVEN. A review can only recommend a repair to its own check, and a predicate repair moves single-digit milliseconds inside a step whose cost is process start, module load and dependency-graph construction. Two reviewers reached the phrase "a repair candidate on cost rather than a removal one" independently. The repair that would pay is shared and belongs to no check: `check-run-check-routing`'s review names it — consolidating the workflow import across the six checks that each pay it — and correctly declines it as outside its scope.

WHAT MAKES IT HARD, from the corpus rather than reasoning: `checks.map(makeCheckStep)` makes one step and one pod per check, so sharing acquisition means coalescing checks into one registered check. That decides how a check is dispatched and what it may read, which must not be done to a check whose own review has not happened. #18581 is the same defect over workflow descriptors and is cut already.

Unowned, every REPAIR-on-cost verdict hands back a repair that cannot move the bill.
