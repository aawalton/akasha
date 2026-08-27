---
id: 17358ce2-9290-5694-b65a-d8d700deaaf4
slug: two-constants-named-test-types
page-type-slug: finding
title: "Two constants named test types"
domain-slug: domain/global
---

# Claim

Two exported constants in this repository are both named `TEST_TYPES` and hold different sets. One is every test type that exists, ten of them; the other is the three branch CI actually runs. A reader who finds the wrong one concludes that `cli`, `smoke` and `integration` tests gate a branch. They do not.

# Evidence

Re-measured in akasha on 2026-08-27, on `main`; the two files moved into different packages and both constants stand.

`tools/lib/check-workflow/test-step-paths.ts:2`

    export const TEST_TYPES = ["unit", "property", "component"] as const

`infra/cluster-checks/src/lib/test-classification.ts:18`

    export const TEST_TYPES: readonly TestType[] = [
      "unit", "property", "component", "database", "smoke",
      "integration", "browser", "cli", "data", "model",
    ] as const

Both are exported, both are named `TEST_TYPES`, and nothing in either name says which is which. The three-element one is the enrolled set: `tools/lib/ci-test-fanout/compute-reverse-reachability.ts:107` builds its suffix list from it, and `tools/lib/ci-test-fanout/list-typed-workspaces.ts:4` imports the same one.

What it cost, concretely: measuring the boundary for removing the ops command surfaces, a seat had to leave open whether the 52 `.cli.test.ts` files asserting on `--help` stdout are enrolled in branch CI. That question decides whether the removal breaks 12 test files or 64, which is the difference between a checklist item and a workstream. It was answerable in one read; the ambiguity is what made it look like it was not.

The answer is that `.cli.test.ts` is NOT enrolled in branch CI. It runs on the workstation slow-suite gate.

This is the shared-name-treated-as-shared-constant shape. It cost this fleet twice in one night on the instructions side — `DEFAULT_STATUS` turned out to be two constants and `DEFAULT_REASON` three, both caught by seats that checked the value and the source file rather than the name. The two spellings stood in sibling files in one directory when this was filed; they now stand in two packages, `tools/lib/check-workflow/` and `infra/cluster-checks/src/lib/`, so neither is read beside the other at all.

Neither name is wrong for what it holds. What is missing is that either name distinguishes it from the other.
