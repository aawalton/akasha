---
id: 7994eed8-7c95-5e08-9b60-6d73e38c5e22
page-type-slug: finding
title: "Hermeticity population built from edge sources"
domain-slug: domain/instrument-population
---

# Claim

`check-unit-test-io-hermeticity` builds its population from graph edge SOURCES, so a test file that produces no runtime import edge never enters it. It reports "over 3205 of 3205 test files" while 3253 tracked files match its own `TEST_RE` — a 48-file gap its cohort cannot express, because `examineCohort` is handed the already-shrunk set. The denominator reads as complete coverage of the tree.

# Evidence

Measured 2026-08-07 in `~/code` at `ecf5f9518`, by running the check.

THE RUN. `bun packages/infra/checks/src/checks/check-unit-test-io-hermeticity.ts` exits 0 with "No unit-test IO hermeticity violations detected. [over 3205 of 3205 test files] [repos: code-repo 3205 …]".

THE TREE. `git ls-files` matching the check's own `TEST_RE` (`/\.(unit|property|component)\.test\.tsx?$/`, line 93) returns 3253 files. 39 of those sit under `__fixtures__`, leaving 3214 ordinary ones — still 9 above what the check reported.

WHERE THEY ARE LOST. Lines 300-301 build the population: `for (const from of adjacency.keys()) if (TEST_RE.test(from)) testFiles.add(from)` and the same over `mocked.keys()`. Both maps are keyed by edge source. A test whose every import resolves to neither a workspace nor a repo file produces no edge, so it is a key in neither map and never reaches `examineCohort` at line 303 — which is handed `members: [...testFiles]` and can only report honestly about the set it was given.

THE SHAPE THAT PRODUCES IT. 19 tracked non-fixture test files import nothing relative and nothing workspace-scoped, among them `packages/agents/cli/src/agent/spawn-identity-registry.unit.test.ts`, `packages/agents/oauth/src/oauth-usage-at-limit-mark.unit.test.ts`, `packages/alanwalton/projects/cli/src/project/push.unit.test.ts`, `packages/infra/ci/orchestrator/src/orchestrator.worker.unit.test.ts` and `packages/temper/web/app/routes/api.addons.unit.test.ts`. That is the shape, not the enumeration.

NOT MEASURED. Exactly which 48 are absent. The check exposes no member list and takes no `--json`, so the gap is a difference of counts rather than a named set.

DISTINCT FROM ITS STANDING SIBLING. `pages/finding/tests/unit-lane-inline-spawn.finding.md` records a test doing IO in its own body, reaching no boundary module — and states that both its files are INSIDE the population. This is the other side: files that never enter it.
