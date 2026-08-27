---
id: fbb49066-e5e5-5dc4-bbce-4bb91beabea9
page-type-slug: finding
title: "Negative assertion on a copied literal"
domain-slug: domain/global
---

# Claim

`packages/agents/cli/src/agent/list.cli.test.ts:211` asserts `expect(result.stdout).not.toContain("⚠ result truncated:")` — a negative assertion against a literal copied out of the builder that emits it. If that prefix ever changes the test does not fail; it passes, and goes on passing, asserting the absence of a string nothing can emit any more. The builder is exported and already imported in the same package, so deriving the string costs one import.

# Evidence

BOTH SIDES, READ TODAY. The assertion is at `packages/agents/cli/src/agent/list.cli.test.ts:211`. The string it copies is built by `listTruncationAdvisory` at `packages/shared/cli-core/src/list-bound.ts:47-54`, which returns `⚠ result truncated: scanned the first ${cap} matching row(s) and more match. …`. The two agree today, so the assertion is not yet vacuous — it is one reworded prefix, one dropped glyph or one changed marker away from being so, with no failure at the moment it happens.

THE IMPORT IS ONE LINE AND ALREADY EXISTS IN THE PACKAGE. `packages/agents/cli/src/agent/list.ts:9` imports `listTruncationAdvisory` from `@shared/cli-core/list-bound`, and `list-bound.unit.test.ts:2` imports it too. There is no friction argument for the copy.

WHY THE NEGATIVE FORM IS THE AGGRAVATING FACTOR. A positive assertion against a copied literal fails loudly when the literal drifts: you assert presence, the string changes, the test reds, someone repairs it. The negative form has no such feedback — drift and correctness produce the same green. Copied literal and negative assertion are individually tolerable and jointly silent.

IT WAS WRITTEN AS THE REPAIR FOR THE PREVIOUS DEFECT IN THIS LINE, which is what makes it worth recording rather than shrugging at. The line used to read `.not.toContain("truncated")` and failed on data — a project title containing the word. Two projects independently diagnosed that and reached for the same replacement within hours of each other, `#16540` landing first. The repair stopped it failing on data and gave it a way to stop testing anything without failing at all.

NOT MEASURED. How many other negative assertions in the estate match a literal copied from the module that emits it. That is a decidable scan — `not.toContain` against a string literal that also occurs in non-test source — and it would turn this from one site into a population.
