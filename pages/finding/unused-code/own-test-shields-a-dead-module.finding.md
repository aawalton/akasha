---
id: 0936c7cc-d1c5-5b16-9b7a-2edf878845ec
slug: own-test-shields-a-dead-module
page-type-slug: finding
title: "A module's own unit test marks its exports reached, shielding a dead module from the ast-unused check"
domain-slug: domain/unused-code
---

# Claim

A module's own unit test marks its exports reached, so `check-ast-unused` is silent on a dead module that has a sibling test and names only the exports the test happens not to import.

# Evidence

Measured 2026-08-17 in the #19388 worktree at `852c2ff`, off `main`.

The mechanism is in `infra/cluster-checks/src/lib/ts-import-graph-dead-exports.ts`. `collectUnusedExports` skips a test module when deciding what to REPORT — `if (isTestFile(node.relPath)) continue` — but nothing removes a test file's imports from the `live` map `isLiveIn` consults. The exclusion governs which modules are judged, never which imports count as reach.

A natural experiment stands in the tree. `packages/alanwalton/projects/cli/src/pure/summarize-by-owner.ts` has seven exports and a sibling test whose line 2 reads `import { bucketProjectRow, summarizeByOwner, UNOWNED } from "./summarize-by-owner"`. A run reports exactly one line for it: `SUMMARY_BUCKETS` at line 22. The three the test imports are shielded, the three types are spared by the internal-use rule, and the one export with neither shield is the only one named. Measured separately, all seven have zero reach outside the file and that test.

The contrast is in the same run. `tools/lib/relaunch-name.ts` and `tools/lib/skill-token-guard.ts` have no sibling test and are reported whole, five and four exports each.

So silence carries no information about a module that has a test. What is measured is the gap between a module's exports and its test's imports — a fact about test authorship rather than about reach.

Deleting a dead module can also orphan one that only it imported, silently where the orphan has its own test: `decide-create-homing.ts` is the only consumer of `homing.ts`, which has `homing.unit.test.ts`.

Distinct from `pages/finding/agent-harness/cross-repo-reach-invisible-to-importer-sweep.finding.md`, which is about reach across the two repositories; this sits inside akasha alone. `check-ast-unused` does read instructions reaches — 947 from 1594 files under `tools/` by its own output.

Not measured: how many modules are dead-but-test-shielded, or whether the behaviour is deliberate.
