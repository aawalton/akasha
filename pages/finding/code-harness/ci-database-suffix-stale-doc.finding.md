---
id: b1b68b18-9093-5d4b-9b5b-f94930948753
page-type-slug: finding
title: "CI database suffix stale doc"
domain-slug: domain/global
---

# Claim

`.claude/docs/test-classification.md:13` states CI runs `{unit, property, component, database}`, but `database` has not been part of the CI test-type set since #14386, when it moved to the workstation slow-suite gate; the same stale claim also appears in `packages/agents/shared/wake-source-tags.smoke.test.ts`.

# Evidence

Project #16444 (domain code-harness, status someday_maybe). Measured 2026-07-26 from landed main (`1ae33e1162`) while working #16420.

Verified against three independent sources on the same tree:
- `packages/infra/tests/run-workspace-tests.sh`: `CI_TEST_REGEX='\.(unit|property|component)\.test\.'`
- `packages/infra/checks/src/lib/test-step-paths.ts`: `TEST_TYPES = ["unit","property","component"]` (one CI pod per type)
- `packages/infra/tests/src/select-slow-suites.ts`: `SLOW_TEST_SUFFIXES = ["integration","data","cli","database"]`

The same stale claim also appears in `packages/agents/shared/wake-source-tags.smoke.test.ts`; #16420 corrected it there only, because that file was already being edited, and deliberately did not touch this doctrine doc mid-slice.

Why it matters: this is the doc an agent loads to decide which suffix a new test should carry. An agent reading it believes a `.database.test.ts` is CI-gated; it is not — it runs only in the touched-file slow-suite gate and the sweep.

Suggested scope (not decided): a one-line factual correction plus a check across other docs for the same claim, and consider citing the CI test-type set from `TEST_TYPES` rather than retyping it in prose, so a future move out of CI cannot leave a doc behind.

The row was captured but never defined (no objective was written); this evidence is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.
