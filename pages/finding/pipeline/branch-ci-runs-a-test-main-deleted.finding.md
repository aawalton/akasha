---
id: 7942628f-3d67-5890-b358-94ba0773fa80
slug: branch-ci-runs-a-test-main-deleted
page-type-slug: finding
title: "Branch CI runs a test main deleted"
domain-slug: page-type/pipeline
---

# Claim

Branch CI judges the branch's own tree, so a test already deleted on main still runs on any branch cut before that deletion, and fails there.

The failure names the test and the environment but never the branch's age, so it reads as a fleet-wide CI fault. One seat escalated it as random provisioning breakage hitting other projects. The merge queue judges the merged result, where the file is absent.

# Evidence

Read 2026-08-14 against `origin` in the code repo.

MEASURED. `packages/shared/cli/src/ops/work-halt-gate.unit.test.ts` was deleted from main at `627db0ceec`, 2026-08-14 02:52:18 -0600, the commit moving the command surface out of the code repo. The test asserts `memory edit` stands in the ops registry, which is exactly what that move removed.

`origin/project-19098` at `1fa9b78fbf` still carries the file, and its branch CI fails `check-unit-tests` on that test. `origin/project-19097` and `origin/project-19011` do not carry it, and both passed the same step. `origin/project-19089` failed the identical test at 13:11 and does not carry it now.

So which branches fail is settled by whether they were cut before `627db0ceec`, with no randomness needed to explain it.

NOT MEASURED. Whether 19089 was rebased between its failure and now. Whether CI's instructions checkout at `/ci-storage/instructions/<code-sha>` is present but carries no `tools/`, which is the diagnosis the escalating seat reached. That may also be true, and the two are not rivals: the guard's `skipIf(!instructionTreePresent())` decides whether the test runs, and the branch's age decides whether the test is there to run at all. A branch cut after the deletion is safe either way.

NOT MEASURED. Whether any other test carries a guard keyed on the same stale premise.
