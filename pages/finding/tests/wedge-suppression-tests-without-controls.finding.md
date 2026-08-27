---
id: bb6aaf69-3135-5b70-8458-3aded71de1e7
page-type-slug: finding
title: "Wedge suppression tests without controls"
domain-slug: domain/global
---

# Claim

Four wedge suppression tests in `packages/agents/devops-monitor` assert only that the wedge did not fire, with no control anywhere — not in the file, not at a distance, not in a sibling. A green there has two causes it cannot separate: the suppression logic correctly withheld, or the detector stopped reaching the input at all. A dead detector keeps every suppression test beside it green, because "no alert" is what both produce.

# Evidence

THE FOUR, READ TODAY. Each body is a single `expect(...).toBe("clear")` or its equivalent, with no count asserted:

    dispatch-stall-budgets.unit.test.ts:150  suppresses when the queue is operator-paused (batchSize=0)
    dispatch-stall-budgets.unit.test.ts:165  suppresses when the queue is empty
    dispatch-stall-budgets.unit.test.ts:180  suppresses (fail-closed) when mergeQueue is unobserved (null)
    landed-no-main-pipeline.unit.test.ts:202 suppresses when no batch is landed

The last is the sharpest. It feeds three candidate batches — `forming`, `ci_running`, `main_deployed`, all at `LANDED_STUCK` — and asserts nothing about how many were matched or filtered, so a status filter that silently returned `[]` for every status would pass it identically.

THE POPULATION, COUNTED TWO WAYS BECAUSE ONE FORM CAN LIE. Tests in that package whose title contains "suppress": 34, by a single-line `grep -rn 'test("[^"]*suppress'` and by a multiline `(test|it)\(\s*"[^"]*suppress`, across 9 files. Both agree. An earlier reading returned 30, a bounded character class having broken on four titles carrying a possessive apostrophe.

THE REMEDY IS PRESENT AND APPLIED UNEVENLY. The sibling test immediately above `landed-no-main-pipeline.unit.test.ts:202` asserts `stuckLandedBatchCount` and `uncoveredStuckLandedBatchCount` alongside its `clear`. So this is not a gap in the package's discipline generally; `staleCount`, `subscriberCount` and `pendingSubscriberCount` are asserted widely.

WHAT BLOCKS THE MECHANICAL FORM. `classifyXxx(snapshot, prevState)` reads its thresholds from module-level constants, so the suppression condition is not injectable at the layer these tests call. One layer down, `isBusySubscriber(..., graceSeconds)` takes its grace as a parameter and its own test injects it.

ONE FIELD DECLARED FOR THIS AND NEVER ASSERTED ON. `deploy-staleness.ts:206` emits `observed: snapshot.appDeployExpectations.length`, and no test in the package matches `.observed`.
