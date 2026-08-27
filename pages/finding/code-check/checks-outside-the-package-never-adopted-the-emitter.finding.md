---
id: 2137a47b-fa7a-5ce2-8687-c42fac00b27e
slug: checks-outside-the-package-never-adopted-the-emitter
page-type-slug: finding
title: "Checks outside the package never adopted the emitter"
domain-slug: domain/global
---

# Claim

Every registered CI check living outside `packages/infra/checks` writes its own verdict rather than routing through the shared emitter — not some of them, all of them. So the chokepoint check certifies a closure over one directory while a second estate of gates has never adopted it, and one of those gates declares no population at all, which is the exact class the `code-check` initiative exists to close.

# Evidence

Measured by driving `classifyEmission` from `packages/infra/checks/src/lib/verdict-emitter-chokepoint.ts` over every `check-*.ts` in the two directories the check registry reaches outside its own package — `packages/temper/shared/build-deploy/checks/src` and `packages/alanwalton/daily-tracking/src`:

**21 bypass, 0 routed, 0 inert.**

Not one of them touches `exitOnResult` or `reportViolations`. #18731 measured the same shape over a wider glob — 23 of 61 non-test files — and re-ran the absence by MODULE SPECIFIER rather than function name: neither directory imports `violation-reporter` at all.

**Why it is a project rather than a widening.** Routing them means each gate calling `exitOnResult` with a real `Population`, which needs `examinePopulation` — `packages/infra/checks/package.json` exports neither `./population` nor `./violation-reporter`, and that function owns the scan loop, so ~20 gates have their collection rewritten with unit tests and live CI output changing. Declaring them instead takes `BYPASS_SIZE` from 7 to 31, which Zero At Landing forbids. It is a horizontal across two packages, and it is what `population-bound.ts` already names as its own retirement.

**The derivation is the hard part, and a bare sweep is the wrong one.** Sweeping the registry-reached directories whole pulls in `run-commit-points.ts` and forty-odd product files, putting product modules into a population whose pass line says "check scripts" — a worse instrument than the hard-coded path it would replace. Whoever takes this settles what a check script *is* before widening anything.

**One gate there declares no population at all.** `check-addon-global-name-dependents.ts`: zero hits on `renderPopulationBound`, `PopulationBound`, `over N of M` or the word `population`. The only other checks there without a bound are `check-ti-clean-source-zero.ts` (row #18708) and `check-tstl-colon-dot-self-shift.ts` (row #18714), so this one is the only member with no row.
