---
id: 9b7ebeeb-90a2-5a04-8625-68f1dcf3c776
page-type-slug: finding
title: "Live formula copies sync by comment"
domain-slug: domain/global
---

# Claim

Three test files hold hand-copies of live `property-definition` formula rows, kept in step with production by nothing but a doc comment saying they are production, so a copy that stops matching the row keeps passing under a new subject.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded one drifted copy on 2026-07-28 and corrected it. That document is queued for removal; the token stayed corrected and the arrangement that produced it did not change.

The formula strings are `property-definition` rows under the IaC exemption, so nothing in the repo version-controls them and a test that wants one copies it.

`packages/alanwalton/daily-tracking/src/health-total-points.unit.test.ts:36` carries `"sleepPoints + strengthPoints + cardioPoints + nutritionPoints + taskPoints + breathingPoints + faucetPoints"` as an inline `config.expression`. `packages/alanwalton/personas/core/src/green-day-fraction.unit.test.ts:11` labels its copy in a doc comment: "`points` formula def mirroring the production `relationship-progress` shape". `packages/alanwalton/daily-tracking-cli/src/lib/levels.unit.test.ts` holds the `session-activity` catalog copy.

A drifted copy cannot fail. The 2026-07-28 instance was missing `+ faucetPoints` and the suite was green throughout, because the fixtures never set `faucetPoints` — the missing term was the term the rows never exercised. The test had become a correct test of an expression no longer in production, which no run of it can report.

The remedy named at the time does not hold. `~/memory/findings/alanwalton-app/faucet-coherence-drift-denied.md` establishes that `PERSONA_FAUCET_COHERENCE_RULES` is not a single source: "the deployed guard reads the persona page-type row, not the constant, and the constant must be kept equal to it by hand." `packages/alanwalton/daily-tracking/src/stress-capacity-formula.ts` does hold — its apply script verifies the live row against the constant and refuses on a mismatch — but it covers the stress-capacity family alone.

Not measured: whether any of the three copies is drifted today. That needs a read of the live rows, which this seat did not take.
