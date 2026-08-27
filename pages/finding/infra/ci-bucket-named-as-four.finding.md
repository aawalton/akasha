---
id: f4d30529-9267-5573-ad31-1f13141c6656
page-type-slug: finding
title: "CI bucket named as four"
domain-slug: domain/global
---

# Claim

Five live modules in the code repo name the CI-enrolled test set as `{unit, property, component, database}`, and one of them is a check's own docblock; the enrolled set is the three types without `database`, which left CI at #14386.

# Evidence

Found while emptying `dirty/docs/test-classification.md` and `dirty/docs/test-lanes-and-capabilities.md`, both of which carried the same error and were removed in this run.

The authority is `packages/infra/checks/src/lib/test-step-paths.ts:41` — `export const TEST_TYPES = ["unit", "property", "component"] as const`. `packages/infra/tests/run-typed-tests.sh:35` accepts `unit | property | component` and rejects anything else; `run-workspace-tests.sh:74` sets `CI_TEST_REGEX='\.(unit|property|component)\.test\.'` and :53 calls them "the pure trio". `database` moved to the workstation slow-suite gate at #14386, recorded at `run-slow-suite-gate.ts:9`.

Naming the set as four:

- `packages/infra/checks/src/checks/check-test-step-paths.ts:8` — "Every `*.{unit,property,component,database}.test.ts[x]` file lives". This is a check describing its own cohort.
- `packages/alanwalton/web/reader-font-swap-reflow.browser.test.ts:31` — "excludes it from the CI unit/property/component/database bucket".
- `packages/infra/checks/src/checks/lint-verdict.cli.test.ts:14` — "`cli` puts this outside CI's `{unit, property, component, database}` bucket".
- `packages/agents/devops-monitor/src/snapshot.integration.test.ts:12` and `snapshot.smoke.test.ts:8` — both `{unit,property,component,database}`.

Each is load-bearing where it sits: every one is explaining to a reader why the file it heads is or is not run by CI. A reader who takes the four-type set and promotes a test to `database` expecting CI to keep running it gets a test that runs only at the workstation gate and the nightly sweep.

The two quarantined documents that carried the same error are gone, so this record is the only one left.
