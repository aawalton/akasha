---
id: 05bbb1c1-eb26-5423-b8f5-650c3d505edd
slug: monarch-tests-run-by-nothing
page-type-slug: finding
title: "Monarch tests run by nothing"
domain-slug: domain/monarch
---

# Claim

The 47 tests across `monarch/amazon-match.test.ts`, `monarch/amazon-pairs.test.ts` and `monarch/amazon-refund.test.ts` are run by nothing at a command. `suite-runs` invokes `bun test tools/`, which does not descend into `monarch/`, so the suite passes when a person types it and no check anywhere reports it failing.

# Evidence

`bun test monarch/amazon-pairs.test.ts monarch/amazon-refund.test.ts monarch/amazon-match.test.ts` reports `47 pass, 0 fail, 93 expect() calls` on 2026-08-09. The command that runs a suite is written as *the `tools/` suite* and three documents name it that way, so widening it is a design change in another domain rather than a repair here.

Raised in the `# Notes` of #18168 with one test file behind it, and again in #18169 with three. Both rows are closed, so each raising died with the document that carried it.
