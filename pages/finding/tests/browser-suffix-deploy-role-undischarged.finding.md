---
id: 617aeb4b-1d76-57ea-bceb-3f3528af6a3a
page-type-slug: finding
title: "Browser suffix deploy role undischarged"
domain-slug: domain/global
---

# Claim

The `browser` test suffix is held out of the workstation slow-suite gate because it "keeps its deploy-time harness verification role", and no runner discharges that role. What runs at deploy time is `ops browser-test verify-render` and `ops browser-test ensure-idle-game`, verbs the gate shells as subprocesses. Nothing in the tree invokes `bun test` on a `*.browser.test.ts` path, so a committed browser suite runs when a person runs it and at no other time.

# Evidence

Read 2026-08-07 against `~/code` at `383bf60d35`.

The exclusion. `packages/infra/tests/src/select-slow-suites.ts` line 39 is `SLOW_TEST_SUFFIXES = ["integration", "data", "cli", "database"]`, and its docblock at 30–32 gives the ground: "`browser` is deliberately excluded — it keeps its deploy-time harness verification role rather than gating on touch (Alan ruling A, #14306)".

A second live surface says the same. `run-workspace-tests.sh` lines 53–59: the seven non-CI types "never run in CI; each is invoked from the workstation touched-file slow-suite gate … or a pre/post-deploy step (`browser`/`smoke`/`model`)". Line 74 sets `CI_TEST_REGEX='\.(unit|property|component)\.test\.'` and line 42 refuses a type outside that trio, so CI cannot reach the suffix.

What the deploy step actually does. `packages/alanwalton/projects/cli/src/lib/move-to-deploy-render-gate.ts` line 172 runs `["bun", "ops", "browser-test", "ensure-idle-game"]`, and its header at 14 and 167–169 says it "reuses the existing `ops browser-test verify-render` verb verbatim … rather than importing the harness (which would violate cli→browser-test-harness)". Line 161 names `idle-hydrated-verify.browser.test.ts` as driving the same entry — a parallel suite, not the thing invoked.

No runner. Grepping every `.sh`, `.json`, `.yaml` and `.yml` in the tree for `browser.test` returns only workspace dependencies on `@shared/browser-test-harness` and prose in generated flag files. No script names a browser suite.

A third surface stated it too — `packages/infra/checks/CLAUDE.md` — but that document is quarantined in the instructions repo at `dirty/code/packages-infra-checks-claude.md` and awaits removal, so two live surfaces carry the claim.

Not measured: I did not read the deploy verbs end to end, so this is that I looked where a runner would be. I took no census of how many browser suites exist.

`pages/finding/tests/smoke-runner-disagreement.finding.md` records the same shape for `smoke` and says it did not test the parenthetical against `browser`. This is that measurement.
